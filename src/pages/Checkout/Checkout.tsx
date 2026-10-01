import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { useCartStore, type CartItemType } from "../../store/cartStore";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import styles from "./Checkout.module.css";

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ
    const storeItems = useCartStore(state => state.items);
    const items: CartItemType[] = location.state?.selectedItems || storeItems;

    const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "+380", email: "", deliveryAddress: "" });
    const [paymentMethod, setPaymentMethod] = useState<"store" | "gpay" | "card">("store");
    const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "nova_poshta" | "ukrposhta">("pickup");
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [cardNumber, setCardNumber] = useState("");

    const cardBrand = useMemo(() => {
        const cleanNum = cardNumber.replace(/\D/g, "");
        if (cleanNum.startsWith("4")) return "visa";
        return "mastercard";
    }, [cardNumber]);

    const hasMotorcycle = useMemo(() => items.some(item => item.config), [items]);
    const hasParts = useMemo(() => items.some(item => !item.config), [items]);
    const isDeliveryDisabled = hasMotorcycle && !hasParts;

    const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

    useEffect(() => {
        if (isDeliveryDisabled && deliveryMethod !== "pickup") {
            setTimeout(() => setDeliveryMethod("pickup"), 0);
        }
    }, [isDeliveryDisabled, deliveryMethod]);

    useEffect(() => {
        if (items.length === 0) navigate("/");
    }, [items, navigate]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let digits = e.target.value.replace(/\D/g, "");
        if (digits.startsWith("0") && digits.length >= 10) digits = "38" + digits;
        else if (!digits.startsWith("38") && digits.length >= 9) digits = "380" + digits;
        if (!digits.startsWith("380")) digits = "380";
        digits = digits.slice(0, 12);
        setFormData({ ...formData, phone: "+" + digits });
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.length < 13) {
            alert(t('checkout.alertPhone')); // ПЕРЕКЛАД
            return;
        }

        if (paymentMethod === "gpay") {
            alert("Відкривається вікно Google Pay / Apple Pay...");
        } else {
            const demoOrderCode = Math.floor(1000000 + Math.random() * 9000000).toString();
            useCartStore.getState().clearCart();
            navigate("/order-placed", { state: { items: items, totalPrice: totalPrice, orderCode: demoOrderCode } });
        }
    };

    return (
        <div className={styles.checkoutPage}>
            <Container>
                <Breadcrumbs />
                <h1 className={styles.mainTitle}>{t('checkout.title')}</h1> {/* ПЕРЕКЛАД */}

                <form className={styles.form} onSubmit={handlePlaceOrder}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>{t('checkout.c1Title')}</h2> {/* ПЕРЕКЛАД */}
                            <p className={styles.sectionDesc}>{t('checkout.c1Desc')}</p> {/* ПЕРЕКЛАД */}
                        </div>

                        <div className={styles.inputsGrid}>
                            <input type="text" className={styles.input} placeholder={t('checkout.namePlc')} required minLength={2} maxLength={50} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                            <input type="text" className={styles.input} placeholder={t('checkout.lastPlc')} required minLength={2} maxLength={50} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            <div className={styles.phoneInputWrap}>
                                <span className={styles.flagWrap} aria-hidden="true"><img src="/ukraine-flag.svg" alt="Flag" className={styles.flagImage} /></span>
                                <input type="tel" className={styles.inputPhone} placeholder={t('checkout.phonePlc')} name="phone" autoComplete="tel" required value={formData.phone} onChange={handlePhoneChange} />
                            </div>
                            <input type="email" className={styles.input} placeholder={t('checkout.emailPlc')} required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>{t('checkout.c2Title')}</h2> {/* ПЕРЕКЛАД */}
                            <p className={styles.sectionDesc}>{t('checkout.c2Desc')}</p> {/* ПЕРЕКЛАД */}
                        </div>

                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="payment" checked={paymentMethod === "store"} onChange={() => setPaymentMethod("store")} />
                                <span className={styles.customRadio}></span>{t('checkout.payStore')}
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="payment" checked={paymentMethod === "gpay"} onChange={() => setPaymentMethod("gpay")} />
                                <span className={styles.customRadio}></span>{t('checkout.payGpay')}
                            </label>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                                <span className={styles.customRadio}></span>{t('checkout.payCard')}
                            </label>

                            {paymentMethod === "card" && (
                                <div className={styles.cardDetails}>
                                    <div className={styles.cardInputWrap}>
                                        <div className={styles.cardIcons}><img src={cardBrand === "mastercard" ? "/mastercard.svg" : "/visa.svg"} alt={cardBrand} className={styles.cIcon} /></div>
                                        <input type="text" className={styles.inputCard} placeholder={t('checkout.cardNum')} value={cardNumber} onChange={(e) => { const val = e.target.value.replace(/\D/g, "").substring(0, 16); const formatted = val.match(/.{1,4}/g)?.join(" ") || ""; setCardNumber(formatted); }} required />
                                    </div>
                                    <div className={styles.cardRow}>
                                        <input type="text" className={styles.input} placeholder={t('checkout.valid')} required />
                                        <input type="text" className={styles.input} placeholder={t('checkout.cvv')} required />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>{t('checkout.c3Title')}</h2> {/* ПЕРЕКЛАД */}
                            {hasMotorcycle && isBannerVisible && (
                                <div className={styles.warningBanner}>
                                    <div className={styles.bannerIcon}><img src="/info.svg" alt="Info" className={styles.infoIcon}/></div>
                                    <div className={styles.bannerText}>
                                        <span>{t('checkout.warningTitle')}</span><br/>
                                        {(hasMotorcycle && hasParts) ? t('checkout.warningBoth') : t('checkout.warningMoto')}
                                    </div>
                                    <button type="button" className={styles.closeBanner} onClick={() => setIsBannerVisible(false)}><img src="/close.svg" alt="Close" className={styles.closeIcon}/></button>
                                </div>
                            )}
                        </div>

                        {(deliveryMethod === "nova_poshta" || deliveryMethod === "ukrposhta") && (
                            <input type="text" className={`${styles.input} ${styles.addressInput}`} placeholder={t('checkout.addressPlc')} required minLength={5} value={formData.deliveryAddress} onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })} />
                        )}

                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input type="radio" name="delivery" checked={deliveryMethod === "pickup"} onChange={() => setDeliveryMethod("pickup")} />
                                <span className={styles.customRadio}></span>{t('checkout.pickup')}
                            </label>
                            <label className={`${styles.radioLabel} ${isDeliveryDisabled ? styles.radioDisabled : ""}`}>
                                <input type="radio" name="delivery" disabled={isDeliveryDisabled} checked={deliveryMethod === "nova_poshta"} onChange={() => setDeliveryMethod("nova_poshta")} />
                                <span className={styles.customRadio}></span>{t('checkout.nova')}
                            </label>
                            <label className={`${styles.radioLabel} ${isDeliveryDisabled ? styles.radioDisabled : ""}`}>
                                <input type="radio" name="delivery" disabled={isDeliveryDisabled} checked={deliveryMethod === "ukrposhta"} onChange={() => setDeliveryMethod("ukrposhta")} />
                                <span className={styles.customRadio}></span>{t('checkout.ukr')}
                            </label>
                        </div>
                    </div>

                    <div className={styles.summarySection}>
                        <div className={styles.divider} />
                        <div className={styles.receiptList}>
                            {items.map(item => (
                                <div key={item.id} className={styles.receiptRow}>
                                    <span>{item.config ? t('cart.motoLabel') : t('cart.partLabel')} {item.name}:</span>
                                    <span className={styles.rowPrice}>{(item.price * item.quantity).toLocaleString('en-US').replace(/,/g, ' ')} $</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.receiptTotal}>
                            <span className={styles.totalLabel}>{t('cart.price')}</span>
                            <span className={styles.totalValue}>{totalPrice.toLocaleString('en-US').replace(/,/g, ' ')} $</span>
                        </div>
                        <Button variant="primary" type="submit" className={styles.submitBtn} disabled={items.length === 0}>
                            {t('checkout.btn')} {/* ПЕРЕКЛАД */}
                        </Button>
                    </div>
                </form>
            </Container>
        </div>
    );
}