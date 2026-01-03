import { screen, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, } from "vitest";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// hooks
import { useRenderWithQueryProvider } from "../hooks/useRenderWithQueryProvider";

// components
import Project from "../../components/Home/Parts/ProjectMenu/Project/Project";
import ModalRenderer from "../../components/ModalRenderer/ModalRenderer";
import FolderItem from "../../components/Home/Parts/FolderNavigator/FolderItem/FolderItem";

// mock init
const mutateDeleteProject = vi.fn()
vi.mock(
    '../../components/Home/Parts/ProjectMenu/Project/hooks/useMutateDeleteProject.tsx',
    () => ({
        default: () => ({
            mutate: mutateDeleteProject,
            isPending: false,
        })
    })
)

afterEach(() => {
    cleanup()
    vi.resetAllMocks()
})



describe('Project', () => {

    it('load default data, and delete hook', async () => {
        const user = userEvent.setup()

        useRenderWithQueryProvider(
            <>
                <Project
                    projectName={'project_menu_item'}
                    project_last_used={'11-11-11'}
                    projectId={'1'}
                />
                <FolderItem
                    folderId="1"
                    folderName="default_folder_name"
                />

                <ModalRenderer />
            </>
        )

        // confirm project default value
        expect(screen.getByDisplayValue('project_menu_item'))

        // folder item id
        const folderContainer = document.querySelector(".folder-item-container")!;
        await user.click(folderContainer);

        // project item id
        const projectContainer = document.querySelector(".project-container")!;
        await user.click(projectContainer)

        // delete project btn
        const deleteProjectButton = screen.getByRole('button', { name: /X/i })
        await user.click(deleteProjectButton)

        /// press CONFIRM del btn on modal
        const confirmDeleteFolderBtn = screen.getByRole("button", {
            name: /Delete/i,
        });
        await user.click(confirmDeleteFolderBtn)

        await waitFor(() => {
            const [payload] = mutateDeleteProject.mock.calls[0]
            expect(payload).toEqual({
                activeFolderId: '1',
                activeProjectId: '1',
            })
        })

    })

})