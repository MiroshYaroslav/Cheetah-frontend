import { type ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
    children: ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "md" | "sm";
    fullWidth?: boolean;
    iconRight?: ReactNode;
};

export default function Button({
                                   children,
                                   href,
                                   onClick,
                                   type = "button",
                                   disabled = false,
                                   className = "",
                                   variant = "primary",
                                   size = "md",
                                   fullWidth = false,
                                   iconRight,
                               }: Props) {
    // Збираємо всі класи до купи
    const cls = [
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        iconRight ? styles.hasIcon : "", // Якщо є іконка, змінюємо вирівнювання
        disabled ? styles.disabled : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Спільний вміст для кнопки або посилання
    const content = (
        <>
            <span className={styles.text}>{children}</span>
            {iconRight && <span className={styles.icon}>{iconRight}</span>}
        </>
    );

    if (href) {
        return (
            <a className={cls} href={href} aria-disabled={disabled}>
                {content}
            </a>
        );
    }

    return (
        <button className={cls} type={type} onClick={onClick} disabled={disabled}>
            {content}
        </button>
    );
}