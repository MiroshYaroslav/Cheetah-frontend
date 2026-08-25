import { useMemo } from "react";
import Container from "../../components/Container/Container";
import PartCard from "../../components/PartCard/PartCard";
import { parts } from "../../data/partsData";
import { useCartStore } from "../../store/cartStore";
import styles from "./Parts.module.css";
import type { PartItem } from "../../data/types";

export default function Parts() {
    const items = useCartStore(state => state.items);
    const addItem = useCartStore(state => state.addItem);

    const visibleParts = useMemo(() => {
        return parts.filter(p => !items.some(item => item.id === p.id || item.id.startsWith(`${p.id}-`)));
    }, [items]);

    const handleAddPart = (part: PartItem, selectedColorIndex: number) => {
        const color = part.colors && part.colors.length > 0
            ? part.colors[selectedColorIndex]
            : null;

        const uniqueId = color ? `${part.id}-${color}` : part.id;

        const numericPrice = typeof part.price === 'string'
            ? parseInt(part.price.replace(/\D/g, ''), 10)
            : part.price;

        addItem({
            id: uniqueId,
            name: part.title,
            price: numericPrice,
            image: part.image,
            quantity: 1
        });
    };

    if (visibleParts.length === 0) return null;

    return (
        <section id="parts" className={styles.section}>
            <Container>
                <div className={styles.grid}>
                    {visibleParts.map((p) => (
                        <PartCard
                            key={p.id}
                            part={p}
                            onAddToCart={handleAddPart}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}