import { useState, useRef } from 'react'
import image from '../../../../../assets/example.png'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

// hooks
import { useConfirmStore } from '../../../../stores/ConfirmStore/ConfirmStore'
import { useToggleShowDeleteModal } from '../../../../stores/ModalRendererStore/ModelRendererStore'
import useMutateDeleteProject from './hooks/useMutateDeleteProject'
import useMutateChangeProjectName from './hooks/useMutateChangeProjectName'
// for setting names in NAVBAR
import { useSetActiveProjectName } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
// for setting ids in projects for grid querying
import { useSetActiveProjectId } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import { useSetGridUrl } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import { useActiveFolderId } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import { useActiveProjectId } from '../../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'

// util
import { get_svg_icons } from '../../../../util/get_svg_icons'

type Project = { 
    projectName : string, 
    projectId : string,
    project_last_used : string,
}   

export default function Project({projectName, projectId, project_last_used} : Project) {
    
    // delete hooks
    const toggleShowDeleteModal = useToggleShowDeleteModal()
    const {ask} = useConfirmStore()
    const mutateDeleteProject = useMutateDeleteProject()
    const mutateChangeProjectName = useMutateChangeProjectName()

    // setting projecti info when loading grid hooks
    const setActiveProjectName = useSetActiveProjectName()
    const setActiveProjectId = useSetActiveProjectId()
    const setGridUrl = useSetGridUrl()
    
    // other getters
    const activeFolderId = useActiveFolderId()
    const activeProjectId = useActiveProjectId()

    const [isHovered, toggleIsHovered] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(projectName)

    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    // ---- DOUBLE TAP LOGIC ----
    const lastTapRef = useRef(0)

    const handleDoubleTapOrClick = () => {
        const now = Date.now()
        const diff = now - lastTapRef.current

        // desktop double-click triggers two click events too (very fast)
        if (diff < 250) {
            setActiveProjectName(projectName)
            setActiveProjectId(projectId)
            setGridUrl()
            navigate('/workspace')
        }

        lastTapRef.current = now
    }
    // --------------------------

    const handlePenClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsEditing(true)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleBlur = () => {
        setIsEditing(false)

        if (!editValue.trim() || editValue.trim() === projectName) return

        if (activeFolderId == null) return

        mutateChangeProjectName.mutate({
            selectedFolderId: activeFolderId,
            selectedProjectId : activeProjectId,
            newName: editValue.trim(),
        })
    }

    const handleDeleteBtn = async () => {

        if (activeFolderId == null) return

        const waitForConfirm = ask()  
        toggleShowDeleteModal(true)
        const confirmed = await waitForConfirm
        if (confirmed) {
            mutateDeleteProject.mutate({activeFolderId, activeProjectId})
        }
        toggleShowDeleteModal(false)
    }


    return (
        <div onClick={handleDoubleTapOrClick}>  
            <motion.div 
                className={`project-container ${activeProjectId == projectId ? 'active-project' : ''}`} 
                key={projectId}
                onClick={() => setActiveProjectId(projectId)}
                onHoverStart={() => toggleIsHovered(true)}
                onHoverEnd={() => toggleIsHovered(false)}
                onTapStart={() => toggleIsHovered(true)}
                onTouchCancel={() => toggleIsHovered(true)}
                onTapCancel={() => toggleIsHovered(false)}
            >
                <motion.button
                    onClick={handleDeleteBtn}
                    className='del-btn'
                    style={{ opacity: isHovered && !isEditing ? 1 : 0 }}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                X 
                </motion.button>

                <img src={image}/>

                <div className='project-label'>
                    <input
                        ref={inputRef}
                        value={editValue}         
                        disabled={!isEditing}
                        onChange={(e) => setEditValue(e.currentTarget.value)} 
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur()
                        }}
                    />

                    <motion.div 
                        className='svg-div'
                        style={{ opacity: isHovered && !isEditing && activeProjectId == projectId ? 1 : 0 }}
                        whileHover={{ scale: 1.15 }}
                        onClick={handlePenClick}
                    >
                        {get_svg_icons({icon : 'Change-Input', size : 18})}
                    </motion.div>
                </div>

                <p className='date'>{project_last_used}</p>
            </motion.div>
        </div>
    )
}
