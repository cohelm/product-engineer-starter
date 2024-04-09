/**
 * Submit button:
 * - click it, to trigger the async task in the background
 * - shows a spinner while the task is in progress
 * - if the task succeeds, shows a success state with green check
 * - if the task fals, shows an error message instead
 * - runs on a finite state machine [idle, in progress, success, error]
 * - reports completion (success / error) back to parent
 * - has a setting ("isOneShot") that can reset the state machine or not, as needed
 */
"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaExclamationCircle } from "react-icons/fa";
import Spinner from "../spinner";

enum OpState {
    idle = 1,
    inprog,
    success,
    error
}

interface ISubmitButtonProps {
    background?: string; // desired background color
    lblInit: string; // the initial label for the button
    lblSuccess?: string; // the label to show when task is successful
    lblError?: string; // the label to show when the task fails
    isOneShot?: boolean; // if true, the button won't be clickable after the first execution
    task: Function; // an async task to execute on click
    onComplete?: Function; // a callback function to post the result of the task
    disabled?: boolean; // is the button disabled
    name?: string; //name gets attached to data-name attribute
}

type TResultType = {
    result: any;
    error: any;
};

const SubmitButton = ({
    background = "orange",
    lblInit,
    lblError,
    lblSuccess,
    task,
    onComplete,
    isOneShot = true,
    disabled = false,
    name = ""
}: ISubmitButtonProps) => {
    const [isDisabled, setDisabled] = useState(disabled);
    const [opState, setOpState] = useState(OpState.idle);
    const [result, setResult] = useState<TResultType>({ result: null, error: null });

    if (!lblInit || lblInit.trim().length === 0) throw new Error("invalid props: lblInit");
    lblError = lblError || lblInit;
    lblSuccess = lblSuccess || lblInit;

    if (!task) throw new Error("invalid task provided");

    useEffect(() => setDisabled(disabled));

    const finalize = (isSuccess = false) => {
        setTimeout(() => {
            if (!isSuccess || !isOneShot) {
                setDisabled(false);
                setOpState(OpState.idle);
            }

            if (onComplete) {
                onComplete(result);
            }
        }, 500);
    };

    const onClickHandler = async (e: any) => {
        try {
            setOpState(OpState.inprog);
            setDisabled(true);
            const result = await task();
            setOpState(OpState.success);
            setResult({ result, error: null });
            finalize(true);
        } catch (error) {
            console.warn("yo yo");
            setOpState(OpState.error);
            setResult({ result: null, error });
            finalize(false);
        }
    };

    let inner = null;
    let style = {
        backgroundColor: background,
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.69 : 1
    };
    switch (opState) {
        case OpState.idle:
            inner = <p>{lblInit}</p>;
            break;
        case OpState.inprog:
            inner = (
                <div className="flex items-center flex-col justify-center">
                    <Spinner sizePx={20} colorHex="#FFF" classes="mr-[5px] absolute" />
                    <span className="invisible">{lblInit}</span>
                </div>
            );
            break;
        case OpState.success:
            inner = (
                <div>
                    <FaCheck className="inline-block mr-[5px] mb-[5px]" />
                    {lblSuccess}
                </div>
            );
            style = { ...style, backgroundColor: "white", color: "green" };
            break;
        case OpState.error:
            inner = (
                <div>
                    <FaExclamationCircle className="inline-block mr-[5px] mb-[5px]" />
                    {lblError}
                </div>
            );
            style = { ...style, backgroundColor: "white", color: "maroon" };
            break;
    }

    return (
        <button
            name={name}
            className="px-5 py-3 rounded"
            style={style}
            disabled={isDisabled}
            onClick={async (e) => {
                await onClickHandler(e);
            }}>
            {inner}
        </button>
    );
};

export default SubmitButton;
