import { useRef } from "react";

// hooks
import useIsMobileScreen from "../hooks/useIsMobileScreen"; 
import { useEditorScrollEventActive } from "./hooks/useEdgeScrollStore";
import { useEditorEdgeDraggingStore } from "./hooks/useEditorEdgeDraggingScroll";
import useMiddleWheelPan from "./hooks/useMiddleWheelPan";

// components 
import GridMobile from "../Grid/GridMobile/GridMobile";
import GridDesktop from "../Grid/GridDesktop/GridDesktop";
import Navbar from "../Navbar/Navbar";
import SideDropperMobile from "../SideDropper/SideDropperMobile/SideDropperMobile";
import SideDropperDesktop from "../SideDropper/SideDropperDesktop/SideDropperDesktop";
import ModalRenderer from "../ModalRenderer/ModalRenderer";

export default function WorkSpace() {

    // ------------------ NEEED ------------------- //
    // - item preview logic
    // - mobile scroll on item preview active to middle  


    // hook init
    const isMobileScreen = useIsMobileScreen()
    const editorScrollEventActive = useEditorScrollEventActive()

    // refs
    const editorRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

    // MOVEMENT STUFF //
    useEditorEdgeDraggingStore({editorScrollEventActive, editorRef});
    // desktop 
    useMiddleWheelPan({ editorRef, cursorRef, isMobileScreen, speed: 1, useRafThrottle: true });

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