"use client";
import { xhrReadCaseById } from "@/app/requests";
import { useEffect, useState } from "react";
import CaseError from "./case-error";
import { copytext } from "@/app/copytext";
import { parseCaseInfo, simulateDelay } from "@/utils";
import CaseReqStatusPill from "@/components/req-pill";
import Card from "@/components/card";
import LinearLoader from "@/components/linear-loader";
import CaseStatusTracker from "@/components/case-status-tracker";
import TimeAgo from "react-timeago";
import CaseStepExpander from "@/components/case-step-expander";
import { v4 as uuid } from "uuid";

enum CaseErrorTypes {
    unknown,
    not_found,
    none
}

interface ICaseInfoProps {
    caseId?: string;
}

const autoRefreshInSec = 5;

export default function CaseInfo({ caseId = "" }: ICaseInfoProps) {
    const [inProgress, setInProgress] = useState(false);
    const [shouldTick, setTicker] = useState(false);
    const [caseData, setCase] = useState<{ error: CaseErrorTypes; case: any } | undefined>();
    const content = copytext.en.caseInfo;

    // fetch the case for this caseId prop, set that in the state
    const fetchCase = async (force: boolean = false) => {
        // exit if we have case data already and we're not forcing
        // or if there's already a fetch in progress
        if ((caseData && force === false) || inProgress) return;

        // exit if the record status is complete. No more changes
        // to fetch for this case id
        if (caseData?.case.status === "complete") {
            console.log("🏁 record completed");
            return;
        }

        try {
            setInProgress(true);
            await simulateDelay(2000);
            const caseInfo = await xhrReadCaseById(caseId);
            setCase({ error: CaseErrorTypes.none, case: parseCaseInfo(caseInfo) });

            // trigger a timer
        } catch (err: any) {
            const { status } = err;
            if (status === 404) {
                setCase({ error: CaseErrorTypes.not_found, case: null });
            } else setCase({ error: CaseErrorTypes.unknown, case: null });
        } finally {
            setInProgress(false);
            setTicker(true);
            console.log("fetch complete");
        }
    };

    // triggers the first fetch
    useEffect(() => {
        fetchCase();
    }, [caseData]);

    const initTicker = () => {
        console.log("creating ticker");
        setTimeout(() => {
            console.log("⏰ tick");
            setTicker(false);
            fetchCase(true);
        }, autoRefreshInSec * 1000);
    };

    // when the 'shouldTick' state var is toggled or turned on in the finally clause in fetch
    // this timer will be used to implement auto refresh
    useEffect(() => {
        if (shouldTick === false) return;
        initTicker();
    }, [shouldTick]);

    const hasError = caseData && caseData.error !== CaseErrorTypes.none;
    const errorMessage =
        hasError && caseData.error === CaseErrorTypes.not_found
            ? content.notFound.errNotFound
            : content.notFound.errGeneral;

    return (
        <>
            {inProgress && <LinearLoader classes="fixed top-0 left-0 right-0" />}
            {caseData && (
                <div className="case-section">
                    {hasError && (
                        <CaseError errMsg={errorMessage} label={content.notFound.redirect} />
                    )}
                    {!hasError && (
                        <div className="case-info-container">
                            {/* back button */}
                            <div className="mb-4 flex flex-row justify-between items-center">
                                <a href="/">
                                    <span>←</span> {content.linkBack}
                                </a>
                                <p className="text-gray-600 text-xs">{`${content.autoReloadLabel}: ${autoRefreshInSec}s`}</p>
                            </div>
                            <hr />

                            {/* case title and overall req status container */}
                            <div className="mt-10 case-title-container flex flex-row items-center justify-between">
                                <div className="flex flex-row">
                                    <h2 className="text-2xl font-bold">
                                        {caseData?.case.procedure}
                                    </h2>
                                </div>
                                <CaseReqStatusPill isReqMet={caseData?.case.reqOverall} />
                            </div>

                            {/* 3 column case summary container starts here */}
                            <div className="case-summary-container">
                                <Card classes="flex flex-wrap items-top justify-between">
                                    {/* first column - status tracker */}
                                    <div className="case-status h-full w-1/6 min-h-[20px] border-r border-gray-200">
                                        <CaseStatusTracker status={caseData?.case.status} />
                                    </div>

                                    {/* second column - case details */}
                                    <div className="case-info px-5 pt-1 h-full grow w-[40px] min-h-[20px]">
                                        <div>
                                            <p className="text-xs font-bold">
                                                {content.createdLabel}
                                            </p>
                                            <TimeAgo date={caseData?.case.created} live={false} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold mt-5">
                                                {content.cptLabel}
                                            </p>
                                            <ul className="flex flex-wrap">
                                                {caseData.case.cptCodes.map(
                                                    (value: any, i: any) => (
                                                        <li key={uuid()}>
                                                            <button
                                                                disabled
                                                                className="m-1 text-xs bg-gray-200 py-1 px-1 border border-gray-300 rounded-2xl">
                                                                {value}
                                                            </button>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* third column - summary */}
                                    <div className="case-summary w-3/5">
                                        <h5 className="font-bold text-md">
                                            {content.summaryLabel}
                                        </h5>
                                        <p className="text-sm">{caseData?.case.summary || "--"}</p>
                                    </div>
                                </Card>
                            </div>

                            {/* generate a collapsible card for every step */}
                            <div className="steps-container">
                                {caseData?.case.steps.map((step: any, i: number) => {
                                    return (
                                        <Card key={`step-${uuid()}`}>
                                            <CaseStepExpander
                                                step={step}
                                                label={content.reasonLabel}
                                            />
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
