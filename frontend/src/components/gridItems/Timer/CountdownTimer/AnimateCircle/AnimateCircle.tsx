// import type { RefObject } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

// utill
import second_to_timestamp from "./util/second_to_timestamp"

type Props = {
    value: number
    max: number
    timeout : boolean
}

export default function AnimateCircle({ value, max, timeout}: Props) {

    // progress 0–1
    const progress = useMotionValue(0)

    // change progress when value changes
    useEffect(() => {
        const pct = Math.min(value / max, 1)
        progress.set(pct)
    }, [value, max, progress])


    // convert progress → stroke-dashoffset
    const circumference = 2 * Math.PI * 45     // radius 45
    const dashOffset = useTransform(
        progress,
        (p) => circumference * (1 - p)
    )

    // animated number
    const animatedNumber = useMotionValue(value)
    useEffect(() => {
        animatedNumber.set(value)
    }, [value, animatedNumber])

    return (
        <div style={{
            width: 120,
            height: 120,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <svg width="120" height="120">
                {/* background circle */}
                <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#fff"
                    strokeWidth="10"
                    fill="none"
                />

                {/* animated fill circle */}
                <motion.circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="#b0d3fdff"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: dashOffset,
                    }}
                    initial={{ strokeDashoffset: circumference }}
                />
            </svg>

            {/* center number */}
            <motion.div
                className={timeout == true ? 'blinking-text' : ''}
                style={{
                    position: "absolute",
                    fontSize: "17px",
                    fontWeight: 600
                }}
                                >
                    {!timeout ? (
                        second_to_timestamp(animatedNumber.get())
                    ) : (
                        <>00:00:00</>
                    )}

            </motion.div>
        </div>
    )
}
