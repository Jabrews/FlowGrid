import image from '../../assets/example.png'

// components
import FolderNavigator from "./Parts/FolderNavigator/FolderNavigator"
import ProjectMenu from './Parts/ProjectMenu/ProjectMenu'
import ModalRenderer from '../ModalRenderer/ModalRenderer'

// store hooks
import { useSetLastActiveFolderItemId } from "../stores/GridQuickLoadStore/GridQuickLoadStore"
import { useLastActiveFolderItemId } from "../stores/GridQuickLoadStore/GridQuickLoadStore"


export default function Home() {

    // store hook init
    const setLastActiveFolderItemId = useSetLastActiveFolderItemId()
    const lastActiveFolderItemId = useLastActiveFolderItemId() 

    return (
        <div className='home-container'>
            {/* Folder Navigator*/}
            <FolderNavigator 
                selected={lastActiveFolderItemId}
                onSelect={setLastActiveFolderItemId}
            />

            {/* Project Menu */}
            <ProjectMenu />
            <ModalRenderer />

        </div>
    )
}