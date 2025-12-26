import { useState, useEffect} from "react"

// hooks
import useMutateTimerTrackObj from "./hooks/useMutateTimerTrackObj.tsx"

// utill
import type { TrackObj } from "../../../../Grid/GridItemHeader/util/track_obj_type"
import convert_seconds_stopwatch from "../../../Timer/StopwatchTimer/util/convert_seconds_stopwatch"
import convert_time_stamp_to_seconds from "./util/covert_time_stamp_to_seconds"


type TimerMenuProps = {
    trackObject : TrackObj
}

export default function TimerMenu({trackObject} : TimerMenuProps) {


    const [elaspedTimeDummy, setElaspedTimeDummy] = useState('00:00:00') 
    const [timeSpentDummy, setTimeSpentDummy] = useState('00:00:00')

    // hook init
    const mutateTimerTrackObj = useMutateTimerTrackObj()


    // load values on startup 
    useEffect(() => {
        if (trackObject.elaspedSeconds == undefined || trackObject.timespentSeconds == undefined) {
            return
        } 
        const elaspedTime = convert_seconds_stopwatch({seconds : trackObject.elaspedSeconds})
        const spentTime = convert_seconds_stopwatch({seconds : trackObject.timespentSeconds})
        setElaspedTimeDummy(elaspedTime)
        setTimeSpentDummy(spentTime)
    },[trackObject])



    // input change handlers //
    const handleElaspedTimeSubmit= (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const newElaspedTime = convert_time_stamp_to_seconds({timeStamp: elaspedTimeDummy})
            mutateTimerTrackObj.mutate({
                newSeconds: newElaspedTime,
                type : 'elasped',
                trackObjId : String(trackObject.id),
                trackObjI : String(trackObject.trackerI),
                gridItemI : String(trackObject.gridItemI),
            })
        }
        // default on error
        catch {
            if (trackObject.elaspedSeconds == undefined) return
            const elaspedTime = convert_seconds_stopwatch({seconds : trackObject.elaspedSeconds})
            setElaspedTimeDummy(elaspedTime)
        }

    }

    const handleSpentTimeSubmit= (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const newSpentTime= convert_time_stamp_to_seconds({timeStamp: timeSpentDummy})
            mutateTimerTrackObj.mutate({
                newSeconds : newSpentTime,
                type : 'timespent',
                trackObjId : String(trackObject.id),
                trackObjI : String(trackObject.trackerI),
                gridItemI : String(trackObject.gridItemI),
            })
        }
        // default on error
        catch {
            if (trackObject.timespentSeconds == undefined) return
            const timeSpentSeconds = convert_seconds_stopwatch({seconds : trackObject.timespentSeconds})
            setTimeSpentDummy(timeSpentSeconds)
        }

    }


    return (
                

        <div className='timer-menu-container'>

            <div className='tracker-menu-item-container'>
                <p> time elasped</p>
                <form onSubmit={handleElaspedTimeSubmit}>
                     <input 
                        value={elaspedTimeDummy} 
                        key={`elaspedTime-${trackObject.id}`}
                        onChange={(e) => setElaspedTimeDummy(e.target.value)} 
                        />
                </form>
                <button> X </button>
            </div>

            <form onSubmit={handleSpentTimeSubmit}>
                <div className='tracker-menu-item-container'>
                    <p> time spent </p>
                    <input 
                        value={timeSpentDummy}
                        key={`timeSpent-${trackObject.id}`}
                        onChange={((e) => {setTimeSpentDummy(e.target.value)})}
                    />
                    <button> X </button>
                </div>
            </form>

        </div>
    )



}