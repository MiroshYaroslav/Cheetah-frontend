import type { FAQItem, NavLink, PartItem, StatItem, Testimonial } from "./types";

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
        title: "Battery",
        subtitle: "MAXION Li-ion 1kWh / 48V",
        price: "6 000€",
        image: "/images/parts/battery.png",
        badge: "Home & Hardware",
    },
    {
        title: "Plastic",
        subtitle: "Car plastic set",
        price: "5 000€",
        image: "/images/parts/plastic.png",
    },
    {
        title: "Charger",
        subtitle: "Fast charger",
        price: "5 000€",
        image: "/images/parts/charger.png",
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