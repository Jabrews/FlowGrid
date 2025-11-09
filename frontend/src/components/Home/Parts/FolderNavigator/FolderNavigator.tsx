import { useState } from "react"

// utill
import { get_svg_icons } from "../../../util/get_svg_icons"
// hooks
import useQueryProjectFolderNames from "./hooks/useQueryProjectFolderNames"
import useMutateCreateProjectFolder from "./hooks/useMutateCreateProjectFolder"
// components
import FolderItem from "./FolderItem/FolderItem"


interface FolderNavigatorProps {
    selected: string
    onSelect: (id: string) => void
}

export type ProjectFolderPartial = {
    id  : string, 
    name : string,
}

export default function FolderNavigator({selected, onSelect }: FolderNavigatorProps) {
    const [isOpen, setIsOpen] = useState(true)

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    }

    // hook init 
    const mutateCreateProjectFolder = useMutateCreateProjectFolder()
        

    // query projectfolder names
    const {data,  isLoading, error} = useQueryProjectFolderNames()

    // handle project folder add
    const handleAddProjectFolder = () => {
        mutateCreateProjectFolder.mutate()
    }


    return (
        <>
            <div 
                className={`folder-navigator ${isOpen ? 'open' : 'closed'}`}
                style={{ display: isOpen ? 'block' : 'none' }}
            > 
                <div className='folder-header'> 
                    <h1>Project Folders</h1>
                    <button
                        className='folder-close-btn'
                        onClick={toggleOpen}
                        aria-label="Close folder navigator"
                    >
                        {get_svg_icons({ icon: 'Folder-Close', size: 28 })}
                    </button>
                </div>    
                {/* Folder Body */}
                {data && !isLoading &&
                    <div className='folder-body'>
                        {data.map((folder : ProjectFolderPartial) => (
                            <FolderItem
                                key={folder.id}
                                selected={selected}
                                onSelect={onSelect}
                                title={folder.name}
                                id={folder.id}
                            />
                        ))}
                        {/* add button*/}
                        <button 
                            className='add-btn'
                            onClick={handleAddProjectFolder}
                        >
                             + 
                        </button>
                    </div>
                }
                {isLoading &&
                    <div className='folder-body'>
                        <p> is loading</p>
                    </div>
                }

            </div>
            {!isOpen && 
                <button
                    className='toggle-navigator-btn'
                    onClick={toggleOpen}
                    aria-label="Open folder navigator"
                >
                    {get_svg_icons({ icon: 'Folder-Nav-Open', size: 28 })}
                </button> 
            }
        </>
    )
}

