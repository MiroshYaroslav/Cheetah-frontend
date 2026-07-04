import type { FAQItem, NavLink, Testimonial } from "./types";

export const SHOP_SETTINGS = {
    deliveryPrice: 150,
};

export const navLinks: NavLink[] = [
    { label: "Model", href: "#model" },
    { label: "Parts", href: "#parts" },
    { label: "Uniqueness", href: "#uniqueness" },
    { label: "About", href: "#about" },
    { label: "Q&A", href: "#qa" },
    { label: "Get in touch", href: "#contact" },
];

export const faqs: FAQItem[] = [
    {
        q: "Скільки часу чекать на відправлення?",
        a: "Залежить від комплектації та завантаження виробництва. Пізніше підставиш реальні терміни.",
    },
    {
        q: "Чи можна зробити унікальну збірку?",
        a: "Так — можна змінювати комплектацію, plastic, батарею, підвіску та інші вузли.",
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
        text: "Після внесення предоплати вами ми дзвонемо для уточнення ваших побажань та поченаємо збирати мотоцикл під ваші побажання",
    },
    {
        name: "Jeremy",
        role: "Developer",
        text: "Наша команда враховує побажання наших клієнтів та зростаємо кожен день унікальну збірку можна зробити через наш конфігуратор або ж зателефонувати нам для обговорення деталей",
    },
    {
        name: "Jeremy",
        role: "Developer",
        text: "Наша команда враховує побажання наших клієнтів та зростаємо кожен день унікальну збірку можна зробити через наш конфігуратор або ж зателефонувати нам для обговорення деталей",
    }
];