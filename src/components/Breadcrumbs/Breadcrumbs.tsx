import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

interface BreadcrumbsProps {
    currentPage: string;
}

export default function Breadcrumbs({ currentPage }: BreadcrumbsProps) {
    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/" className={styles.link}>
                MAIN PAGE
            </Link>
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{currentPage}</span>
        </nav>
    );
}