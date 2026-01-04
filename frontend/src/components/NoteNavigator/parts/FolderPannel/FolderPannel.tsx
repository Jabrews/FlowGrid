// hooks
import { useShowFolderPannel } from "../../../stores/NoteNavigatorStore/NoteNavigatorStore";

// util
import { get_svg_icons } from "../../../util/get_svg_icons";

// FAKE DATA DELETE
const fakeData = [
  {name : 'folder1', id : 1, notes : 
    [
      {title : 'note1', id: 1},
      {title : 'note2', id: 2},
      {title : 'note4', id: 3},

    ]
  },
  {name : 'folder2', id : 2, notes : 
    [
      {title : 'note1', id: 1},
      {title : 'note2', id: 2},
      {title : 'note4', id: 3},

    ]
  }

]

// handlers
const handleAddFolder = () => {

}



export default function FolderPannel() {
  // hook init
  const showFolderPannel = useShowFolderPannel();

  return (
    <>
      {showFolderPannel && (
        <div className="folder-pannel-container">
          {/* Header */}
          <div className="note-editor-header"> {/* oops */}
            <p> Folder Navigator </p>
            <button>{get_svg_icons({ icon: "folders", size: 15 })}</button>
          </div>

          {/* Body */}
          <div className="folder-pannel-body">
          {fakeData.length > 0 ? (
            <div className='no-folder-container'>
              <p> No Folders Found </p>
              <button> + </button>
            </div>
          ) : (
            <p> add a new</p>
          )}



          </div>



        </div>
      )}
    </>
  );
}
