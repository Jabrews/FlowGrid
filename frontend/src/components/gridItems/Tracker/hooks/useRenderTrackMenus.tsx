// utill
import type { TrackObj } from "../../../Grid/GridItemHeader/util/track_obj_type"

// tracker menus
import TimerMenu from "../TrackerMenus/TimerMenu/TimerMenu"


type RenderTrackerMenuProps = {
    index : number,
    trackObjects : TrackObj[]




}

export default function useRenderTrackerMenus({index, trackObjects} : RenderTrackerMenuProps) {

    if (!trackObjects) return

    const activeItem = trackObjects[index]
    const activeItemType = activeItem?.gridItemI.replace(/-.*/, "")


    switch (activeItemType) {

        case 'timer' :
            return (
                <TimerMenu trackObject={trackObjects[index]}/>
            )
        default :
            return (
                <p> not found</p>
            )


    }

}