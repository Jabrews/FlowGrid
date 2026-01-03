import { screen, waitFor, cleanup, render } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import UserEvent, { userEvent } from "@testing-library/user-event";
import "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// hooks 
import { useRenderWithQueryProvider } from "../hooks/useRenderWithQueryProvider";

// components
import FolderItem from "../../components/Home/Parts/FolderNavigator/FolderItem/FolderItem";

const mutateDeleteFolderItem = vi.fn()

vi.mock(
    '../../components/Home/Parts/FolderNavigator/FolderItem/hooks/useMutateDeleteProjectFolder.tsx',
    () => ({
        default : () => ({
            mutate : mutateDeleteFolderItem,
            isPending: false, 
        })
    })
)



describe('FolderItem', () => {

    it('load default data, and patch hook', async () => {
    useRenderWithQueryProvider(
        <FolderItem
        folderId="1"
        folderName="default_folder_name"
        />
    )


    // default data
    expect(screen.getByDisplayValue('default_folder_name')).toBeInTheDocument()

    // simulate hover click
    const container = document.querySelector('.folder-item-container')
    if (!container) throw new Error('mor than one folder item container, test sandbox err') 
    await userEvent.click(container)

    // del btn
    const deleteFolderBtn = document.querySelector('.delete-btn')
    if (!deleteFolderBtn) throw new Error('mor than one folder item container, test sandbox err') 
    await userEvent.click(deleteFolderBtn)
    expect(mutateDeleteFolderItem)
    })


})



