// components
import FolderNavigator from "./Parts/FolderNavigator/FolderNavigator"
import ProjectMenu from './Parts/ProjectMenu/ProjectMenu'
import ModalRenderer from '../ModalRenderer/ModalRenderer'
import Navbar from "../Navbar/Navbar"



export default function Home() {


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