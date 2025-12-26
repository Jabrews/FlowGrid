import { useState, useEffect, useRef} from "react"

// hooks
// import useQueryTracker from "./hooks/useQueryTracker"
import useQueryTrackObjByTrackerI from "./hooks/useQueryTrackObjByTrackerI"
import useRenderTrackerMenus from "./hooks/useRenderTrackMenus"
import useMutateTrackObjName from "./hooks/useMutateTrackObjName"


type TrackerProps = {
    i : string
}

export default function Tracker({i} : TrackerProps) {
    
    const [selectedIndex, incrementSelectedIndex] = useState(0) 
    const [customNameDummy , setCustomNameDummy] = useState(' ')

    // hook init
    const {data : trackObjs} = useQueryTrackObjByTrackerI({trackerI : i})
    const renderTrackerMenus = useRenderTrackerMenus({index : selectedIndex, trackObjects : trackObjs})
    const mutateTrackObjName = useMutateTrackObjName()
    const lastTrackObjsLength = trackObjs?.length || undefined


    useEffect(() => {
        if (!trackObjs || trackObjs.length === 0) return 
        const customName: string | undefined = trackObjs[selectedIndex]?.customName
        if (!customName) {
            return
        } 

        setCustomNameDummy(customName)
    }, [trackObjs, selectedIndex, lastTrackObjsLength])
    
    // handlers //
    const handleFowardBtn = () => { 
        if (selectedIndex == trackObjs.length - 1 || trackObjs.length == 0) {
            return
        }
        incrementSelectedIndex((prev) => prev += 1)

    }

    const handleBackBtn = () => {
        if (selectedIndex == 0 || trackObjs.length == 0) {
            return
        }
        incrementSelectedIndex((prev) => prev -= 1)

    }

    // tracker header handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomNameDummy(e.target.value)
    }

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (customNameDummy.length > 0) {
            mutateTrackObjName.mutate({
                newCustomName : customNameDummy,
                selectedTrackObj : trackObjs[selectedIndex]
            })
        }

       // run mutation 
    }


    return (
    <div className='tracker-container highlight-content'>
        {/* Tracker Header */}
        <div className='tracker-header'>
            <button onClick={handleBackBtn}> &lt; </button>
                <form className='header-form' onSubmit={handleInputSubmit}>
                    {!trackObjs || trackObjs.length == 0 

                    ? (
                        <p> none </p>
                    )
                    : (
                        <input value={customNameDummy} onChange={handleInputChange} />
                    )
                    }



                </form>
            <button onClick={handleFowardBtn}> &gt; </button>
        </div>

        {/* Tracker Content */}
        <div className='tracker-menu-container'>
            <div className='tracker-menu-header' style={{overflow: 'visible'}}>
                    {!trackObjs || trackObjs.length == 0 || !trackObjs[selectedIndex]

                    ? (
                        <p> nothing connected yet</p>
                    )
                    : (
                        <p> connected to : {trackObjs[selectedIndex].gridItemI } </p>
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