import type { FAQItem, NavLink } from "./types";

export const SHOP_SETTINGS = {
    deliveryPrice: 150,
};

export const navLinks: NavLink[] = [
    { label: "Model", href: "#model" },
    { label: "Parts", href: "#parts" },
    { label: "About us", href: "#about" },
    { label: "Faq", href: "#support" },
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
