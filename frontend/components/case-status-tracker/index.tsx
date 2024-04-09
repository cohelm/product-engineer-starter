"use client";

import { FaCheck, FaMinus } from "react-icons/fa";
import Spinner from "../spinner";
import { copytext } from "@/app/copytext";

interface ICaseStatusProps {
    status: "submitted" | "processing" | "complete";
}

interface IStatusPegProps {
    label: "submitted" | "processing" | "complete";
    icon: "check" | "prog" | "none";
    disabled?: boolean;
}

const content = copytext.en.caseInfo.trackerLabels;

function StatusPeg({ label, icon, disabled = false }: IStatusPegProps) {
    let inner = <FaMinus fill="gray" />;
    if (icon === "check") inner = <FaCheck fill="white" size={12} />;
    if (icon === "prog") inner = <Spinner sizePx={15} />;
    const textStyle = disabled ? "text-slate-300" : "";
    const circleStyle =
        icon === "check" ? "bg-green-600 border-green-700" : "bg-gray-200 border-gray-300";
    return (
        <div className="cmp-status-peg flex flex-row items-center">
            <div
                className={`circle w-8 h-8  rounded-3xl border border-2 flex justify-center items-center ${circleStyle}`}>
                {inner}
            </div>
            <p className={`ml-2 capitalize ${textStyle}`}>{content[label]}</p>
        </div>
    );
}

export default function CaseStatusTracker({ status }: ICaseStatusProps) {
    let inner = <></>;
    const line = <div className="h-10 border-gray-300 border-dashed border-l-2 ml-[15px]" />;
    const lineGreen = <div className="h-10 border-green-700  border-l-2 ml-[15px]" />;
    if (status === "submitted")
        inner = (
            <>
                <StatusPeg label="submitted" icon="check" />
                {line}
                <StatusPeg label="processing" icon="none" disabled />
                {line}
                <StatusPeg label="complete" icon="none" disabled />
            </>
        );
    else if (status === "processing")
        inner = (
            <>
                <StatusPeg label="submitted" icon="check" />
                {lineGreen}
                <StatusPeg label="processing" icon="prog" />
                {line}
                <StatusPeg label="complete" icon="none" disabled />
            </>
        );
    else if (status === "complete")
        inner = (
            <>
                <StatusPeg label="submitted" icon="check" />
                {lineGreen}
                <StatusPeg label="processing" icon="check" />
                {lineGreen}
                <StatusPeg label="complete" icon="check" />
            </>
        );

    return <div className="cmp-case-status-tracker">{inner}</div>;
}
