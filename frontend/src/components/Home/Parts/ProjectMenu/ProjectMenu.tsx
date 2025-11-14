import {motion} from 'framer-motion'

// hooks
import useQueryProjects from "./hooks/useQueryProjects"
import useMutateCreateProject from './hooks/useMutateCreateProject'

// components
import Project from "./Project/Project"

type ProjectMenu = {
    selectedFolderId : string;
    selectedProjectId : string;
    onSelectProjectId : (newId : string) => void
}

export type ProjectData = {
    last_used : string,
    name : string,
    id : string,
}

export default function ProjectMenu({selectedFolderId, selectedProjectId, onSelectProjectId} : ProjectMenu) {

    // hooks
    const mutateCreateProject = useMutateCreateProject()    

    const {data, isLoading, error, isPending} = useQueryProjects(selectedFolderId)

    const handleCreateBtnDown = () => {
        mutateCreateProject.mutate(selectedFolderId)
    }


    /// NOTE TO SELF : MAKE SURE TO DISPLAY PROJECT BASED UPON LAST USED
    return (
    <div className='project-menu'>
        {isLoading && 
            <p> is loading...</p> 
        }

        {data && !error && !isLoading && data.map((project : ProjectData) => 
                <Project key={project.id}
                    name={project.name} 
                    last_used={project.last_used} 
                    id={project.id}
                    selectedProjectId={selectedProjectId}
                    onSelectProjectId={onSelectProjectId}
                    selectedFolderId={selectedFolderId}
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

