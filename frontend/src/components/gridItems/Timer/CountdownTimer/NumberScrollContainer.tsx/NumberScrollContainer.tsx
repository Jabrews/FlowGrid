// util
import type { TimeObject } from "../util/timer_types";

// Number Scroll Component
import NumberScroll from "./NumberScroll/NumberScroll"

type NumberScrollContainerProps = {
    setTimeObjects: React.Dispatch<React.SetStateAction<TimeObject[]>>;

}

export default function NumberScrollContainer({setTimeObjects} : NumberScrollContainerProps) {

    return (
        <div className='picker-container'>

            {/* Hours */}
            <NumberScroll 
                interval="hrL"
                setTimeObjects={setTimeObjects}
            />
            <NumberScroll 
                interval="hrR"
                setTimeObjects={setTimeObjects}
            />

            <p> : </p>

            {/* Minutes */}
            <NumberScroll 
                interval="minL"
                setTimeObjects={setTimeObjects}
            />
            <NumberScroll 
                interval="minR"
                setTimeObjects={setTimeObjects}
            />

            <p> : </p>

            {/* Seconds */}
            <NumberScroll 
                interval="secL"
                setTimeObjects={setTimeObjects}
            />
            <NumberScroll 
                interval="secR"
                setTimeObjects={setTimeObjects}
            />

        </div>
    )

}