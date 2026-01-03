import {screen, cleanup} from '@testing-library/react'
import {describe, it, expect, vi, afterEach} from 'vitest'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/react'
import "@testing-library/jest-dom/vitest"

// components
import FolderNavigator from '../../components/Home/Parts/FolderNavigator/FolderNavigator'

// hooks
import { useRenderWithQueryProvider } from '../hooks/useRenderWithQueryProvider'

export const mutateCreateProjectFolder = vi.fn()
vi.mock(
  '../../components/Home/Parts/FolderNavigator/hooks/useQueryProjectFolderNames',
  () => ({
    default: () => ({
      data: [{ id: '1', name: 'folderItem1' }],
      isLoading: false,
      isPending: false,
    }),
  })
)
vi.mock(
  '../../components/Home/Parts/FolderNavigator/hooks/useMutateCreateProjectFolder',
  () => ({
    default: () => ({
      mutate: mutateCreateProjectFolder,
      isPending: false,
    }),
  })
)

// test handlers
afterEach(() => {
    vi.resetAllMocks()
    cleanup()
})


describe('FolderNavigator', () => {
  it('query, display, create', async () => {

    useRenderWithQueryProvider(<FolderNavigator />)

    // wait for folder to appear
    await screen.findByDisplayValue('folderItem1')

    // click button
    const addNewButton = screen.getByRole('button', { name: /new/i })
    await userEvent.click(addNewButton)

    // assert mutation was triggered
    expect(mutateCreateProjectFolder).toHaveBeenCalledWith({

    })
  })
})






