export type NavLink = { label: string; href: string };

export type StatItem = { label: string; value: string };

export type FAQItem = { q: string; a: string };

export type Testimonial = { name: string; role: string; text: string };

export type Slide = { src: string; alt: string };

export type ConfigOption = {
    id: string;
    label: string;
    color: string;
};

export type PartItem = {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    price: string;
    image: string;
    inStock: boolean;
    colors?: string[];
};

// Структура для повного екземпляра мотоцикла
export type MotorcycleProduct = {
    id: string;
    name: string;
    basePrice: number;
    stats: StatItem[];
    images: Slide[]; // Ті самі фото одного мотоцикла з різних ракурсів
    configOptions: {
        frame: ConfigOption[];
        plastic: ConfigOption[];
        tires: ConfigOption[];
    };
};