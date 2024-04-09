"use client";

import CaseReqStatusPill from "../req-pill";
import { v4 as uuid } from "uuid";
import {
    Accordion,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    FormGroup,
    AccordionSummary,
    Typography
} from "@mui/material";

import { FaCaretDown } from "react-icons/fa";
import { copytext } from "@/app/copytext";

interface ICaseStepProps {
    step: {
        question: string;
        options: Array<{ key: string; text: string; selected: boolean }>;
        is_met: boolean;
        reasoning?: string;
    };
    label?: string;
}

export default function CaseStepExpander({ step, label = "Rationale" }: ICaseStepProps) {
    const { question, options, is_met, reasoning } = step;
    const panelId = uuid();

    return (
        <div className="cmp-case-step-expander">
            <div className="flex flex-row justify-between mb-4">
                <h4 className="text-lg font-bold">Q) {question}</h4>
                <CaseReqStatusPill isReqMet={is_met} />
            </div>
            <FormGroup>
                {options.map((opt) => {
                    const { key, text, selected } = opt;
                    return (
                        <FormControlLabel
                            label={`${text} - [${key}]`}
                            className="!font-sans"
                            control={<Checkbox defaultChecked={selected} />}
                            key={uuid()}
                        />
                    );
                })}
            </FormGroup>
            <br />
            <div className="accordion-info">
                <Accordion>
                    <AccordionSummary expandIcon={<FaCaretDown />} id={panelId}>
                        <Typography>
                            <span className="font-bold">{label}</span>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{reasoning}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
