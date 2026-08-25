import styles from "./SectionHeader.module.css";
import React, { type ReactNode } from "react";

type Props = {
    title: ReactNode;
    subtitle?: React.ReactNode;
    align?: "left" | "center";

    titleColor?: string;
    subtitleColor?: string;
    subtitleAlign?: "left" | "center";

    collapsible?: boolean;
    collapsed?: boolean;
    onToggle?: () => void;
};

export default function SectionHeader({
                                          title,
                                          subtitle,
                                          align = "center",
                                          collapsible = false,
                                          collapsed = false,
                                          onToggle,
                                          titleColor,
                                          subtitleColor,
                                          subtitleAlign,
                                      }: Props) {
    return (
        <div className={`${styles.wrap} ${styles[align]}`}>
            <div className={styles.row}>
                <div className={styles.textCol}>
                    <h2
                        className={styles.title}
                        style={{ color: titleColor }}
                    >
                        {title}
                    </h2>

                    {subtitle ? (
                        <p
                            className={styles.subtitle}
                            style={{
                                color: subtitleColor,
                                textAlign: subtitleAlign
                            }}
                        >
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                {collapsible ? (
                    <button
                        type="button"
                        className={`${styles.collapseBtn} ${collapsed ? styles.isCollapsed : ""}`}
                        onClick={onToggle}
                        aria-label={collapsed ? "Expand section" : "Collapse section"}
                        title={collapsed ? "Expand" : "Collapse"}
                    >
                        <img src="/arrow-up.svg" alt="" className={styles.collapseIcon} />
                    </button>
                ) : null}
            </div>
        </div>
    );
}