import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// hooks
import { useRenderWithQueryProvider } from "../hooks/useRenderWithQueryProvider";

// components
import ProjectMenu from "../../components/Home/Parts/ProjectMenu/ProjectMenu";
import FolderItem from "../../components/Home/Parts/FolderNavigator/FolderItem/FolderItem";

// mock init

const mutatePatchCreateProjectMenu = vi.fn()
    

vi.mock(
    '../../components/Home/Parts/ProjectMenu/hooks/useMutateCreateProject.tsx',
    () => ({
        default: () => ({
            mutate: mutatePatchCreateProjectMenu,
            isPending: false,
        })
    })
)

vi.mock(
    '../../components/Home/Parts/ProjectMenu/hooks/useQueryProjects.tsx',
    () => ({
        default: () => ({
            data: [{ name: 'project_menu_item', last_used: '11-11-11', id: '1' }]
        })
    })
)


describe('ProjectMenu', () => {

    it('query, display, create', async () => {
        
        const user = userEvent.setup()

        useRenderWithQueryProvider(
            <>
                <ProjectMenu />
                <FolderItem folderId="1" folderName="folder_item_name" />
            </>
        )

        // project menu : default data loaded
        expect(screen.getByDisplayValue('project_menu_item')).toBeInTheDocument()

        // set activeFolderId
        const container = document.querySelector('.folder-item-container')!
        await user.click(container)

        // click create
        const createProjectBtn = screen.getByRole('button', { name: /\+/ })
        await user.click(createProjectBtn)

        // assert mutation
        await waitFor(() => {
            // note : '1' is activeFolderItemId
            expect(mutatePatchCreateProjectMenu).toHaveBeenCalledWith('1')
        })
    })


})
