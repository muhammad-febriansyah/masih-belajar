"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pulseColor?: string;
    duration?: string;
}

export default function PulsatingButton({
    className,
    children,
    pulseColor = "#207A36",
    duration = "1.5s",
    ...props
}: PulsatingButtonProps) {
    return (
        <button
            className={cn(
                "relative flex cursor-pointer items-center justify-center rounded-lg bg-maroon px-8 py-2 text-center text-white dark:bg-maroon dark:text-black",
                className
            )}
            style={
                {
                    "--pulse-color": pulseColor,
                    "--duration": duration,
                } as React.CSSProperties
            }
            {...props}
        >
            <div className="relative z-10">{children}</div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg left-1/2 top-1/2 size-full animate-pulse bg-inherit" />
        </button>
    );
}
