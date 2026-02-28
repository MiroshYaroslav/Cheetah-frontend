import styles from "./Button.module.css";
import React from "react";

type Props = {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
};

export default function Button({
                                   children,
                                   href,
                                   onClick,
                                   variant = "primary",
                                   className = "",
                                   type = "button",
                                   disabled = false,
                               }: Props) {
    const cls = `${styles.btn} ${styles[variant]} ${className} ${disabled ? styles.disabled : ""}`;

    if (href) {
        return (
            <a className={cls} href={href} aria-disabled={disabled}>
                {children}
            </a>
        );
    }

    return (
        <button className={cls} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}