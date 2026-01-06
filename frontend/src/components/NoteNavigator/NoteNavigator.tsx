import {motion} from 'framer-motion'

// hooks
import { useShowNavMenu } from "../stores/NoteNavigatorStore/NoteNavigatorStore" 

// components
import NavHeaderDesktop from "./Headers/NavHeaderDesktop"
import NavHeaderMobile from "./Headers/NavHeaderMobile"
import FolderPannel from './FolderPannel/FolderPannel'
import NoteEditor from './NoteEditor/NoteEditor'

type NoteNavigatorProps = {
    isMobile : boolean,
}

export default function NoteNavigator({ isMobile }: NoteNavigatorProps) {

  const showNavMenu = useShowNavMenu();

  return (
    <div className="note-nav-container">
      <div className={`note-nav-header ${showNavMenu ? "active" : ""}`}>
        {isMobile ? <NavHeaderMobile /> : <NavHeaderDesktop />}
      </div>

      {showNavMenu && (
        <div className="note-nav-body">
            <FolderPannel />
            <NoteEditor />
         </div>
      )}
    </div>
  );
}