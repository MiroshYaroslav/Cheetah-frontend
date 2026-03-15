export type NavLink = { label: string; href: string };

export type StatItem = { label: string; value: string };

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

export type FAQItem = { q: string; a: string };

export type Testimonial = { name: string; role: string; text: string };

export type Slide = { src: string; alt: string };
