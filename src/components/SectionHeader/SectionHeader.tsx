import styles from "./SectionHeader.module.css";

type Props = {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
};

export default function SectionHeader({ title, subtitle, align = "center" }: Props) {
    return (
        <div className={`${styles.wrap} ${styles[align]}`}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
    );
}