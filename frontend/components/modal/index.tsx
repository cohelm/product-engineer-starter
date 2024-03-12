import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

interface IModalProps {
    children: any;
    selector?: string;
    onClose: () => void;
    show: boolean;
    size?: string;
    show_close_button?: boolean
}

export default function Modal(props: IModalProps) {
    const {
        children,
        selector = "#modal",
        onClose = () => {},
        show = false,
        size = "default",
        show_close_button = false
    } = props;

    useEffect(() => {
        if (show === false) return;
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <Portal selector={selector}>
                    <div className="w-screen h-full max-h-screen bg-black/70 backdrop-blur fixed top-0 left-0 overflow-hidden z-40">
                        <div className="w-full h-full relative flex justify-center items-center p-2">
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                className={classNames(
                                    "relative shadow-lg overflow-hidden flex flex-col relative rounded-xl",
                                    size === "default" ? "w-[98dvw] sm:w-[620px] h-[95dvh]" : null
                                )}
                            >
                                {show_close_button && (
                                    <button
                                        className={`
                                            absolute top-3 right-3 focus:outline-none appearance-none
                                            text-red-500 rounded-full p-px hover:scale-105 duration-200
                                            cursor-pointer
                                        `}
                                        style={{ zIndex: 999 }}
                                        type="button"
                                        onClick={onClose}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                        </svg>
                                    </button>
                                )}
                                {children}
                            </motion.div>
                        </div>
                    </div>
                </Portal>
            )}
        </AnimatePresence>
    );
}

interface IPortalProps {
    children: any;
    selector: string;
}

function Portal(props: IPortalProps) {
    const { children, selector } = props;
    const ref = useRef<Element>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const element = document.querySelector(selector);

        if (!element) return;

        ref.current = element;
        
        setMounted(true);
    }, [selector]);

    if (!mounted) return null;

    if (!ref.current) return null;

    return createPortal(children, ref.current);
}
