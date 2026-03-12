import React, { useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "./ui";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function smoothstep(edge0: number, edge1: number, x: number) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
}

export default function ScrollSection({
                                          id,
                                          title,
                                          subtitle,
                                          index = 0,
                                          bgImage,
                                          children,
                                      }: {
    id: string;
    title?: string;
    subtitle?: string;
    index?: number;
    bgImage?: string;
    children: React.ReactNode;
}) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const bodyRef = useRef<HTMLDivElement | null>(null);

    const [p, setP] = useState(0);
    const [sectionHeight, setSectionHeight] = useState<string>("220vh");

    // Progress + subtle parallax
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let raf = 0;

        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || 800;

            // progress 0..1 across section scroll
            const total = rect.height - vh;
            const scrolled = clamp(-rect.top, 0, Math.max(1, total));
            let prog = total <= 0 ? 1 : scrolled / total;

            // On initial load, make the first section look "ready" (no blur / low opacity)
            // by nudging progress to the hold zone.
            const nearTop = window.scrollY <= 2;
            const isIntro = index === 0 || id === "top";
            if (isIntro && nearTop) {
              prog = 0.5;
            }

            setP(clamp(prog, 0, 1));

            // subtle parallax background
            const sectionCenter = rect.top + rect.height * 0.5;
            const viewportCenter = vh * 0.5;
            const delta = (viewportCenter - sectionCenter) / rect.height;
            const py = clamp(delta * 22, -9, 9);
            el.style.setProperty("--py", `${py.toFixed(1)}px`);
        };

        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // Dynamic section height so outer scroll doesn't end before inner content finishes.
    useEffect(() => {
        const compute = () => {
            const vh = window.innerHeight || 800;
            const inner = bodyRef.current?.scrollHeight ?? 0;

            // Provide enough outer scroll distance: viewport + inner content + transition padding.
            // Clamp inner contribution to avoid absurdly tall pages.
            const innerCap = Math.min(inner, vh * 4);
            const px = Math.round(vh * 1.2 + innerCap + vh * 0.6);

            // Never go below a comfortable baseline.
            const minPx = Math.round(vh * 2.1);
            setSectionHeight(`${Math.max(px, minPx)}px`);
        };

        compute();

        const ro = new ResizeObserver(() => compute());
        if (bodyRef.current) ro.observe(bodyRef.current);

        window.addEventListener("resize", compute);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", compute);
        };
    }, []);

    const label = useMemo(() => {
        if (!title) return null;
        return (
            <div className="mb-4">
                <div className="text-xs font-semibold tracking-wide text-slate-500">Sección</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{title}</div>
                {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
            </div>
        );
    }, [title, subtitle]);

    // Envelope tuned for: show next section preview early, but don't steal focus.
    // Enter quickly, hold longer, exit late.
    const enter = clamp(p / 0.14, 0, 1);
    const exit = clamp((1 - p) / (1 - 0.92), 0, 1);
    const vis = Math.min(enter, exit); // 0..1

    // Smooth focus window (no abrupt toggles). 0..1
    const focusIn = smoothstep(0.03, 0.12, p);
    const focusOut = smoothstep(0.97, 0.88, p); // reversed edge gives fade near end
    const focus = clamp(focusIn * focusOut, 0, 1);

    // Card visuals: readable + subtle motion.
    // Keep a small preview when not focused, but avoid hard cuts.
    const cardOpacity = 0.18 + 0.82 * (vis * (0.35 + 0.65 * focus));
    const cardY = (1 - vis) * (8 + 10 * (1 - focus));
    const cardBlur = (1 - vis) * 0.5 + (1 - focus) * 0.8;

    // Pointer events only when sufficiently focused.
    const interactive = focus > 0.25;

    // Background overlay
    const overlays: Array<[number, number]> = [
        [0.10, 0.45],
        [0.14, 0.58],
        [0.14, 0.62],
        [0.14, 0.62],
        [0.14, 0.62],
    ];
    const [a, b] = overlays[index % overlays.length];

    return (
        <section
            ref={(node) => (sectionRef.current = node)}
            id={id}
            className={classNames("relative isolate w-screen scroll-mt-28")}
            style={{
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
                height: sectionHeight,
            }}
        >
            {/* Background base */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(1200px 600px at 50% 20%, rgba(99,102,241,0.10), transparent 60%), linear-gradient(to bottom, rgba(255,255,255,1), rgba(248,250,252,1))",
                }}
            />

            {/* Background image */}
            {bgImage ? (
                <div
                    className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${a}), rgba(255,255,255,${b})), url(${bgImage})`,
                        transform: "translateY(var(--py))",
                        transition: "transform 120ms linear",
                    }}
                />
            ) : null}

            {/* Sticky stage */}
            <div
                className={classNames(
                    "sticky top-[84px] h-[calc(100vh-84px)] px-3 sm:px-6",
                    "flex items-center"
                )}
                style={{
                    pointerEvents: interactive ? "auto" : "none",
                    zIndex: interactive ? 40 : 5,
                }}
                onWheelCapture={(e) => {
                    if (!interactive) return;
                    const el = bodyRef.current;
                    if (!el) return;

                    const delta = e.deltaY;
                    const atTop = el.scrollTop <= 0;
                    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

                    // If the inner area can scroll in the wheel direction, consume the wheel and scroll it.
                    if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
                        e.preventDefault();
                        el.scrollTop += delta;
                    }
                }}
            >
                <div
                    className={classNames(
                        "mx-auto w-full max-w-[1400px]",
                        "rounded-[28px] border border-slate-200 bg-white/95 backdrop-blur-sm p-5 sm:p-7 overflow-hidden",
                        "shadow-[0_26px_90px_-60px_rgba(15,23,42,0.55)]"
                    )}
                    style={{
                        opacity: cardOpacity,
                        transform: `translateY(${cardY.toFixed(1)}px)`,
                        filter: `blur(${cardBlur.toFixed(2)}px)`,
                        transition: "opacity 320ms linear, transform 420ms ease-out, filter 320ms linear",
                    }}
                >
                    {label}
                    <div
                        ref={bodyRef}
                        className="max-h-[calc(100vh-200px)] overflow-auto overscroll-contain pr-1"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}