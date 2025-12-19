import { useEffect } from "react";

// hooks
import { useConfirmStore } from "../../stores/ConfirmStore/ConfirmStore"; 
import { useToggleShowDeleteModal } from "../../stores/ModalRendererStore/ModelRendererStore";
import useMutateDeleteLayout from "./hooks/useMutateDeleteLayout";
import useMutateDeleteGridItem from "./hooks/useMutateDeleteGridItem"; 
import { useTogglePauseRender } from "../../stores/LineRendererStore/LineRendererStore"; 


type GridItemHeaderProps = {
  i: string;
  type: string;
  layoutId : string | null;
};

export default function GridItemHeader({ i, type, layoutId}: GridItemHeaderProps) {

  // hook init
  const {ask} = useConfirmStore()  
  const toggleShowDeleteModal = useToggleShowDeleteModal()
  const mutateDeleteLayout = useMutateDeleteLayout()
  const mutateDeleteGridItem = useMutateDeleteGridItem()
  const togglePauseRender = useTogglePauseRender()


  const handleDeleteBtnDown = async () => {
    if (!layoutId) {
      throw new Error('Could not find layout id')
    }
    const waitForConfirm = ask()
    toggleShowDeleteModal(true)
    const confirmed = await waitForConfirm
    if (confirmed) {
      mutateDeleteLayout.mutate({
        layoutId : layoutId,
      })
      mutateDeleteGridItem.mutate({
        i : i,
        type : type,
      })

    }
    toggleShowDeleteModal(false)
  }



  return (
    <div className="grid-item-header">
    <p
      className="drag-handle"
      onPointerDown={() => {
        togglePauseRender(true)
      }}
    >
      ::
    </p>

      <p 
        className='del-icon'
        onClick={handleDeleteBtnDown} 
      > 
        X 
      </p>
    </div>
  );
}