import { useEffect, useRef} from "react";

// hooks
import { useShowFolderPannel } from "../../stores/NoteNavigatorStore/NoteNavigatorStore";
import useQueryOrCreateNoteDirectory from "./hooks/useQueryOrCreateNoteDirectory";
import useCreateFolder from "./hooks/folder/useCreateFolder";

// util
import { get_svg_icons } from "../../util/get_svg_icons";
import type { FolderPartial, NoteDirectory } from "./util/folder_types";

// components
import PannelItem from "./parts/PannelItem";
import { TailSpin } from "react-loader-spinner";



export default function FolderPannel() {

  // hook init
  const showFolderPannel = useShowFolderPannel();
  const { data, isLoading} = useQueryOrCreateNoteDirectory()
  const createFolder = useCreateFolder()

  // helper var
  const noteDirId = useRef<number | null>(null)

  // two btns trigger
  const handleAddFolder = () => {

    if (noteDirId.current == null) {
      console.log('dir id : ', noteDirId)
      return
    }

    createFolder.mutate({
      note_directory_id : String(noteDirId.current)
    })
  }

  // hacky, but since only one note_directory should work
  useEffect(() => {
    if (isLoading) return
    if (!data[0].id) return
    noteDirId.current = data[0].id
  }, [data, noteDirId, isLoading])


  return (
    <>


      {showFolderPannel && !isLoading &&(
        <div className="folder-pannel-container">
          {/* Header */}
          <div className="note-editor-header"> {/* oops */}
            <p> Folder Navigator </p>
            <button>{get_svg_icons({ icon: "folders", size: 15 })}</button>
            <button 
              className='add-folder-btn'
              onClick={handleAddFolder}
            > 
              +
              {get_svg_icons({ icon: "folder-open", size: 15 })}
            </button>
          </div>

          {/* Body */}
          <div className="folder-pannel-body">

            {data &&
              data.map((noteDirectory: NoteDirectory) => (
                noteDirectory.folders && noteDirectory.folders.length > 0 ? (
                  noteDirectory.folders.map((folder: FolderPartial) => (
                    <PannelItem
                      note_directory_id={noteDirectory.id}
                      key={folder.id}
                      name={folder.name}
                      id={folder.id}
                      notes={folder.notes}
                    />
                  ))
                ) : (
                  <div 
                  className="no-folder-container"
                  >
                    <p>No Folders Found</p>
                    <button
                      key={`no-folder-add-btn-${noteDirectory.id}`} 
                      onClick={() => handleAddFolder()}
                    >
                      +
                    </button>
                  </div>
                )
              ))
            }
          </div>
        </div>
      )}

      {isLoading &&
          <div className="folder-pannel-container">
            {/* Header */}
            <div className="note-editor-header"> {/* oops */}
              <p> Folder Navigator </p>
              <button>{get_svg_icons({ icon: "folders", size: 15 })}</button>
            </div>

            {/* Body */}
            <div className="folder-pannel-body"
              style={{alignItems : 'center', justifyContent: 'center'}} 
            >
                <TailSpin 
                height="40"
                width="40"
                color="#2967c4ff"
                ariaLabel="tail-spin-loading"
                visible={isLoading}
                />

            </div>
          </div>


      
      }


    </>
  );
}
