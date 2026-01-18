import { useMutation, useQueryClient} from "@tanstack/react-query";

// hooks
import useCsrf from "../../../../../../hooks/useCsrf";

// util
import { mutate_auth } from "../../../../../../util/mutate_auth";
import type { RawObj } from "../../../util/text_area_types";

type DeleteRawForm = {
    noteId : number,
    rawObject : RawObj,
    rawObjects : RawObj[],
    maxCharLengthRef : React.RefObject<number>
}

export default function useDeletePopulatedRawObject() {

    // hook init    
    const csrf_token = useCsrf()
    const queryClient = useQueryClient()

    // helper func
    const split_text = (
        rawObjects : RawObj[],
        rawObjectLineNum : number,
        maxCharLengthRef : React.RefObject<number>
    ) => {
        // get active item
        const activeRawObj = rawObjects.find((item: RawObj) => item.lineNum == rawObjectLineNum)

        // find prior line
        const priorRawObj = rawObjects.find((item: RawObj) => item.lineNum == rawObjectLineNum - 1)

        if (!activeRawObj || !priorRawObj) throw new Error('missing raw object, not found')

        // evaulate how much from prior can fit 
        const textRoom = maxCharLengthRef.current - priorRawObj.text.length - 1

        // nothing can fit (abort early)
        if (textRoom <= 0) {
            return {
                newActiveText: activeRawObj.text,
                newPriorText: priorRawObj.text
            }
        }

        // split text to get required length {active obj}
        const fittingText = ' ' + activeRawObj.text.slice(0, textRoom)

        // get rid of text from {active obj}
        const newActiveText = activeRawObj.text.slice(textRoom)

        // add to prior and leave the rest {prior obj}
        const newPriorText = priorRawObj.text.trimEnd() + fittingText

        return {newActiveText, newPriorText}


    }



    return useMutation({
        mutationFn : async ({noteId, rawObject, rawObjects, maxCharLengthRef} : DeleteRawForm) => {

            if (!csrf_token) throw new Error('no csrf token found')

            const {newActiveText, newPriorText} = split_text(rawObjects, rawObject.lineNum, maxCharLengthRef)

            console.log('active : ', newActiveText, ' prior : ',)


            const init : RequestInit = {
                method : 'PATCH',
                body : JSON.stringify({
                    lineNum : rawObject.lineNum,
                    noteId : noteId,
                    newActiveText : newActiveText,
                    newPriorText : newPriorText
                })
            }

            return mutate_auth({
                queryUrl : `api/raw_objects/delete_overpopulated_raw_obj/`,
                init : init,
                csrf_token : csrf_token
            })


        },
        onSuccess : (_data, variables) => {
            // queryClient.invalidateQueries({queryKey : [`raw-objs', ${variables.noteId}`]})
            queryClient.invalidateQueries({queryKey : ['raw-objs', variables.noteId]})
        }


    })
}