import { useState, useEffect, useRef, useMemo} from "react"
import { useTimer } from "react-timer-hook"

// util
import type { TimeObject } from "../util/timer_types"
import convert_to_second from "../util/convert_to_second"

// components
import AnimateCircle from "./AnimateCircle/AnimateCircle"
import NumberScrollContainer from "./NumberScrollContainer.tsx/NumberScrollContainer"

export default function CountdownTimer() {

    const timeObjectsInital : TimeObject[]= [
        {type : 'hrL', value : 0, lastValue : 0},
        {type : 'hrR', value : 0, lastValue : 0},
        {type : 'minL', value : 0, lastValue : 0},
        {type : 'minR', value : 0, lastValue : 0},
        {type : 'secL', value : 0, lastValue : 0},
        {type : 'secR', value : 0, lastValue : 0},
    ]

    const [timeObjects, setTimeObjects] = useState(timeObjectsInital)
    const [timerRunning, toggleTimerRunning] = useState(false)
    const [timeout, toggleTimeout] = useState(false)

    // set a dummy date for init 
    const initialTime = useMemo(() => {
        const t = new Date();
        t.setSeconds(t.getSeconds() + 0);
        return t;
    }, []);
    const [startSec, setStartSec] = useState(0)

    const totalCountdownSec = useRef(0)

    const {
        isRunning,
        pause,
        totalSeconds,
        resume,
        restart,  
    } = useTimer({
        expiryTimestamp: initialTime,
        autoStart: false,
        onExpire: () => {toggleTimeout(true)},
    });

    // update countdown seconds with timeObjects
    useEffect(() => {
        let total = 0
        for (const item of timeObjects) {
            const seconds = convert_to_second({
                interval: item.type,
                value: item.value
            })
            total += seconds
        }

        totalCountdownSec.current = total
        
    }, [totalCountdownSec, timeObjects])

    
    // BTN HANDLERS///
    const handleStartTimerBtn = () => {
        if (!totalCountdownSec.current) return;

        const newTime = new Date();
        newTime.setSeconds(newTime.getSeconds() + totalCountdownSec.current);

        setStartSec(totalCountdownSec.current);

        // this sets the new expiry AND starts the timer
        restart(newTime, true);

        toggleTimerRunning(true);
    };

    const handleXBtn = () => {
        toggleTimerRunning(false)
        toggleTimeout(false)
    }

    const handleResetTimerBtn = () => {
        if (!startSec) return;

        const newTime = new Date();
        newTime.setSeconds(newTime.getSeconds() + startSec);

        toggleTimeout(false)
        restart(newTime, true);
    };

    ////////////////////

    return (
        <>
            {!timerRunning &&
                <>
                    <NumberScrollContainer setTimeObjects={setTimeObjects}/>
                    <button 
                        onClick={() => {handleStartTimerBtn()}}
                        className="start-timer-btn"
                    > 
                        Start 
                    </button>
                </>

            }
            {timerRunning &&
                <>
                    <AnimateCircle max={startSec} value={totalSeconds} timeout={timeout}/>
                        <div className='countdown-btn-container'>
                            {!isRunning ? (
                                <button onClick={resume} disabled={timeout}> Continue </button>
                            ) : (
                                <button onClick={pause}> Pause</button>
                            )}
                            < button onClick={handleResetTimerBtn}> Reset </button>
                        </div>
                    <button className='exit-timer-btn' onClick={handleXBtn}> X </button>
                </>
            }
        </>
    )

}