import type { MotorcycleProduct } from "./types";

export const enduroBike: MotorcycleProduct = {
    id: "cheetah-motorcycle",
    basePrice: 150000,
    stats: [
        { label: "Weight", labelKey: "models.weight", value: "114 kg" },
        { label: "Maximum speed", labelKey: "models.maxSpeed", value: "40 km/h" },
        { label: "Cooling", labelKey: "models.cooling", value: "Liquid", valueKey: "models.liquid" },
    ],
    variants: [
        {
            id: "variant-enduro",
            name: "Enduro",
            image: { src: "/enduro-1.png", alt: "Enduro" },
            specs: [
                {
                    id: "spec-headlights",
                    title: "With headlights?",
                    titleKey: "models.withHeadlights",
                    options: [
                        { id: "hl-yes", label: "YES", labelKey: "models.yes" },
                        { id: "hl-no", label: "NO", labelKey: "models.no" }
                    ]
                },
                {
                    id: "spec-wheels",
                    title: "Wheel diameter (front, back)",
                    titleKey: "models.wheelDiameter",
                    options: [
                        { id: "wh-19-16", label: "Ø19, Ø16" } // Розміри не потребують перекладу
                    ]
                }
            ]
        },
        {
            id: "variant-cross",
            name: "Cross",
            image: { src: "/enduro-1.png", alt: "Cross" }, // Зміни на правильний файл, коли будеш мати
            specs: [
                {
                    id: "spec-wheels",
                    title: "Wheel diameter (front, back)",
                    titleKey: "models.wheelDiameter",
                    options: [
                        { id: "wh-19-16", label: "Ø19, Ø16" },
                        { id: "wh-21-17", label: "Ø21, Ø17" }
                    ]
                }
            ]
        },
        {
            id: "variant-street",
            name: "Street",
            image: { src: "/enduro-1.png", alt: "Street" }, // Зміни на правильний файл
            specs: [
                {
                    id: "spec-wheels",
                    title: "Wheel diameter (front, back)",
                    titleKey: "models.wheelDiameter",
                    options: [
                        { id: "wh-16-16", label: "Ø16, Ø16" }
                    ]
                }
            ]
        }
    ],
    configOptions: {
        frame: [
            { id: "frame-black", label: "BLACK", labelKey: "models.black", color: "#000000" },
            { id: "frame-purple", label: "PURPLE", labelKey: "models.purple", color: "#8B5CF6" },
            { id: "frame-white", label: "WHITE", labelKey: "models.white", color: "#FFFFFF" },
        ],
        plastic: [
            { id: "plastic-black", label: "BLACK", labelKey: "models.black", color: "#000000" },
            { id: "plastic-white", label: "WHITE", labelKey: "models.white", color: "#FFFFFF" },
            { id: "plastic-graphite", label: "GRAPHITE", labelKey: "models.graphite", color: "#333333" },
        ],
        tires: [
            { id: "tire-type1", label: "TYPE 1", labelKey: "models.type1", icon: "/type1.svg" },
            { id: "tire-type2", label: "TYPE 2", labelKey: "models.type2", icon: "/type2.svg" },
            { id: "tire-type3", label: "TYPE 3", labelKey: "models.type3", icon: "/type3.svg" },
        ]
    }
};