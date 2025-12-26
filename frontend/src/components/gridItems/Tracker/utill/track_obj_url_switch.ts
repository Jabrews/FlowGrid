
export default function track_obj_url_switch(gridItemType : string) {

    switch (gridItemType) {

        case 'timer' : 
            return 'track_obj_timer'

        default : 
            throw new Error('no track object found')

    }



    return 

}