/**
 * a simple overlay / veneer
 * when the "disabled" prop is set, it will add an overlay (opacity mask)
 * on top of its children components. It will also block "pointer events" there by
 * disabling all mouse events on the underlying children components
 */
"use client";

interface IVeneerProps {
    disabled: boolean;
    children: React.ReactNode;
    classes?: string;
}

export default function Veneer({ disabled = false, children, classes = "" }: IVeneerProps) {
    return (
        <div className={`cmp-veneer relative ${classes}`}>
            {children}
            {disabled === true && (
                <div className="overlay absolute inset-x-0 inset-y-0 pointer-events-none bg-white opacity-75" />
            )}
        </div>
    );
}
