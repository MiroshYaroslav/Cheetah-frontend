import styles from "./Button.module.css";

type Props = {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    type?: "button" | "submit";
};

export default function Button({
                                   children,
                                   href,
                                   onClick,
                                   variant = "primary",
                                   size = "md",
                                   className = "",
                                   type = "button",
                               }: Props) {
    const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

    if (href) {
        return (
            <a className={cls} href={href}>
                {children}
            </a>
        );
    }

    return (
        <button className={cls} type={type} onClick={onClick}>
            {children}
        </button>
    );
}