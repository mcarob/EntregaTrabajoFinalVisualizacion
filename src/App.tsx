import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import Shell from "./components/Shell";
import { classNames } from "./components/ui";

// Minimal self-tests (run in browser)
function runSelfTests() {
  console.assert(classNames("a", false, "b") === "a b", "classNames join");
  console.assert(classNames(undefined, null, "x") === "x", "classNames skip");
  console.assert(classNames(false, null, undefined) === "", "classNames empty");
}

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined") runSelfTests();
  }, []);

  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
