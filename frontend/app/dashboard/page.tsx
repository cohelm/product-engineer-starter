"use client";
import { useRouter } from "next/navigation";
import UploadSection from "./upload-section";

export const revalidate = 0;

export default async function DashboardRoot() {
    const router = useRouter();

    const handleSubmission = ({ data, error }: any) => {
        if (!error) router.push(`/dashboard/case/${data?.caseId}`);
    };

    return (
        <div className="page-dash w-full flex flex-col justify-center items-center h-screen">
            <UploadSection onSubmitted={handleSubmission} />
        </div>
    );
}
