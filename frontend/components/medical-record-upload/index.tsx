"use client";

import { useState } from 'react';
import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck, FaSpinner } from "react-icons/fa";

const SPINNER_TIMEOUT = 3000;

export default function MedicalRecordUpload() {
    const [ showSpinner, setShowSpinner ] = useState(false);
    const { medicalRecord, setMedicalRecord } = useDashboard();

    const handleClick = () => {
        setShowSpinner(true);
        setMedicalRecord({ url: "/assets/medical-record.pdf" });
        setTimeout(() => {
            setShowSpinner(false);
        }, SPINNER_TIMEOUT);
    }

    return(
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            {showSpinner ? <FaSpinner className="animate-spin text-gray-400" />: 
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    medicalRecord === null ? "bg-blue-500 border-blue-500" : "border-transparent text-green-600" 
                )}
                onClick={handleClick}
            >
                {medicalRecord === null && (<span>Simulate Medical Record Upload</span>)}
                {medicalRecord !== null && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Medical Record Uploaded</span>
                    </span>
                )}
            </button>}
        </div>
    )
}