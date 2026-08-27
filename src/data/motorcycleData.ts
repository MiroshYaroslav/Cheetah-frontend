import type { MotorcycleProduct } from "./types";

export const enduroBike: MotorcycleProduct = {
    id: "cheetah-motorcycle",
    basePrice: 150000,
    stats: [
        { label: "Weight", value: "114 kg" },
        { label: "Maximum speed", value: "40 km/h" },
        { label: "Cooling", value: "Liquid" },
    ],
    variants: [
        {
            id: "variant-enduro",
            name: "ENDURO",
            image: { src: "/enduro-1.png", alt: "Enduro" },
            specs: [
                {
                    id: "spec-headlights",
                    title: "With headlights?",
                    options: [
                        { id: "hl-yes", label: "YES" },
                        { id: "hl-no", label: "NO" }
                    ]
                },
                {
                    id: "spec-wheels",
                    title: "Wheel diameter (front, back)",
                    options: [
                        { id: "wh-19-16", label: "Ø19, Ø16" }
                    ]
                }
            ]
        },
        {
            id: "variant-cross",
            name: "CROSS",
            image: { src: "/enduro-1.png", alt: "Cross" }, // Зміни на правильний файл, коли будеш мати
            specs: [
                {
                    id: "spec-wheels",
                    title: "Wheel diameter (front, back)",
                    options: [
                        { id: "wh-19-16", label: "Ø19, Ø16" },
                        { id: "wh-21-17", label: "Ø21, Ø17" }
                    ]
                }
            ]
        },
        {
            id: "variant-street",
            name: "STREET",
            image: { src: "/enduro-1.png", alt: "Street" }, // Зміни на правильний файл
            specs: [
                {
                    id: "spec-wheels",
                    title: "Wheel diameter (front, back)",
                    options: [
                        { id: "wh-16-16", label: "Ø16, Ø16" }
                    ]
                }
            ]
        }
    ],
    configOptions: {
        frame: [
            { id: "frame-black", label: "BLACK", color: "#000000" },
            { id: "frame-purple", label: "PURPLE", color: "#8B5CF6" },
            { id: "frame-white", label: "WHITE", color: "#FFFFFF" },
        ],
        plastic: [
            { id: "plastic-black", label: "BLACK", color: "#000000" },
            { id: "plastic-white", label: "WHITE", color: "#FFFFFF" },
            { id: "plastic-graphite", label: "GRAPHITE", color: "#333333" },
        ],
        tires: [
            { id: "tire-type1", label: "TYPE 1", icon: "/type1.svg" },
            { id: "tire-type2", label: "TYPE 2", icon: "/type2.svg" },
            { id: "tire-type3", label: "TYPE 3", icon: "/type3.svg" },
        ]
    }
};