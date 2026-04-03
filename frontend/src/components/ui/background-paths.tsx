"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, index) => ({
        id: index,
        d: `M-${380 - index * 5 * position} -${189 + index * 6}C-${
            380 - index * 5 * position
        } -${189 + index * 6} -${312 - index * 5 * position} ${216 - index * 6} ${
            152 - index * 5 * position
        } ${343 - index * 6}C${616 - index * 5 * position} ${470 - index * 6} ${
            684 - index * 5 * position
        } ${875 - index * 6} ${684 - index * 5 * position} ${875 - index * 6}`,
        width: 0.5 + index * 0.03,
        duration: 20 + (index % 10),
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="h-full w-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none text-white/12",
                className,
            )}
        >
            <div className="absolute inset-0 opacity-70">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(15,15,15,0.06),rgba(15,15,15,0.38))]" />
        </div>
    );
}
