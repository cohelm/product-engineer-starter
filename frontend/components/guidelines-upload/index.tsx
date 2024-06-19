"use client";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function GuidelinesUpload() {
    const { isLoading, simulateUpload, guidelinesFile } = useGuidelinesUpload();

    const buttonClass = classNames({
        "bg-green-500": guidelinesFile,
        "hover:bg-green-600": guidelinesFile
    });

    const uploadButtonText = isLoading ? (
        <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            <span>Uploading...</span>
        </>
    ) : guidelinesFile ? (
        <span className="flex flex-row gap-1 items-center">
            <FaCheck />
            <span>Guidelines File Uploaded</span>
        </span>
    ) : (
        <span>Simulate Guidelines File Upload</span>
    );

    return (
        <div className="w-1/2 h-64  border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <Button disabled={isLoading} className={buttonClass} onClick={simulateUpload}>
                {uploadButtonText}
            </Button>
        </div>
    );
}

// hook to simulate guideline record upload
function useGuidelinesUpload() {
    const { toast } = useToast();
    const { guidelinesFile, setGuidelinesFile, medicalRecord } = useDashboard();
    const [isLoading, setIsLoading] = useState(false);

    const simulateUpload = async () => {
        // if medical record is not uploaded, show toast and return
        if (!medicalRecord) {
            toast({
                title: "Failed to upload guidelines file",
                description: "Please upload a medical record first"
            });
            return;
        }

        // if guidelines file record is already uploaded,
        // reset guidelines file so a user cannot continue until the guidelines file is uploaded
        if (guidelinesFile) {
            setGuidelinesFile(null);
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setGuidelinesFile({ url: "/assets/guidelines.pdf" });
    };

    /*
        Since setState is async, we need to wait for the state to update before we can set isLoading to false
        Normally we would use a lib like react-query for real data fetching that has built-in loading states, caching, etc.
    */
    useEffect(() => {
        if (guidelinesFile) {
            setIsLoading(false);
        }
    }, [guidelinesFile]);

    return { isLoading, simulateUpload, guidelinesFile };
}
