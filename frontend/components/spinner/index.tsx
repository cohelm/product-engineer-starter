/**
 * Basic spinner. Uses a css module for adding keyframes
 * you may specify the color and size of the spinner
 */
"use client";
import styles from "./styles.module.css";

interface ISpinnerProps {
    classes?: string;
    colorHex?: string;
    sizePx?: number;
}

export default function Spinner(props: ISpinnerProps) {
    const { colorHex, sizePx, classes = "" } = props;
    const cssOverrides = {
        borderColor: colorHex,
        height: sizePx,
        width: sizePx,
        borderBottomColor: "transparent"
    };

    return <div className={`${classes} ${styles.spinner}`} style={cssOverrides}></div>;
}
