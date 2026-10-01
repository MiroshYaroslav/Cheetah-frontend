import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ДОДАЛИ ХУК
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PartCard from "../../components/PartCard/PartCard";
import { parts } from "../../data/partsData";
import { useCartStore, type CartItemType } from "../../store/cartStore";
import type { PartItem } from "../../data/types";
import styles from "./Cart.module.css";

function QuantitySelector({ item, updateQuantity }: { item: CartItemType, updateQuantity: (id: string, amount: number) => void }) {
    const [prevQty, setPrevQty] = useState(item.quantity);
    const [direction, setDirection] = useState<'up' | 'down'>('up');

    if (item.quantity !== prevQty) {
        setDirection(item.quantity > prevQty ? 'up' : 'down');
        setPrevQty(item.quantity);
    }

    return (
        <div className={styles.quantityControl}>
            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                <img src="/minus.svg" alt="minus" className={styles.qtyIcon} />
            </button>
            <div className={styles.qtyNumberWrap}>
                <span key={item.quantity} className={`${styles.qtyAnimated} ${direction === 'up' ? styles.qtyUp : styles.qtyDown}`}>
                    {item.quantity}
                </span>
            </div>
            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>
                <img src="/plus.svg" alt="plus" className={styles.qtyIcon} />
            </button>
        </div>
    );
}

