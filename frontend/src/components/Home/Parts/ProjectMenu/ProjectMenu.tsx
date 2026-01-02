import { useState, useEffect} from 'react'
import {motion} from 'framer-motion'

// hooks
import useQueryProjects from "./hooks/useQueryProjects"
import useMutateCreateProject from './hooks/useMutateCreateProject'
// for setting ids in projects for grid querying
import { useActiveFolderId } from '../../../stores/ProjectAndFolderStore/ProjectAndFolderStore'

// components
import Project from "./Project/Project"


export type ProjectData = {
    last_used : string,
    name : string,
    id : string,
}

export default function ProjectMenu() {



    // hooks
    const activeFolderId = useActiveFolderId()
    const mutateCreateProject = useMutateCreateProject()    

    const {data, isLoading, error, isPending} = useQueryProjects({folderId : activeFolderId})

    const [projects, setProjects] = useState(data)

    const handleCreateBtnDown = () => {
        if (activeFolderId == null) return
        mutateCreateProject.mutate(activeFolderId)
    }

    useEffect(() => {
        setProjects(data)
    }, [data])



    /// NOTE TO SELF : MAKE SURE TO DISPLAY PROJECT BASED UPON LAST USED
    return (
    <div className='project-menu'>
        {isLoading && 
            <p> is loading...</p> 
        }

        {projects && !error && !isLoading && projects.map((project : ProjectData) => 
                <Project key={project.id}
                    projectName={project.name} 
                    projectId={project.id}
                    project_last_used={project.last_used} 
                />
        )}

        {data && !error && !isLoading &&
            <motion.button 
            disabled={isPending}
                onClick={handleCreateBtnDown}
                className='add-project-btn'
                whileHover={{ scale: 1.15 }}     // increase size on hover
                whileTap={{ scale: 0.95 }}       // optional: press feedback
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                +
            </motion.button>
        }



    </div>
    )
}

