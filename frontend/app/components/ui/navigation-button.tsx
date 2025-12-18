import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

function Module({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean;
}) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn({ className }, "text-sm hover:text-gray-600 transition-colors px-2 bg-red-600")}
            {...props}
        />
    );
}

export { Module };
