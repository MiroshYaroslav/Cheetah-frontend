import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import type { CartItemType } from "../../store/cartStore";
import styles from "./OrderPlaced.module.css";

export default function OrderPlaced() {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ

    const { items = [], totalPrice = 0, orderCode = "1989797" } = location.state || {};

    useEffect(() => {
        if (!location.state) navigate("/");
    }, [location.state, navigate]);

    if (!location.state) return null;

    const formatPrice = (price: number) => price.toLocaleString('en-US').replace(/,/g, ' ');

    return (
        <div className={styles.page}>
            <Container>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        <div className={styles.statusBlock}>
                            <div className={styles.successIconWrap}>
                                <img src="/success.svg" alt="Success" className={styles.successIcon} />
                            </div>
                            <h1 className={styles.title}>{t('orderPlaced.title')}</h1> {/* ПЕРЕКЛАД */}
                            <p className={styles.subtitle}>{t('orderPlaced.sub1')}</p> {/* ПЕРЕКЛАД */}
                        </div>

                        <div className={styles.actionBlock}>
                            <div className={styles.orderCode}>{orderCode}</div>
                            <p className={styles.botText} style={{ whiteSpace: "pre-line" }}>
                                {t('orderPlaced.botText')} <a href="https://t.me/bot_link" target="_blank" rel="noreferrer" className={styles.botLink}>{t('orderPlaced.link')}</a>.
                            </p>
                            <Button variant="primary" fullWidth href="https://t.me/bot_link">
                                <span className={styles.tgInner}>
                                    <img src="/telegram.svg" alt="Telegram" className={styles.tgIcon} />
                                    <span>TELEGRAM</span>
                                </span>
                            </Button>
                        </div>

                        <div className={styles.bottomSection}>
                            <div className={styles.checkHeader}>
                                <div className={styles.divider} />
                                <h2 className={styles.checkTitle}>{t('orderPlaced.checkTitle')}</h2> {/* ПЕРЕКЛАД */}
                            </div>
                            <div className={styles.checkDetails}>
                                <div className={styles.receiptList}>
                                    {items.map((item: CartItemType) => (
                                        <div key={item.id} className={styles.receiptRow}>
                                            <span>{item.config ? t('cart.motoLabel') : t('cart.partLabel')} {item.name}:</span>
                                            <span className={styles.rowPrice}>{formatPrice(item.price * item.quantity)} $</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.receiptTotal}>
                                    <span className={styles.totalLabel}>{t('cart.price')}</span>
                                    <span className={styles.totalValue}>{formatPrice(totalPrice)} $</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}