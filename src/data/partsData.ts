import type { PartItem } from "./types";

export const parts: PartItem[] = [
    {
        id: "battery",
        slug: "battery",
        title: "BATTERY", titleKey: "parts.battery",
        subtitle: "MAXION MXBM-YTX14-BS GET", // Назву бренду не перекладаємо
        price: "800₴",
        image: "/Battery.png",
        inStock: false,
    },
    {
        id: "plastic",
        slug: "plastic",
        title: "PLASTIC", titleKey: "parts.plastic",
        subtitle: "Complete set", subtitleKey: "parts.completeSet",
        price: "5 000₴",
        image: "/Plastic.png",
        inStock: true,
        colors: ["#121212", "#8A8A8A", "#F6F6F6"],
    },
    {
        id: "charger",
        slug: "charger",
        title: "CHARGER", titleKey: "parts.charger",
        subtitle: "Fast charger", subtitleKey: "parts.fastCharger",
        price: "5 000₴",
        image: "/Charger.png",
        inStock: true,
    },
    {
        id: "tires",
        slug: "tires",
        title: "Tires", titleKey: "parts.tires",
        subtitle: "Summer", subtitleKey: "parts.summer",
        price: "2 000₴",
        image: "/Tires.png",
        inStock: true,
    },
    {
        id: "tires2",
        slug: "tires2",
        title: "Tires", titleKey: "parts.tires",
        subtitle: "Off-road", subtitleKey: "parts.offRoad",
        price: "2 500₴",
        image: "/Tires2.png",
        inStock: true,
    },
];