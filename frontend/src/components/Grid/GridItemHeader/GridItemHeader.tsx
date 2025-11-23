// editor edge scroll store hook
import { useToggleEditorScrollEventActive } from '../../WorkSpace/hooks/useEdgeScrollStore';

// delete modal toggle
// import {useToggleDeleteModal, useSetDeleteTargetId, useSetDeleteTargetType} from '../../ModalRenderer/hooks/useModalRendererStore'

type GridItemHeaderProps = {
  i: string;
  type: string;
};

export default function GridItemHeader({ i, type }: GridItemHeaderProps) {
  
  // edge scroll hook
  const toggleEditorScrollEventActive = useToggleEditorScrollEventActive();
  
  // del modal hook
//   const toggleDeleteModal = useToggleDeleteModal()
//   const setDeleteTargetId = useSetDeleteTargetId()  
//   const setDeleteTargetType = useSetDeleteTargetType()


  const handleDeleteBtnDown = () => {
    console.log('deleting : ', i)
//     setDeleteTargetId(i)
//     setDeleteTargetType(type)
//     toggleDeleteModal(true)
  }


  return (
    <div className="grid-item-header">
      <p
        className="drag-handle move-icon"
        // onPointerDown={() => toggleEditorScrollEventActive(true)}
        // onPointerUp={() => toggleEditorScrollEventActive(false)}
        // onPointerCancel={() => toggleEditorScrollEventActive(false)}
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