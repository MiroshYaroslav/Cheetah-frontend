import { useState, useMemo } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import Parts from "../../sections/Parts/Parts";
import { useCartStore, type CartItemType } from "../../store/cartStore";
import { SHOP_SETTINGS } from "../../data/siteData";
import styles from "./Cart.module.css";

// --- НОВИЙ КОМПОНЕНТ ДЛЯ КЕРУВАННЯ КІЛЬКІСТЮ ТА АНІМАЦІЄЮ ---
function QuantitySelector({ item, updateQuantity }: { item: CartItemType, updateQuantity: (id: string, amount: number) => void }) {
    const [prevQty, setPrevQty] = useState(item.quantity);
    const [direction, setDirection] = useState<'up' | 'down'>('up');

    // Офіційний патерн React для оновлення стану на основі змінених пропсів
    if (item.quantity !== prevQty) {
        setDirection(item.quantity > prevQty ? 'up' : 'down');
        setPrevQty(item.quantity);
    }

    return (
        <div className={styles.quantityControl}>
            <button
                className={styles.qtyBtn}
                onClick={() => updateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
            >
                <img src="/MinusCircle.svg" alt="minus" className={styles.qtyIcon} />
            </button>
            <div className={styles.qtyNumberWrap}>
                <span
                    key={item.quantity}
                    className={`${styles.qtyAnimated} ${direction === 'up' ? styles.qtyUp : styles.qtyDown}`}
                >
                    {item.quantity}
                </span>
            </div>
            <button
                className={styles.qtyBtn}
                onClick={() => updateQuantity(item.id, 1)}
            >
                <img src="/PlusCircle.svg" alt="plus" className={styles.qtyIcon} />
            </button>
        </div>
    );
}
// --- ОСНОВНИЙ КОМПОНЕНТ КОШИКА ---
export default function Cart() {
    // ... весь твій попередній код Cart (стейт, хуки useMemo) залишається без змін ...
    const { items, updateQuantity, removeItem } = useCartStore();
    const [uncheckedIds, setUncheckedIds] = useState<Set<string>>(new Set());

    const deliveryPrice = SHOP_SETTINGS.deliveryPrice;

    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => {
            if (!uncheckedIds.has(item.id)) {
                return sum + item.price * item.quantity;
            }
            return sum;
        }, 0);
    }, [items, uncheckedIds]);

    const finalPrice = useMemo(() => {
        return totalPrice > 0 ? totalPrice + deliveryPrice : 0;
    }, [totalPrice, deliveryPrice]);

    const isAllSelected = useMemo(() => {
        return items.length > 0 && items.every((item) => !uncheckedIds.has(item.id));
    }, [items, uncheckedIds]);

    const hasSelectedItems = useMemo(() => {
        return items.some((item) => !uncheckedIds.has(item.id));
    }, [items, uncheckedIds]);

    const handleItemToggle = (id: string) => {
        setUncheckedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleSelectAllToggle = () => {
        if (isAllSelected) {
            setUncheckedIds(new Set(items.map((item) => item.id)));
        } else {
            setUncheckedIds(new Set());
        }
    };

    return (
        <div className={styles.cartPage}>
            <Container>
                <div className={styles.layout}>
                    <div className={styles.itemsColumn}>
                        {items.length === 0 ? (
                            <div className={styles.emptyCart}>Ваш кошик порожній</div>
                        ) : (
                            items.map((item: CartItemType) => {
                                const isChecked = !uncheckedIds.has(item.id);

                                return (
                                    <div key={item.id} className={styles.cartCard}>
                                        <div className={styles.left}>
                                            <div className={styles.cardActions}>
                                                <input
                                                    type="checkbox"
                                                    className={styles.checkbox}
                                                    checked={isChecked}
                                                    onChange={() => handleItemToggle(item.id)}
                                                />
                                                <button className={styles.actionBtn}>
                                                    <img src="/MagnifyingGlassPlus.svg" alt="zoom" />
                                                </button>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => {
                                                        removeItem(item.id);
                                                        setUncheckedIds((prev) => {
                                                            const next = new Set(prev);
                                                            next.delete(item.id);
                                                            return next;
                                                        });
                                                    }}
                                                >
                                                    <img src="/trash.svg" alt="delete" />
                                                </button>
                                            </div>

                                            <div className={styles.cardImageWrap}>
                                                <img src={item.image} alt={item.name} className={styles.cardImage} />
                                            </div>
                                        </div>

                                        <div className={styles.right}>
                                            <div className={styles.cardHeader}>
                                                <h2 className={styles.itemName}>{item.name}</h2>
                                            </div>

                                            {item.stats && (
                                                <div className={styles.specsBlock}>
                                                    <h2 className={styles.subTitle}>Характеристики</h2>
                                                    <div className={styles.specsList}>
                                                        <span>Weight {item.stats.weight}</span>
                                                        <span>Speed {item.stats.speed}</span>
                                                        <span>Cooling {item.stats.cooling}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {item.config && (
                                                <div className={styles.configBlock}>
                                                    <div className={styles.configHeader}>
                                                        <h2 className={styles.subTitle}>Конфігурації</h2>
                                                        <img src="/settings.svg" alt="edit" className={styles.editIcon} />
                                                    </div>
                                                    <div className={styles.configList}>
                                                        <div className={styles.configItem}>
                                                            <span className={styles.colorDot} style={{ background: '#000' }}></span>
                                                            {item.config.frameLabel}
                                                        </div>
                                                        <div className={styles.configItem}>{item.config.plasticLabel} plastic</div>
                                                        <div className={styles.configItem}>{item.config.tiresLabel} tires</div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className={styles.cardFooter}>
                                                {/* ЗАМІНИЛИ СТАРИЙ БЛОК НА НОВИЙ КОМПОНЕНТ */}
                                                <QuantitySelector item={item} updateQuantity={updateQuantity} />

                                                <div className={styles.itemPrice}>
                                                    {(item.price * item.quantity).toLocaleString('uk-UA')}₴
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className={styles.summaryColumn}>
                        {/* ... блок summaryCard залишається без змін ... */}
                        <div className={styles.summaryCard}>
                            <label className={styles.selectAll}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={isAllSelected}
                                    onChange={handleSelectAllToggle}
                                    disabled={items.length === 0}
                                />
                                Обрати все з кошику
                            </label>

                            <h2 className={styles.summaryTitle}>Оформлення замовлення</h2>
                            <p className={styles.deliveryNote}>
                                Після оплати покупки буде відправленно поштою через 3 місяці.
                            </p>

                            <button className={styles.securityBtn}>
                                <img src="/ShieldCheck.svg" alt="security" />
                                Безпека та конфіденційність
                                <img src="/CaretRight.svg" alt="arrow" className={styles.chevron} />
                            </button>

                            <div className={styles.receiptRow}>
                                <span>Ціна покупок</span>
                                <span>{totalPrice.toLocaleString('uk-UA')}₴</span>
                            </div>
                            <div className={styles.receiptRow}>
                                <span>Ціна доставки</span>
                                <span>{totalPrice > 0 ? deliveryPrice : 0}₴</span>
                            </div>
                            <div className={styles.receiptTotal}>
                                <span>Всього:</span>
                                <span>{finalPrice.toLocaleString('uk-UA')}₴</span>
                            </div>

                            <Button variant="primary" className={styles.checkoutBtn} disabled={!hasSelectedItems}>
                                Buy
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>

            <div className={styles.partsSection}>
                <Parts />
            </div>
        </div>
    );
}