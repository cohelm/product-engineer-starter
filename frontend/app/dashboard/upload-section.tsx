/**
 * The main UI for the dashboard contains:
 * - one uploader section for Medical Record
 * - another uploader section for Guidelines
 * - continue button
 * - logic to manage state/visibility etc.
 */

"use client";

import SectionUploader from "@/components/section-uploader";
import { useDashboard } from "@/context/dashboard-context";
import { simulateDelay } from "@/utils";
import { xhrSubmitDashboard } from "../requests";
import { copytext } from "../copytext";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SIM_DELAY_MILLIS = 3000;

enum DocTypes {
    medrec,
    guidelines
}

interface IUploadProps {
    onSubmitted: Function;
}

export default function UploadSection({ onSubmitted }: IUploadProps) {
    const [medResource, setMed] = useState("");
    const [guideResource, setGuide] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const { setGuidelinesFile, setMedicalRecord } = useDashboard();
    const toastId = useRef<any>();
    const content = copytext.en.dashboard;

    // check if guide section should remain disabled?
    const disableGuideSection = medResource && medResource.trim().length > 0 ? false : true;

    // check if continue button should be shown
    const showContinueButton =
        medResource &&
        medResource.trim().length > 0 &&
        guideResource &&
        guideResource.trim().length > 0;

    // mock: simulate upload using 3s delay
    const simulateUpload = async () => {
        await simulateDelay(SIM_DELAY_MILLIS);
    };

    // update the mock upload status in the state
    const updateStatus = async (type: DocTypes, result: any) => {
        const { error } = result;
        if (error) return;

        switch (type) {
            case DocTypes.medrec:
                const urlMed = content.medrec.file;
                setMed(urlMed);
                setMedicalRecord({ url: urlMed });
                break;
            case DocTypes.guidelines:
                const urlGuide = content.guide.file;
                setGuide(urlGuide);
                setGuidelinesFile({ url: urlGuide });
                break;
        }
    };

    // show a toast
    const showToast = () => {
        toastId.current = toast(content.submitToast.pending, {
            position: "top-right",
            theme: "dark"
        });
    };

    // hide a toast
    const hideToast = () => {
        toast.dismiss(toastId.current);
    };

    // handle 'continue' button submission
    const onSubmit = async () => {
        try {
            showToast();
            setSubmitting(true);
            // won't do this in prod, but doing it here for visual effect
            // so you can actually see the UI
            await simulateDelay(800);
            const caseId = await xhrSubmitDashboard();
            onSubmitted({ data: { caseId }, error: null });
        } catch (error) {
            onSubmitted({ data: null, error });
        } finally {
            setSubmitting(false);
            hideToast();
        }
    };

    return (
        <>
            <div className="upload-section-main w-full flex flex-row gap-2 items-center">
                <SectionUploader
                    task={simulateUpload}
                    onComplete={(r: any, url: string) => updateStatus(DocTypes.medrec, r)}
                    disabled={false}
                    background="#3b83f6"
                    title={content.medrec.title}
                    labels={content.medrec.labels}
                />
                <SectionUploader
                    task={simulateUpload}
                    onComplete={(r: any, url: string) => updateStatus(DocTypes.guidelines, r)}
                    disabled={disableGuideSection}
                    background="#f97516"
                    title={content.guide.title}
                    labels={content.guide.labels}
                />
            </div>
            <ToastContainer />
            <div className="w-full py-4 flex flex-row justify-center">
                {showContinueButton && (
                    <button
                        className="bg-green-600 font-medium text-white py-2 px-4 rounded"
                        disabled={isSubmitting}
                        onClick={async () => await onSubmit()}>
                        {content.button.label}
                    </button>
                )}
            </div>
        </>
    );
}
