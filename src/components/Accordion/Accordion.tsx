import { useState } from "react";
import type { FAQItem } from "../../data/types";
import styles from "./Accordion.module.css";

type Props = { items: FAQItem[] };

export default function Accordion({ items }: Props) {
    const [openIndex, setOpenIndex] = useState<number>(0);

    return (
        <div className={styles.wrap}>
            {items.map((it, i) => {
                const open = i === openIndex;
                return (
                    <div className={styles.item} key={it.q}>
                        <button
                            className={styles.header}
                            onClick={() => setOpenIndex(open ? -1 : i)}
                            aria-expanded={open}
                            type="button"
                        >
                            <span className={styles.q}>{it.q}</span>
                            <span className={`${styles.icon} ${open ? styles.open : ""}`}>+</span>
                        </button>

                        {open ? (
                            <div className={styles.body}>
                                <div className={styles.inner}>{it.a}</div>
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}