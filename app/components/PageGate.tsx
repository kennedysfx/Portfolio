"use client";

import { useState } from "react";
import Loader from "./Loader";

// Keeps the rest of the site (Header, Hero, About, Projects, TechStack,
// Contact) completely unmounted while the loader is showing. Since the
// loader is just a full-screen overlay, everything underneath it was
// still mounting and running (intervals, infinite loop animations,
// scroll listeners) at the same time the loader tried to animate —
// that competition for the main thread is what was choking the loader
// on mobile. Gating the children like this means nothing else runs
// until the loader is actually done.
export default function PageGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Loader onFinish={() => setReady(true)} />
      {ready && children}
    </>
  );
}