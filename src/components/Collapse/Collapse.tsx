import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Collapse.module.css";

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
    durationMs?: number;
};

export default function Collapse({ isOpen, children, durationMs = 260 }: Props) {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number | "auto">(isOpen ? "auto" : 0);

    useLayoutEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        const full = el.scrollHeight;

        if (isOpen) {
            // 0 -> full -> auto
            setHeight(full);
            const t = window.setTimeout(() => setHeight("auto"), durationMs);
            return () => window.clearTimeout(t);
        } else {
            setHeight(full);
            requestAnimationFrame(() => setHeight(0));
        }
    }, [isOpen, durationMs]);

    return (
        <div
            className={styles.outer}
            style={{ height: height === "auto" ? "auto" : `${height}px`, transitionDuration: `${durationMs}ms` }}
            aria-hidden={!isOpen}
        >
            <div ref={innerRef} className={styles.inner}>
                {children}
            </div>
        </div>
    );
}