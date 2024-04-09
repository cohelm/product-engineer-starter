/**
 * a generic component to construct an "uploader section"
 * contains a submit button along with other properties that performs
 * an async action and manages state accordingly
 */

"use client";
import { simulateDelay } from "@/utils";
import SubmitButton from "@/components/submit-button";
import Veneer from "@/components/veneer";

interface IGuidelineProps {
    task: Function;
    onComplete: Function;
    disabled: boolean;
    background?: string;
    labels: { init: string; success: string; error: string };
    title?: string;
}

export default function SectionUploader({
    task,
    onComplete,
    disabled,
    labels,
    title,
    background = "#f97516"
}: IGuidelineProps) {
    return (
        <Veneer
            classes="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-col items-center justify-center"
            disabled={disabled}>
            <h3 className="py-3">{title}</h3>
            <SubmitButton
                name="upload-guide"
                disabled={disabled}
                background={background}
                lblInit={labels.init}
                lblSuccess={labels.success}
                lblError={labels.error}
                onComplete={(result: any) => onComplete(result)}
                task={task}
            />
        </Veneer>
    );
}
