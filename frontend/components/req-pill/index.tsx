"use client";

interface ICaseReqPillProps {
    isReqMet: boolean;
    labels?: { met: string; unmet: string };
    classes?: string;
}

export default function CaseReqStatusPill({
    isReqMet = false,
    labels = { met: "Requirement Met", unmet: "Requirement Unmet" },
    classes = ""
}: ICaseReqPillProps) {
    const bgColor = isReqMet ? "bg-green-600" : "bg-red-600";
    const label = isReqMet ? labels.met : labels.unmet;
    const styles = "cmp-req-pill text-white py-1 px-3 w-auto rounded-2xl text-sm uppercase";
    return (
        <button disabled className={`${styles} ${bgColor}`}>
            {label}
        </button>
    );
}
