
export const switchCaseTrackObjQuery = (gridItemI : string) => {

    const gridItemType = gridItemI.replace(/-.*/, "")

    switch (gridItemType) {

        case 'timer' : 
            return 'track_obj_timer'
        default :
            return new Error('could not find track obj query, likely invalid type')        

    }


}