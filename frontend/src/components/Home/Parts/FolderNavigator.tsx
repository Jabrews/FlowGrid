import { useState } from "react"
import { get_svg_icons } from "../../util/get_svg_icons"

interface FolderNavigatorProps {
    selected?: string
    onSelect?: (id: string) => void
}

export default function FolderNavigator({ selected = '', onSelect }: FolderNavigatorProps) {
    const [isOpen, setIsOpen] = useState(true)

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    }

    const handleItemClick = (id: string) => {
        onSelect?.(id)
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
                <div className='folder-body'>
                    {/* after adding logic for selection of mapped array*/}
                    <div 
                        className={`folder-item-container ${selected ? 'selected' : ''}`}
                        onClick={() => handleItemClick('item1')}
                    >
                        <div className='folder-item-header'> 
                            <h2 className='item-label'>Folder Item Label</h2>
                        </div>
                    </div>
                    <div 
                        className={`folder-item-container`}
                        onClick={() => handleItemClick('item2')}
                    >
                        <div className='folder-item-header'> 
                            <h2 className='item-label'>Folder Item Label</h2>
                        </div>
                    </div>
                </div>
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

