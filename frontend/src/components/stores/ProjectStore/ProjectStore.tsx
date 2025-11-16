import { create } from "zustand"

type ProjectStoreActions = {
    setGridUrl: () => void
    setFolderId: (folderId: string) => void
    setProjectId: (projectId: string) => void
}

type ProjectStore = {
    gridUrl: string
    folderId: string
    projectId: string
    actions: ProjectStoreActions
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
    gridUrl: "",
    folderId: "",
    projectId: "",
    actions: {
        setGridUrl: () => {
            const { folderId, projectId } = get()

            // check both exist
            if (!folderId || !projectId) {
                // reset all fields
                set({
                    gridUrl: "",
                    folderId: "",
                    projectId: "",
                })
                throw new Error("Missing folderId or projectId")
            }

            const url = `api/project_folders/${folderId}/projects/${projectId}/grid/`

            set({ gridUrl: url })
        },

        setFolderId: (folderId) => set({ folderId }),
        setProjectId: (projectId) => set({ projectId }),
    },
}))

// custom hooks
export const useGridUrl = () =>
    useProjectStore((s) => s.gridUrl)

export const useFolderId = () =>
    useProjectStore((s) => s.folderId)

export const useProjectId = () =>
    useProjectStore((s) => s.projectId)

// actions
export const useSetFolderId = () =>
    useProjectStore((s) => s.actions.setFolderId)

export const useSetProjectId = () =>
    useProjectStore((s) => s.actions.setProjectId)

export const useSetGridUrl = () =>
    useProjectStore((s) => s.actions.setGridUrl)
