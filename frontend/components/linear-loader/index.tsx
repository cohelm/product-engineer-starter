/**
 * Basic spinner. Uses a css module for adding keyframes
 * you may specify the color and size of the spinner
 */
"use client";
import styles from "./styles.module.css";

interface ILoaderProps {
    classes?: string;
    colorChannel?: string;
    colorFiller?: string;
}

export default function LinearLoader(props: ILoaderProps) {
    const { colorChannel, colorFiller, classes = "" } = props;
    const cssChannel = { backgroundColor: colorChannel };
    const cssFiller = { backgroundColor: colorFiller };

    return (
        <div className={`${classes} ${styles.loader}`} style={cssChannel}>
            <div className={`${styles.loaderfill}`} style={cssFiller} />
        </div>
    );
}
