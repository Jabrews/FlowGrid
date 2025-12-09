import { useRef} from "react";

// hooks
import useIsMobileScreen from "../hooks/useIsMobileScreen"; 
import { useEditorScrollEventActive } from "./hooks/useEdgeScrollStore";
import { useEditorEdgeDraggingStore } from "./hooks/useEditorEdgeDraggingScroll";
import useMiddleWheelPan from "./hooks/useMiddleWheelPan";
import { useItemPreviewEventActive } from "../stores/ItemPreviewStore/ItemPreviewStore";
import useScrollOnPreviewActive from "./hooks/useScrollOnPreviewActive";

// components 
import GridMobile from "../Grid/GridMobile/GridMobile";
import GridDesktop from "../Grid/GridDesktop/GridDesktop";
import Navbar from "../Navbar/Navbar";
import SideDropperMobile from "../SideDropper/SideDropperMobile/SideDropperMobile";
import SideDropperDesktop from "../SideDropper/SideDropperDesktop/SideDropperDesktop";
import ModalRenderer from "../ModalRenderer/ModalRenderer";
import ItemPreviewBtns from "../ItemPreviewBtns/ItemPreviewBtns";


/// NOTE ////
// inside this is the dnd context for input and output trackers
/////////////


export default function WorkSpace() {


    // hook init
    const isMobileScreen = useIsMobileScreen()
    const editorScrollEventActive = useEditorScrollEventActive()
    const itemPreviewEventActive = useItemPreviewEventActive() // mobile only



    // refs
    const editorRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    // MOVEMENT STUFF //
    useEditorEdgeDraggingStore({editorScrollEventActive, editorRef});

    // desktop 
    useMiddleWheelPan({ editorRef, cursorRef, isMobileScreen, speed: 1, useRafThrottle: true });

    // only runs on mobile
    useScrollOnPreviewActive({
        isMobile : isMobileScreen,
        isActive: itemPreviewEventActive,
        scrollTargetRef: editorRef,
        scrollTo: { top: 650, left: 1000 },
    })

    return (
        <div 
            className='workspace-container'
            ref={editorRef}
        >

            {/* All */}
            <Navbar />
            <ModalRenderer />

            {/* mobile */}
            {isMobileScreen &&
            <>
                <ItemPreviewBtns />
                <GridMobile />
                <SideDropperMobile />
            </>
            }

            {/* desktop*/}
            {!isMobileScreen &&
            <>
                <GridDesktop />
                <SideDropperDesktop />
            </>
            }
        </div>
    )




}