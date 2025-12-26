// utill
import type { TrackObj } from "../../../Grid/GridItemHeader/util/track_obj_type";



export default function get_id_array(trackObjArray : TrackObj[]) {

    const idArray : string[] = []

    trackObjArray.map((trackObj : TrackObj) => {
        if (!trackObj.id) throw new Error('no id found for track obj')
        idArray.push(String(trackObj.id))
    })

    return idArray



}