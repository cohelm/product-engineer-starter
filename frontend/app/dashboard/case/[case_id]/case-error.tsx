"use client";
import { xhrReadCaseById } from "@/app/requests";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface IErrorProps {
    errMsg?: string;
    label?: string;
}

export default function CaseError({
    errMsg = "Oops! Something went wrong",
    label = "Go Home"
}: IErrorProps) {
    return (
        <div className="case-error flex justify-center flex-col items-center">
            <FaExclamationCircle className="w-[50px] h-[50px] my-5" />
            <h1 className="text-lg">
                <strong>{errMsg}</strong>
            </h1>
            <a href="/" className="my-5 py-2 px-5 bg-blue-500 text-white rounded-md">
                {label}
            </a>
        </div>
    );
}
