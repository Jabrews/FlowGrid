import { useStopwatch} from "react-timer-hook"

// hooks
import useMutateTrackObjList from "../hooks/useMutateTrackObjList"
import useQueryTimeTrackObjs from "../hooks/useQueryTimerTrackObjs"

// util
import convert_seconds_stopwatch from "./util/convert_seconds_stopwatch"
import get_id_array from "../util/get_id_array"
import get_tracker_i_array from "../util/get_tracker_I_array"

type StopwatchTimerProps = {
    timerI : string,
}

export default function StopwatchTimer({timerI} : StopwatchTimerProps) {

    // hook init
    const mutateTrackObjList = useMutateTrackObjList()
    const {data : timerTrackObjects} = useQueryTimeTrackObjs(timerI)

    const {
        start,
        pause,
        reset,
        isRunning,
        totalSeconds,
    } = useStopwatch({interval: 20, autoStart:false})


    const handleOnRestartBtn = () => {
        reset()
        if (timerTrackObjects == undefined || timerTrackObjects.length <= 0) return
        // else update them all
        const idArray = get_id_array(timerTrackObjects)
        const trackerIArray = get_tracker_i_array(timerTrackObjects)

        mutateTrackObjList.mutate({
            trackObjIdList: idArray ,
            timeFieldName : 'elaspedSeconds' ,
            newTimeValue : totalSeconds,
            trackObjTrackerIList: trackerIArray
        })
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