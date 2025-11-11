// components
import FolderNavigator from "./Parts/FolderNavigator/FolderNavigator"
import ProjectMenu from './Parts/ProjectMenu/ProjectMenu'
import ModalRenderer from '../ModalRenderer/ModalRenderer'

// store hooks
import { useSetLastActiveFolderItemId } from "../stores/GridQuickLoadStore/GridQuickLoadStore"
import { useLastActiveFolderItemId } from "../stores/GridQuickLoadStore/GridQuickLoadStore"
import { useSetLastActiveProjectId } from "../stores/GridQuickLoadStore/GridQuickLoadStore"
import { useLastActiveProjectId } from "../stores/GridQuickLoadStore/GridQuickLoadStore"


export default function Home() {

    // store hook init
    const setLastActiveFolderItemId = useSetLastActiveFolderItemId()
    const lastActiveFolderItemId = useLastActiveFolderItemId() 
    const setLastActiveProjectId = useSetLastActiveProjectId()
    const lastActiveProjectId = useLastActiveProjectId()

    return (
        <div className='home-container'>
            {/* Folder Navigator*/}
            <FolderNavigator 
                selectedFolderId={lastActiveFolderItemId}
                onSelectFolderId={setLastActiveFolderItemId}
            />

            {/* Project Menu */}
            <ProjectMenu 
                selectedFolderId={lastActiveFolderItemId} 
                selectedProjectId={lastActiveProjectId}
                onSelectProjectId={setLastActiveProjectId}
            />
            <ModalRenderer />

        </div>
    )
}