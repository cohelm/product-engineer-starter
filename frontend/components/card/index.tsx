"use client";

interface ICardProps {
    children: React.ReactNode;
    classes?: string;
}

export default function Card({ children, classes = "" }: ICardProps) {
    const base =
        "cmp-card relativ p-10 w-full min-h-24 bg-white border border-gray-300 mt-10 rounded-lg";
    return <div className={`${base} ${classes}`}>{children}</div>;
}
