export interface BreadcrumbItem {
    label: string;
    path?: string; // Якщо шляху немає - це поточна сторінка
}

// Це "мозок" нашої навігації. Тут ми прописуємо структуру для кожного URL.
export const breadcrumbsMap: Record<string, BreadcrumbItem[]> = {
    "/cart": [
        { label: "BAG" }
    ],
    "/checkout": [
        { label: "BAG", path: "/cart" }, // Проміжний клікабельний крок
        { label: "PLACING AN ORDER" }    // Поточна сторінка
    ],
    "/privacy-policy": [
        { label: "PRIVACY POLICY" }
    ]
};