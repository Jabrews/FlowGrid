import { useState } from "react"

// hooks
import useQueryTracker from "./hooks/useQueryTracker"
import useQueryTrackObjByTrackerI from "./hooks/useQueryTrackObjByTrackerI"
import useRenderTrackerMenus from "./hooks/useRenderTrackMenus"


type TrackerProps = {
    i : string
}

export default function Tracker({i} : TrackerProps) {
    
    const [selectedIndex, incrementSelectedIndex] = useState(0) 

    // hook init
    const {data : tracker} = useQueryTracker(i)
    const {data : trackObjs} = useQueryTrackObjByTrackerI({trackerI : i})
    console.log('track objs : ', trackObjs)
    const renderTrackerMenus = useRenderTrackerMenus({index : selectedIndex, trackObjects : trackObjs})

    const handleFowardBtn = () => { 
        console.log('trakc objs', trackObjs, 'index : ', selectedIndex)
        if (selectedIndex == trackObjs.length - 1 || trackObjs.length == 0) {
            console.log('cant go foward')
            return
        }
        incrementSelectedIndex((prev) => prev += 1)

    }

    const handleBackBtn = () => {
        console.log('trakc objs', trackObjs, 'index : ',)
        if (selectedIndex == 0 || trackObjs.length == 0) {
            console.log('cant go back')
            return
        }
        incrementSelectedIndex((prev) => prev -= 1)

    }



    return (
    <div className='tracker-container highlight-content'>
        {/* Tracker Header */}
        <div className='tracker-header'>
            <button onClick={handleBackBtn}> &lt; </button>
            <h1> none </h1>
            <button onClick={handleFowardBtn}> &gt; </button>
        </div>

        {/* Tracker Content */}
        <div className='tracker-menu-container'>
            <div className='tracker-menu-header' style={{overflow: 'visible'}}>
                    {!trackObjs || trackObjs.length == 0

                    ? (
                        <p> nothing connected yet</p>
                    )
                    : (
                        <p> connected to : </p>
                    )
                    }
            </div>
            <div className="tracker-menu-content"> 
                    {!trackObjs || trackObjs.length == 0

                    ? (
                        <p> no connected item</p>
                    )
                    : (
                        renderTrackerMenus
                    )
                    }
            </div>
        </div>
    </div>
    )

}