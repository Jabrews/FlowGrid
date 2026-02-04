import { useEffect } from "react"

// hooks
import { useToggleShowViewTutorialModal } from "../stores/ModalRendererStore/ModelRendererStore"

// components
import FolderNavigator from "./Parts/FolderNavigator/FolderNavigator"
import ProjectMenu from './Parts/ProjectMenu/ProjectMenu'
import ModalRenderer from '../ModalRenderer/ModalRenderer'
import Navbar from "../Navbar/Navbar"



export default function Home() {

    // hook init
    const toggleShowVewTutorialModal = useToggleShowViewTutorialModal()

    useEffect(() => {
        toggleShowVewTutorialModal(true)
    }, [toggleShowVewTutorialModal])


    return (
        <div className='home-container'>
            {/* Folder Navigator*/}
            <FolderNavigator />

            {/* Project Menu */}
            <ProjectMenu />
            <ModalRenderer />

            <Navbar />

        </div>
    )
}