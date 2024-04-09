"use client";
import { extractCaseIdFromUrl } from "@/utils";
import { usePathname } from "next/navigation";
import CaseInfo from "./case-section";

export default async function Home() {
    const pathname = usePathname();
    const caseId = extractCaseIdFromUrl(pathname);
    return (
        <div className="page-case bg-gray-100 h-full w-full p-10">
            <CaseInfo caseId={caseId} />
        </div>
    );
}
