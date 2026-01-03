import { screen, waitFor, cleanup} from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// hooks
import { useRenderWithQueryProvider } from "../hooks/useRenderWithQueryProvider";

// components
import FolderItem from "../../components/Home/Parts/FolderNavigator/FolderItem/FolderItem";
import ModalRenderer from "../../components/ModalRenderer/ModalRenderer";

const mutateDeleteFolderItem = vi.fn();
const mutatePatchFolderItem = vi.fn()

vi.mock(
    "../../components/Home/Parts/FolderNavigator/FolderItem/hooks/useMutateDeleteProjectFolder.tsx",
    () => ({
        default: () => ({
            mutate: mutateDeleteFolderItem,
            isPending: false,
        }),
    })
);

vi.mock(
    '../../components/Home/Parts/FolderNavigator/FolderItem/hooks/useMutatePatchProjectFolder.tsx',
    () => ({
        default : () => ({
            mutate : mutatePatchFolderItem,
            isPending : false,
        })
    })
)

afterEach(() => {
    cleanup()
    vi.resetAllMocks()
})


describe('FolderItem', () => {

    it("load default data, and delete hook", async () => {
        useRenderWithQueryProvider(
            <FolderItem folderId="1" folderName="default_folder_name" />
        );
        useRenderWithQueryProvider(<ModalRenderer />);

        // load defaut values
        expect(screen.getByDisplayValue("default_folder_name")).toBeInTheDocument();

        // hover click
        const container = document.querySelector(".folder-item-container")!;
        await userEvent.click(container);

        // press del btn
        const deleteFolderBtn = document.querySelector(".delete-btn")!;
        await userEvent.click(deleteFolderBtn);

        /// press CONFIRM del btn on modal
        const confirmDeleteFolderBtn = screen.getByRole("button", {
            name: /Delete/i,
        });
        await userEvent.click(confirmDeleteFolderBtn)

        await waitFor(() => {
            expect(mutateDeleteFolderItem).toHaveBeenCalledWith({ id: "1" });
        });
    });

    it("patch data and hook", async () => {

        useRenderWithQueryProvider(
            <FolderItem folderId="1" folderName="default_folder_name" />
        );

        // hover click
        const container = document.querySelector(".folder-item-container")!;
        await userEvent.click(container);
        
        // handle input
        const input = screen.getByDisplayValue("default_folder_name")
        const user = userEvent.setup()
        await user.clear(input)
        await user.type(input, 'new_folder_name')
        await user.tab()

        await waitFor(() => {
            // skips on sucess, only grabs form from call
            const [payload] = mutatePatchFolderItem.mock.calls[0]       
            expect(payload).toEqual({
                folderId: "1",
                newText: "new_folder_name",
            })
        })

    })

})

