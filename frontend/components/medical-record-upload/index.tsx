"use client";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function MedicalRecordUpload() {
    const { isLoading, simulateUpload, medicalRecord } = useMedicalRecordUpload();

    const buttonClass = classNames({
        "bg-green-500": medicalRecord,
        "hover:bg-green-600": medicalRecord
    });

    const uploadButtonText = isLoading ? (
        <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            <span>Uploading...</span>
        </>
    ) : medicalRecord ? (
        <span className="flex flex-row gap-1 items-center">
            <FaCheck />
            <span>Medical Record Uploaded</span>
        </span>
    ) : (
        <span>Simulate Medical Record Upload</span>
    );

    return (
        <div className="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <Button disabled={isLoading} className={buttonClass} onClick={simulateUpload}>
                {uploadButtonText}
            </Button>
        </div>
    );
}

// hook to simulate medical record upload
function useMedicalRecordUpload() {
    const { medicalRecord, setMedicalRecord } = useDashboard();
    const [isLoading, setIsLoading] = useState(false);

    const simulateUpload = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setMedicalRecord({ url: "/assets/medical-record.pdf" });
    };

    /*
        Since setState is async, we need to wait for the state to update before we can set isLoading to false
        Normally we would use a lib like react-query for real data fetching that has built-in loading states, caching, etc.
    */
    useEffect(() => {
        if (medicalRecord) {
            setIsLoading(false);
        }
    }, [medicalRecord]);

    return { isLoading, simulateUpload, medicalRecord };
}
