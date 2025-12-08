import { useStopwatch} from "react-timer-hook"

// util
import convert_seconds_stopwatch from "./util/convert_seconds_stopwatch"

export default function StopwatchTimer() {

    const {
        start,
        pause,
        reset,
        isRunning,
        totalSeconds,
    } = useStopwatch({interval: 20, autoStart:false})


    const handleOnRestartBtn = () => {
        reset()
    }

    return (
        <>

            <p className='time-label'> {convert_seconds_stopwatch({seconds : totalSeconds})}</p>

            <div className='stopwatch-btn-container'>
                {!isRunning ? (
                    <button onClick={start}> start </button>
                ) : (
                    <button onClick={pause}>  pause </button>
                )}
                <button onClick={handleOnRestartBtn}> Restart </button>
            </div>     
        
        
        </>
    )


}