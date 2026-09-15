import React from "react";
import { Link, useLocation } from "react-router-dom";
import { breadcrumbsMap } from "../../data/breadcrumbsMap"; // Перевір шлях до файлу конфігурації
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
    const location = useLocation();

    // Шукаємо поточний шлях у нашому словнику
    const items = breadcrumbsMap[location.pathname];

    // Якщо для цієї сторінки крихти не прописані, або ми на головній - нічого не рендеримо
    if (!items || items.length === 0) return null;

    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/" className={styles.link}>
                MAIN PAGE
            </Link>
            <span className={styles.separator}>/</span>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                // Якщо це останній елемент АБО в нього немає шляху - це просто текст
                return isLast || !item.path ? (
                    <span key={index} className={styles.current}>
                        {item.label}
                    </span>
                ) : (
                    // Інакше - це клікабельне посилання
                    <React.Fragment key={index}>
                        <Link to={item.path} className={styles.link}>
                            {item.label}
                        </Link>
                        <span className={styles.separator}>/</span>
                    </React.Fragment>
                );
            })}
        </nav>
    );
}