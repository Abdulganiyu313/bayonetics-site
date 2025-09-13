"use client";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.scss";

type Props = HTMLAttributes<HTMLDivElement> & { delay?: number };

export default function Reveal({
  delay = 0,
  className = "",
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${show ? styles.in : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </div>
  );
}
