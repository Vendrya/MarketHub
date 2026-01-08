import * as React from "react";
import { cn } from "./utils";

function Card({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "p-6 bg-inherit rounded-lg border border-gray-300 sm:h-72 sm:w-60 flex flex-col ",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export { Card };