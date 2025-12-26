// utill
import type { TrackObj } from "../../../Grid/GridItemHeader/util/track_obj_type";



export default function get_tracker_i_array(trackObjArray : TrackObj[]) {

    const trackerIArray: string[] = []

    trackObjArray.map((trackObj : TrackObj) => {
        if (!trackObj.trackerI) throw new Error('no id found for track obj')
        trackerIArray.push(String(trackObj.trackerI))
    })

    return trackerIArray 



}