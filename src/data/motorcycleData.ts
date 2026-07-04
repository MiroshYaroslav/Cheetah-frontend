import type { MotorcycleProduct } from "./types";

export const enduroBike: MotorcycleProduct = {
    id: "enduro-motorcycle",
    name: "ENDURO",
    basePrice: 150000,
    stats: [
        { label: "Weight", value: "114 kg" },
        { label: "Maximum speed", value: "40 km/h" },
        { label: "Cooling", value: "Liquid" },
    ],
    images: [
        { src: "/enduro-1.png", alt: "Enduro збоку" },
        { src: "/enduro-1.png", alt: "Enduro тричверті" },
        { src: "/enduro-1.png", alt: "Enduro з іншого боку" },
    ],
    configOptions: {
        frame: [
            { id: "frame-black", label: "Чорний", color: "#7B7B7B" },
            { id: "frame-purple", label: "Фіолетовий", color: "#8B5CF6" },
            { id: "frame-white", label: "Білий", color: "#FFFFFF" },
        ],
        plastic: [
            { id: "plastic-black", label: "Чорний", color: "#7B7B7B" },
            { id: "plastic-graphite", label: "Графітовий", color: "#4B4B4B" },
            { id: "plastic-white", label: "Білий", color: "#FFFFFF" },
        ],
        tires: [
            { id: "tire-black", label: "Чорний", color: "#000000" },
            { id: "tire-white", label: "Білий", color: "#000000" },
            { id: "tire-graphite", label: "Графітовий", color: "#000000" },
        ]
    }
};