export default function Cart() {
    const { items, updateQuantity, removeItem, addItem } = useCartStore();
    const { t } = useTranslation(); // ІНІЦІАЛІЗАЦІЯ ПЕРЕКЛАДУ
    const [uncheckedIds, setUncheckedIds] = useState<Set<string>>(new Set());
    const navigate = useNavigate();

    const totalPrice = useMemo(() => items.reduce((sum, item) => !uncheckedIds.has(item.id) ? sum + item.price * item.quantity : sum, 0), [items, uncheckedIds]);
    const isAllSelected = useMemo(() => items.length > 0 && items.every((item) => !uncheckedIds.has(item.id)), [items, uncheckedIds]);
    const hasSelectedItems = useMemo(() => items.some((item) => !uncheckedIds.has(item.id)), [items, uncheckedIds]);

    const handleItemToggle = (id: string) => {
        setUncheckedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const handleSelectAllToggle = () => setUncheckedIds(isAllSelected ? new Set(items.map(item => item.id)) : new Set());
    const formatPrice = (price: number) => price.toLocaleString('en-US').replace(/,/g, ' ');

    const visibleParts = useMemo(() => parts.filter(p => !items.some(item => item.id === p.id || item.id.startsWith(`${p.id}-`))), [items]);

    const handleAddPart = (part: PartItem, selectedColorIndex: number) => {
        const color = part.colors && part.colors.length > 0 ? part.colors[selectedColorIndex] : null;
        const uniqueId = color ? `${part.id}-${color}` : part.id;
        const numericPrice = typeof part.price === 'string' ? parseInt(part.price.replace(/\D/g, ''), 10) : part.price;

        addItem({
            id: uniqueId, name: part.title, price: numericPrice, image: part.image, quantity: 1,
            partColor: color || undefined, partSubtitle: part.subtitle || undefined
        });
    };

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onInit = useCallback((emblaApi: EmblaCarouselType) => setScrollSnaps(emblaApi.scrollSnapList()), []);
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        setTimeout(() => { onInit(emblaApi); onSelect(emblaApi); }, 0);
        emblaApi.on("reInit", onInit); emblaApi.on("reInit", onSelect); emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return (
        <div className={styles.cartPage}>
            <Container>
                <Breadcrumbs />
                <div className={styles.pageHeader}>
                    <SectionHeader title={t('cart.title')} align="left" /> {/* ПЕРЕКЛАД */}
                    <p className={styles.headerSubtitle} style={{ whiteSpace: "pre-line" }}>{t('cart.subtitle1')}</p> {/* ПЕРЕКЛАД */}
                    <p className={styles.headerSubtitle}>{t('cart.subtitle2')}</p> {/* ПЕРЕКЛАД */}
                    <Button href="/privacy-policy" variant="outline" className={styles.privacyBtn} iconRight={<img src="/CaretRight.svg" alt="arrow right" />}>
                        {t('nav.privacy')} {/* ПЕРЕКЛАД */}
                    </Button>
                </div>

                <div className={styles.layout}>
                    <div className={styles.itemsColumn}>
                        {items.length === 0 ? (
                            <div className={styles.emptyCart}>{t('cart.empty')}</div>
                        ) : (
                            items.map((item: CartItemType) => {
                                const isChecked = !uncheckedIds.has(item.id);
                                return (
                                    <div key={item.id} className={styles.cartCard}>
                                        <div className={styles.left}>
                                            <div className={styles.cardActions}>
                                                <input type="checkbox" className={styles.checkbox} checked={isChecked} onChange={() => handleItemToggle(item.id)} />
                                                <button className={styles.actionBtn} onClick={() => { removeItem(item.id); setUncheckedIds(prev => { const next = new Set(prev); next.delete(item.id); return next; }); }}>
                                                    <img src="/trash.svg" alt="delete" className={styles.deleteIcon} />
                                                </button>
                                            </div>
                                            <div className={styles.cardImageWrap}>
                                                <img src={item.image} alt={item.name} className={styles.cardImage} />
                                            </div>
                                        </div>

                                        <div className={styles.right}>
                                            <h2 className={styles.itemName}>{item.name}</h2>
                                            {/* ДИНАМІЧНИЙ БЛОК ХАРАКТЕРИСТИК (Мотоцикл) */}
                                            {item.stats && (
                                                <div className={styles.infoBlock}>
                                                    <h3 className={styles.infoTitle}>{t('cart.specs')}</h3>
                                                    <div className={styles.specsRow}>
                                                        {Object.entries(item.stats).map(([key, value], index, array) => {
                                                            // 1. Перекладаємо ключі (weight, speed, cooling)
                                                            let translatedKey = key;
                                                            if (key === 'weight') translatedKey = t('models.weight');
                                                            if (key === 'speed') translatedKey = t('models.maxSpeed');
                                                            if (key === 'cooling') translatedKey = t('models.cooling');

                                                            // 2. Перекладаємо специфічні значення (Liquid -> Рідинне)
                                                            let translatedValue = String(value);
                                                            if (translatedValue === 'Liquid') {
                                                                translatedValue = t('models.liquid');
                                                            }

                                                            return (
                                                                <React.Fragment key={key}>
                                                                    <span className={styles.specText}>
                                                                        {translatedKey.toUpperCase()} {translatedValue.toUpperCase()}
                                                                    </span>
                                                                    {index < array.length - 1 && <div className={styles.dividerV} />}
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                            {item.config && (() => {
                                                const configOptions = [
                                                    { id: 'frame', label: item.config.frameLabel, hasDot: true },
                                                    { id: 'plastic', label: item.config.plasticLabel },
                                                    { id: 'tires', label: item.config.tiresLabel }
                                                ].filter(opt => Boolean(opt.label));
                                                return (
                                                    <div className={styles.infoBlock}>
                                                        <h3 className={styles.infoTitle}>{t('cart.config')}</h3> {/* ПЕРЕКЛАД */}
                                                        <div className={styles.specsRow}>
                                                            {configOptions.map((opt, index, array) => (
                                                                <React.Fragment key={opt.id}>
                                                                    <span className={styles.specText}>{opt.hasDot && <span className={styles.colorDot} style={{ background: '#000' }}></span>}{opt.label.toUpperCase()}</span>
                                                                    {index < array.length - 1 && <div className={styles.dividerV} />}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                            {(!item.config && (item.partColor || item.partSubtitle)) && (
                                                <div className={styles.infoBlock}>
                                                    <h3 className={styles.infoTitle}>{t('cart.config')}</h3> {/* ПЕРЕКЛАД */}
                                                    <div className={styles.specsRow}>
                                                        <span className={styles.specText}>
                                                            {item.partColor && <span className={styles.colorDot} style={{ background: item.partColor }}></span>}
                                                            {item.partSubtitle ? item.partSubtitle.toUpperCase() : "SELECTED"}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className={styles.cardFooter}>
                                                <div className={styles.qtySection}>
                                                    <span className={styles.qtyLabel}>{t('cart.qty')}</span> {/* ПЕРЕКЛАД */}
                                                    <QuantitySelector item={item} updateQuantity={updateQuantity} />
                                                </div>
                                                <div className={styles.itemPrice}>
                                                    <span className={styles.priceLabel}>{t('cart.price')}</span> {/* ПЕРЕКЛАД */}
                                                    <span className={styles.priceValue}>{formatPrice(item.price * item.quantity)} $</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className={styles.summaryColumn}>
                        <div className={styles.summaryCard}>
                            <label className={styles.selectAll}>
                                <input type="checkbox" className={styles.checkbox} checked={isAllSelected} onChange={handleSelectAllToggle} disabled={items.length === 0} />
                                {t('cart.selectAll')} {/* ПЕРЕКЛАД */}
                            </label>

                            <div className={styles.summaryHeader}>
                                <h2 className={styles.summaryTitle}>{t('cart.placingTitle')}</h2> {/* ПЕРЕКЛАД */}
                                <p className={styles.deliveryNote}>{t('cart.production')}</p> {/* ПЕРЕКЛАД */}
                            </div>
                            <div className={styles.divider} />

                            <div className={styles.receiptList}>
                                {items.filter(item => !uncheckedIds.has(item.id)).map(item => (
                                    <div key={item.id} className={styles.receiptRow}>
                                        <span>{item.config ? t('cart.motoLabel') : t('cart.partLabel')} {item.name}:</span> {/* ПЕРЕКЛАД */}
                                        <span className={styles.rowPrice}>{formatPrice(item.price * item.quantity)} $</span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.receiptTotal}>
                                <span className={styles.totalLabel}>{t('cart.price')}</span> {/* ПЕРЕКЛАД */}
                                <span className={styles.totalValue}>{formatPrice(totalPrice)} $</span>
                            </div>

                            <Button variant="primary" className={styles.checkoutBtn} disabled={!hasSelectedItems} onClick={() => {
                                const selectedItemsToBuy = items.filter(item => !uncheckedIds.has(item.id));
                                navigate("/checkout", { state: { selectedItems: selectedItemsToBuy } });
                            }}>
                                {t('ui.buy')} {/* ПЕРЕКЛАД */}
                            </Button>
                        </div>
                    </div>
                </div>

                {visibleParts.length > 0 && (
                    <div className={styles.partsSection}>
                        <div className={styles.partsHeader}>
                            <SectionHeader title={t('nav.parts')} subtitle={t('parts.subtitle')} align="left" subtitleAlign="left" /> {/* ПЕРЕКЛАД */}
                        </div>

                        <div className={styles.embla} ref={emblaRef}>
                            <div className={styles.emblaContainer}>
                                {visibleParts.map((p) => (
                                    <div key={p.id} className={styles.emblaSlide}>
                                        <PartCard part={p} onAddToCart={handleAddPart} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {scrollSnaps.length > 1 && (
                            <div className={styles.partsControls}>
                                <div className={styles.partsDots}>
                                    {scrollSnaps.map((_, index) => (
                                        <button key={index} type="button" className={`${styles.partsDot} ${index === selectedIndex ? styles.partsDotActive : ""}`} onClick={() => scrollTo(index)} />
                                    ))}
                                </div>
                                <div className={styles.partsArrows}>
                                    <button type="button" className={styles.partsArrowBtn} onClick={scrollPrev} disabled={prevBtnDisabled}>
                                        <span className={styles.partsArrowIconImg} />
                                    </button>
                                    <button type="button" className={styles.partsArrowBtn} onClick={scrollNext} disabled={nextBtnDisabled}>
                                        <span className={`${styles.partsArrowIconImg} ${styles.partsArrowRight}`} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}