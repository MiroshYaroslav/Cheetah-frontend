import type { ElementType, ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    as?: ElementType;
};

export default function Container({ children, className = "", as: Tag = "div" }: Props) {
    return <Tag className={`container ${className}`}>{children}</Tag>;
}