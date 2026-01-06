import { useState } from "react"

// util
import { get_svg_icons } from "../../../util/get_svg_icons"

type FolderProps  = {
    name : string,
    id : number,
    folderOpen: boolean;
    toggleFolderOpen: React.Dispatch<React.SetStateAction<boolean>>;
};




export default function Folder({name, id, folderOpen, toggleFolderOpen, } : FolderProps) {

    const [dummyFolderName, setDummyFolderName] = useState(name)


    return (
        <div 
            className={`folder-container ${folderOpen ? 'active' : ''}`}
            onClick={() => toggleFolderOpen(!folderOpen)}

        >
            <button
                className="folder-btn"
                onClick={() => toggleFolderOpen(!folderOpen)}
                id={`folder-btn-${String(id)}`}
            >
                {folderOpen
                    ? get_svg_icons({ icon: 'folder-open', size: 18 })
                    : get_svg_icons({ icon: 'folder-close', size: 18 })}
            </button>
            <input
                id={`folder-input-${String(id)}`}
                value={dummyFolderName}
                onChange={(e) => setDummyFolderName(e.target.value)}
            />
        </div>


    )


}