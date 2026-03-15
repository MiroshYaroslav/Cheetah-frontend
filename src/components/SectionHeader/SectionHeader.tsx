import styles from "./SectionHeader.module.css";

type Props = {
    title: string;
    subtitle?: string;
    align?: "left" | "center";

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
                                      }: Props) {
    return (
        <div className={`${styles.wrap} ${styles[align]}`}>
            <div className={styles.row}>
                <div className={styles.textCol}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
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