import * as React from "react";
import { cn } from "./utils";

function Module({
    className,
    children,
    ...props
}: React.ComponentProps<"a">) {
    return (
        <a
            className={cn(
                "px-3 py-1 hover:bg-zinc-100 rounded-full hover:text-zinc-800 text-zinc-600 font-inter duration-300 inline-block",
                className
            )}
            {...props}
        >
            {children}
        </a>
    );
}

export { Module };