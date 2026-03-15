import type { FAQItem, NavLink, PartItem, StatItem, Testimonial, Slide } from "./types";

export const images: Slide[] = [
    { src: "/enduro-1.png", alt: "Enduro view 1" },
    { src: "/enduro-1.png", alt: "Enduro view 2" },
    { src: "/enduro-1.png", alt: "Enduro view 3" },
];

export const navLinks: NavLink[] = [
    { label: "Model", href: "#model" },
    { label: "Parts", href: "#parts" },
    { label: "Uniqueness", href: "#uniqueness" },
    { label: "About", href: "#about" },
    { label: "Q&A", href: "#qa" },
    { label: "Get in touch", href: "#contact" },
];

export const enduroStats: StatItem[] = [
    { label: "Weight", value: "114 kg" },
    { label: "Maximum speed", value: "40 km/h" },
    { label: "Cooling", value: "Liquid" },
];

export const parts: PartItem[] = [
    {
        id: "battery",
        slug: "battery",
        title: "BATTERY",
        subtitle: "MAXION MXBM-YTX14-BS GET",
        price: "800€",
        image: "/Battery.png",
        inStock: false,
    },
    {
        id: "plastic",
        slug: "plastic",
        title: "PLASTIC",
        subtitle: "Complete set",
        price: "5 000€",
        image: "/Plastic.png",
        inStock: true,
        colors: ["#121212", "#8A8A8A", "#F6F6F6"],
    },
    {
        id: "charger",
        slug: "charger",
        title: "CHARGER",
        subtitle: "Fast charger",
        price: "5 000€",
        image: "/Charger.png",
        inStock: true,
    },
    {
        id: "tires",
        slug: "tires",
        title: "Tires",
        subtitle: "Summer",
        price: "2 000€",
        image: "/Tires.png",
        inStock: true,
    },
    {
        id: "tires2",
        slug: "tires2",
        title: "Tires",
        subtitle: "Off-road",
        price: "2 500€",
        image: "/Tires2.png",
        inStock: true,
    },
];

export const faqs: FAQItem[] = [
    {
        q: "Скільки часу чекати на відправлення?",
        a: "Залежить від комплектації та завантаження виробництва. Пізніше підставиш реальні терміни.",
    },
    {
        q: "Чи можна зробити унікальну збірку?",
        a: "Так — можна змінювати комплектацію, пластик, батарею, підвіску та інші вузли.",
    },
    {
        q: "Чи є контролер?",
        a: "Так, контролер підбирається під мотор і батарею. Пізніше додаси конкретику.",
    },
];

export const testimonials: Testimonial[] = [
    {
        name: "Jeremy",
        role: "Developer",
        text: "Після внесення передоплати ми зв’язуємось для уточнення деталей і починаємо збірку під ваші побажання.",
    },
    {
        name: "Jeremy",
        role: "Developer",
        text: "Узгоджуємо дрібні зміни, кольори, компоненти та контролюємо якість на кожному етапі.",
    },
];

