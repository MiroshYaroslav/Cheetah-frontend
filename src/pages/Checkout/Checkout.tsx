import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useCartStore, type CartItemType } from "../../store/cartStore";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Checkout.module.css";

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const storeItems = useCartStore(state => state.items);

    const items: CartItemType[] = location.state?.selectedItems || storeItems;

    // --- СТЕЙТИ ДАНИХ КОРИСТУВАЧА ---
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "+380", // За замовчуванням ставимо код України
        email: "",
        deliveryAddress: ""
    });

    // --- СТЕЙТИ ФОРМИ ---
    const [paymentMethod, setPaymentMethod] = useState<"store" | "gpay" | "card">("store");
    const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "nova_poshta" | "ukrposhta">("pickup");
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    // --- СТЕЙТ ДЛЯ КАРТКИ (UI заглушка) ---
    const [cardNumber, setCardNumber] = useState("");

    // Автовизначення типу картки (Visa / Mastercard)
    const cardBrand = useMemo(() => {
        const cleanNum = cardNumber.replace(/\D/g, "");
        if (cleanNum.startsWith("4")) return "visa";
        return "mastercard";
    }, [cardNumber]);

    const hasMotorcycle = useMemo(() => items.some(item => item.config), [items]);
    const hasParts = useMemo(() => items.some(item => !item.config), [items]);
    const isDeliveryDisabled = hasMotorcycle && !hasParts;

    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    useEffect(() => {
        if (isDeliveryDisabled && deliveryMethod !== "pickup") {
            setTimeout(() => {
                setDeliveryMethod("pickup");
            }, 0);
        }
    }, [isDeliveryDisabled, deliveryMethod]);

    useEffect(() => {
        if (items.length === 0) {
            navigate("/");
        }
    }, [items, navigate]);

    // РОЗУМНА ОБРОБКА ТЕЛЕФОНУ
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "");

        if (digits.startsWith("0") && digits.length >= 10) {
            digits = "38" + digits;
        }
        else if (!digits.startsWith("38") && digits.length >= 9) {
            digits = "380" + digits;
        }

        if (!digits.startsWith("380")) {
            digits = "380";
        }

        digits = digits.slice(0, 12);

        // ВИПРАВЛЕНО: використовуємо setFormData замість setForm
        setFormData({ ...formData, phone: "+" + digits });
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();

        // Перевіряємо, чи введено повністю телефон
        if (formData.phone.length < 13) {
            alert("Please enter a valid phone number (+380XXXXXXXXX)");
            return;
        }

        if (paymentMethod === "gpay") {
            alert("Відкривається вікно Google Pay / Apple Pay...");
        } else {
            // 1. Генеруємо код замовлення
            const demoOrderCode = Math.floor(1000000 + Math.random() * 9000000).toString();

            // 2. Очищаємо кошик (тепер функція існує і не видасть помилку!)
            useCartStore.getState().clearCart();

            // 3. Перекидаємо на сторінку успіху
            navigate("/order-placed", {
                state: {
                    items: items,
                    totalPrice: totalPrice,
                    orderCode: demoOrderCode
                }
            });
        }
    };

    const getBannerText = () => {
        if (hasMotorcycle && hasParts) {
            return "Please stop by our store to pick up your motorcycle once you receive a notification that it is ready. If you would like us to ship the parts to you, please fill out the shipping form below.";
        }
        return "Please come to our store to pick up your purchase after you receive the notification that it is ready.";
    };

    return (
        <div className={styles.checkoutPage}>
            <Container>
                <Breadcrumbs />

                <h1 className={styles.mainTitle}>PLACING AN ORDER</h1>

                <form className={styles.form} onSubmit={handlePlaceOrder}>

                    {/* 1. CONTACT INFORMATION */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>1. Contact Information</h2>
                            <p className={styles.sectionDesc}>
                                We need this information so we can keep you updated on the status of your order.
                            </p>
                        </div>

                        <div className={styles.inputsGrid}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Name *"
                                required
                                minLength={2}
                                maxLength={50}
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Last Name *"
                                required
                                minLength={2}
                                maxLength={50}
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                            <div className={styles.phoneInputWrap}>
                                <span className={styles.flagWrap} aria-hidden="true">
                                    <img src="/ukraine-flag.svg" alt="Flag" className={styles.flagImage} />
                                </span>
                                <input
                                    type="tel"
                                    className={styles.inputPhone}
                                    placeholder="Phone *"
                                    name="phone"             /* ДОДАНО ДЛЯ АВТОЗАПОВНЕННЯ */
                                    autoComplete="tel"       /* ДОДАНО ДЛЯ АВТОЗАПОВНЕННЯ */
                                    required
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                />
                            </div>
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="Email *"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* 2. PAYMENT */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>2. Payment</h2>
                            <p className={styles.sectionDesc}>Select a payment method</p>
                        </div>

                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "store"}
                                    onChange={() => setPaymentMethod("store")}
                                />
                                <span className={styles.customRadio}></span>
                                Payment from store
                            </label>

                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "gpay"}
                                    onChange={() => setPaymentMethod("gpay")}
                                />
                                <span className={styles.customRadio}></span>
                                Google Pay/Apple Pay
                            </label>

                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="payment"
                                    checked={paymentMethod === "card"}
                                    onChange={() => setPaymentMethod("card")}
                                />
                                <span className={styles.customRadio}></span>
                                Card
                            </label>

                            {/* РОЗШИРЕННЯ ДЛЯ КАРТКИ */}
                            {paymentMethod === "card" && (
                                <div className={styles.cardDetails}>
                                    <div className={styles.cardInputWrap}>
                                        <div className={styles.cardIcons}>
                                            <img
                                                src={cardBrand === "mastercard" ? "/mastercard.svg" : "/visa.svg"}
                                                alt={cardBrand}
                                                className={styles.cIcon}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            className={styles.inputCard}
                                            placeholder="Card Number *"
                                            value={cardNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "").substring(0, 16);
                                                const formatted = val.match(/.{1,4}/g)?.join(" ") || "";
                                                setCardNumber(formatted);
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className={styles.cardRow}>
                                        <input type="text" className={styles.input} placeholder="Validity period *" required />
                                        <input type="text" className={styles.input} placeholder="CVV2/CVC2 *" required />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 3. DELIVERY */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>3. Delivery</h2>
                            {hasMotorcycle && isBannerVisible && (
                                <div className={styles.warningBanner}>
                                    <div className={styles.bannerIcon}>
                                        <img src="/info.svg" alt="Info" className={styles.infoIcon}/>
                                    </div>
                                    <div className={styles.bannerText}>
                                        <span>Please note! We do not delivery motorcycles.</span>
                                        <br/>
                                        {getBannerText()}
                                    </div>
                                    <button type="button" className={styles.closeBanner} onClick={() => setIsBannerVisible(false)}>
                                        <img src="/close.svg" alt="Close" className={styles.closeIcon}/>
                                    </button>
                                </div>
                            )}
                        </div>

                        {(deliveryMethod === "nova_poshta" || deliveryMethod === "ukrposhta") && (
                            <input
                                type="text"
                                className={`${styles.input} ${styles.addressInput}`}
                                placeholder="Delivery Address *"
                                required
                                minLength={5}
                                value={formData.deliveryAddress}
                                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                            />
                        )}

                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="delivery"
                                    checked={deliveryMethod === "pickup"}
                                    onChange={() => setDeliveryMethod("pickup")}
                                />
                                <span className={styles.customRadio}></span>
                                Pickup in store
                            </label>

                            <label className={`${styles.radioLabel} ${isDeliveryDisabled ? styles.radioDisabled : ""}`}>
                                <input
                                    type="radio"
                                    name="delivery"
                                    disabled={isDeliveryDisabled}
                                    checked={deliveryMethod === "nova_poshta"}
                                    onChange={() => setDeliveryMethod("nova_poshta")}
                                />
                                <span className={styles.customRadio}></span>
                                Nova Poshta
                            </label>

                            <label className={`${styles.radioLabel} ${isDeliveryDisabled ? styles.radioDisabled : ""}`}>
                                <input
                                    type="radio"
                                    name="delivery"
                                    disabled={isDeliveryDisabled}
                                    checked={deliveryMethod === "ukrposhta"}
                                    onChange={() => setDeliveryMethod("ukrposhta")}
                                />
                                <span className={styles.customRadio}></span>
                                Ukrposhta
                            </label>
                        </div>
                    </div>

                    {/* --- ПІДСУМОК ТА КНОПКА (ПІД УСІМ) --- */}
                    <div className={styles.summarySection}>
                        <div className={styles.divider} />

                        <div className={styles.receiptList}>
                            {items.map(item => (
                                <div key={item.id} className={styles.receiptRow}>
                                    <span>{item.config ? "Motorcycle" : "Part"} {item.name}:</span>
                                    <span className={styles.rowPrice}>
                                        {(item.price * item.quantity).toLocaleString('en-US').replace(/,/g, ' ')} $
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.receiptTotal}>
                            <span className={styles.totalLabel}>Price:</span>
                            <span className={styles.totalValue}>
                                {totalPrice.toLocaleString('en-US').replace(/,/g, ' ')} $
                            </span>
                        </div>

                        <Button variant="primary" type="submit" className={styles.submitBtn} disabled={items.length === 0}>
                            PLACE AN ORDER
                        </Button>
                    </div>

                </form>
            </Container>
        </div>
    );
}