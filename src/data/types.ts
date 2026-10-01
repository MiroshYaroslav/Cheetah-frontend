export type NavLink = { label: string; href: string; labelKey?: string };
export type StatItem = { label: string; value: string; labelKey?: string; valueKey?: string };
export type FAQItem = { q: string; a: string; qKey?: string; aKey?: string };
export type Slide = { src: string; alt: string };

// Робимо color та icon необов'язковими, додаємо labelKey
export type ConfigOption = {
    id: string;
    label: string;
    labelKey?: string;
    color?: string;
    icon?: string;
};

// Тип для категорії характеристик (наприклад, "With headlights?")
export type SpecCategory = {
    id: string;
    title: string;
    titleKey?: string;
    options: ConfigOption[];
};

// Тип для окремої моделі (Enduro, Cross, Street)
export type BikeVariant = {
    id: string;
    name: string;
    image: Slide; // Своє фото для кожного типу
    specs: SpecCategory[]; // Свої налаштування
};

export type PartItem = {
    id: string;
    slug: string;
    title: string;
    titleKey?: string;
    subtitle: string;
    subtitleKey?: string;
    price: string;
    image: string;
    inStock: boolean;
    colors?: string[];
};

// Оновлена структура мотоцикла
export type MotorcycleProduct = {
    id: string;
    basePrice: number;
    stats: StatItem[];
    variants: BikeVariant[]; // Масив з 3-х наших моделей
    configOptions: {
        frame: ConfigOption[];
        plastic: ConfigOption[];
        tires: ConfigOption[];
    };
};

// Тип для товару, який додається в кошик
export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    config: {
        frameLabel: string;
        plasticLabel: string;
        tiresLabel: string;
        specs?: string;
    };
    stats: {
        weight: string;
        speed: string;
        cooling: string;
    };
};