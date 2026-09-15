import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import type { CartItemType } from "../../store/cartStore";
import styles from "./OrderPlaced.module.css";

export default function OrderPlaced() {
    const location = useLocation();
    const navigate = useNavigate();

    // Отримуємо дані про замовлення, які ми передамо з Checkout
    const { items = [], totalPrice = 0, orderCode = "1989797" } = location.state || {};

    // Якщо хтось зайшов на цю сторінку напряму (без замовлення) - кидаємо на головну
    useEffect(() => {
        if (!location.state) {
            navigate("/");
        }
    }, [location.state, navigate]);

    if (!location.state) return null;

    const formatPrice = (price: number) => {
        return price.toLocaleString('en-US').replace(/,/g, ' ');
    };

    return (
        <div className={styles.page}>
            <Container>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>

                        <div className={styles.statusBlock}>
                            <div className={styles.successIconWrap}>
                                <img src="/success.svg" alt="Success" className={styles.successIcon} />
                            </div>

                            <h1 className={styles.title}>Order placed</h1>

                            <p className={styles.subtitle}>
                                You will receive an email notification with a unique order code.
                            </p>
                        </div>

                        <div className={styles.actionBlock}>
                            <div className={styles.orderCode}>
                                {orderCode}
                            </div>

                            <p className={styles.botText}>
                                You can check the preparation status of your motorcycle using<br/>
                                the unique order code prior to shipment here <a href="https://t.me/bot_link" target="_blank" rel="noreferrer" className={styles.botLink}>link to the bot</a>.
                            </p>

                            {/* Використовуємо fullWidth замість кастомного класу ширини */}
                            <Button
                                variant="primary"
                                fullWidth
                                href="https://t.me/bot_link"
                            >
                                <span className={styles.tgInner}>
                                    <img src="/telegram.svg" alt="Telegram" className={styles.tgIcon} />
                                    <span>TELEGRAM</span>
                                </span>
                            </Button>
                        </div>

                        {/* --- БЛОК 4: ЧЕК (Нижня частина, об'єднана з розділювачем) --- */}
                        <div className={styles.bottomSection}>

                            {/* Блок 4.1: Лінія та заголовок (відступ 8px) */}
                            <div className={styles.checkHeader}>
                                <div className={styles.divider} />
                                <h2 className={styles.checkTitle}>Check:</h2>
                            </div>

                            {/* Блок 4.2: Список товарів та сума (відступ 8px) */}
                            <div className={styles.checkDetails}>
                                <div className={styles.receiptList}>
                                    {items.map((item: CartItemType) => (
                                        <div key={item.id} className={styles.receiptRow}>
                                            <span>{item.config ? "Motorcycle" : "Part"} {item.name}:</span>
                                            <span className={styles.rowPrice}>
                                                {formatPrice(item.price * item.quantity)} $
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.receiptTotal}>
                                    <span className={styles.totalLabel}>Price:</span>
                                    <span className={styles.totalValue}>
                                        {formatPrice(totalPrice)} $
                                    </span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}