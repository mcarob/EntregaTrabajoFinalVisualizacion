import { useEffect, useState } from "react";

/**
 * Checks if a static asset exists (useful on GitHub Pages where missing files
 * often fall back to index.html).
 */
export default function useFileExists(url: string) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        const ok = res.ok;
        if (!cancelled) setExists(ok);
      } catch {
        if (!cancelled) setExists(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return exists;
}
