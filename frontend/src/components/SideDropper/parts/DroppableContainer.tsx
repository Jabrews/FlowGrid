import { useState, useEffect} from 'react'
import { motion } from 'framer-motion'

// close droppabble table state hook
import { useCloseAllDropperTables } from '../../stores/SideDropperStore/SideDropperStore.tsx'
import { useToggleCloseAllDropperTables } from '../../stores/SideDropperStore/SideDropperStore.tsx'

// itemList.ts
import { itemTable } from './ItemTable.ts'

// isMobile hook
import useIsMobileScreen from '../../hooks/useIsMobileScreen.tsx'

// components
import DropItemMobile from './DropItem/DropItemMobile.tsx'
import DropItemDesktop from './DropItem/DropItemDesktop.tsx'

export default function DroppableContainer() {
    const [dropOpen, toggleDropOpen] = useState(false)
    
    // hook init
    const isMobile = useIsMobileScreen()
    const closeAllDropperTables = useCloseAllDropperTables()
    const toggleCloseAllDropperTables = useToggleCloseAllDropperTables()

    useEffect(() => {
        if (closeAllDropperTables == true) {
            toggleDropOpen(false)
        }
        toggleCloseAllDropperTables(false)
    }, [closeAllDropperTables, toggleCloseAllDropperTables])
    

    return (
        <div className='side-dropper-content-droppable-container'>
        {Object.entries(itemTable).map(([sectionName, list]) => (
            <div className='droppable-table-container' key={sectionName}>
            <div className='droppable-table-header'>
                <p className='header-name'>{sectionName}</p>
                <p className='header-length'>({list.length})</p>
                <motion.p
                className='header-icon'
                onClick={() => toggleDropOpen((prev) => !prev)}
                animate={{ rotate: dropOpen ? 0 : 180 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block', cursor: 'pointer' }}
                >
                ︿
                </motion.p>
            </div>

            {dropOpen && (
                <div className='droppable-table-body'>
                {list.map((item, index) => (
                    <div key={index}>
                    {isMobile ? <DropItemMobile type={item}/> : <DropItemDesktop type={item}/>}
                    </div>
                ))}
                </div>
            )}
            </div>
        ))}
        </div>
    )
}
