"use client";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";

interface IRootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout(props: IRootLayoutProps) {
    const { children } = props;
    const pathname = usePathname();
    const gray = pathname.includes("/case") ? "bg-gray-100" : "";

    return (
        <html lang="en">
            <head></head>
            <body className={gray}>
                {children}
                <div id="modal" />
            </body>
        </html>
    );
}
