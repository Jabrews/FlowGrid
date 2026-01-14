
// hooks
import { useShowFolderPannel, useToggleShowFolderPannel } from "../../stores/NoteNavigatorStore/NoteNavigatorStore"

// util
import { get_svg_icons } from "../../util/get_svg_icons"

// components
import TextArea from "./TextArea/TextArea"

export default function NoteEditor(){

    // hook init
    const showFolderPannel = useShowFolderPannel()
    const toggleShowFolderPannel = useToggleShowFolderPannel()

    const columnSpan = showFolderPannel ? "3 / 7" : "1 / 7";

    return (
        <div 
            className="note-editor-container"
            style={{ gridColumn: columnSpan }}
        >
            <div className='note-editor-header'>
                <button 
                    className='close-icon'
                    onClick={() => {toggleShowFolderPannel(!showFolderPannel)}} 
                >
                    {showFolderPannel ? (
                        get_svg_icons({icon : 'Side-Dropper-Close', size : 20 })
                    ) : (
                        get_svg_icons({icon : 'Side-Dropper-Open', size : 20 })
                    )}


                </button>
                <p> Note Editor </p>
                <button className='icon'>
                    {get_svg_icons({icon : 'notebook_open', size : 14})}
                </button>

            </div>
            {/* <TextArea /> */}
        </div>
    )

}