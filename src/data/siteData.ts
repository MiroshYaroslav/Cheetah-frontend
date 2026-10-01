import type { FAQItem, NavLink } from "./types";

export const SHOP_SETTINGS = {
    deliveryPrice: 150,
};

export const navLinks: NavLink[] = [
    { label: "Model", href: "#model", labelKey: "nav.model" },
    { label: "Parts", href: "#parts", labelKey: "nav.parts" },
    { label: "About us", href: "#about", labelKey: "nav.about" },
    { label: "Faq", href: "#support", labelKey: "nav.faq" },
];

export const faqs: FAQItem[] = [
    {
        qKey: "faqData.q1",
        aKey: "faqData.a1",
        q: "Скільки часу чекать на відправлення?",
        a: "Залежить від комплектації та завантаження виробництва. Пізніше підставиш реальні терміни.",
    },
    {
        qKey: "faqData.q2",
        aKey: "faqData.a2",
        q: "Чи можна зробити унікальну збірку?",
        a: "Так — можна змінювати комплектацію, plastic, батарею, підвіску та інші вузли.",
    },
    {
        qKey: "faqData.q3",
        aKey: "faqData.a3",
        q: "Чи є контролер?",
        a: "Так, контролер підбирається під мотор і батарею. Пізніше додаси конкретику.",
    },
];