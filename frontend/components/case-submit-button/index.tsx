"use client";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";

export default function CaseSubmitButton({handleContinue}: {handleContinue: () => void}) {
    const { medicalRecord, guidelinesFile } = useDashboard();

    const disabled = medicalRecord === null || guidelinesFile === null;

    return <button
            className={classNames("font-medium text-white py-2 px-4 rounded",
                disabled ? "bg-gray-300" : "bg-green-600"
            )}
            onClick={handleContinue}
            disabled={disabled}
        >
        Continue
    </button>
}