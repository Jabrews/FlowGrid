import { useRef} from "react";
import { DndContext, DragOverlay} from "@dnd-kit/core";

// hooks
import useIsMobileScreen from "../hooks/useIsMobileScreen"; 
import { useEditorScrollEventActive } from "./hooks/useEdgeScrollStore";
import { useEditorEdgeDraggingStore } from "./hooks/useEditorEdgeDraggingScroll";
import useMiddleWheelPan from "./hooks/useMiddleWheelPan";
import { useItemPreviewEventActive } from "../stores/ItemPreviewStore/ItemPreviewStore";
import useScrollOnPreviewActive from "./hooks/useScrollOnPreviewActive";
// hooks for dnd 
import useMutateCreateTrackObject from "./hooks/TrackObjectHooks/useMutateCreateTrackObject";

// components 
import GridMobile from "../Grid/GridMobile/GridMobile";
import GridDesktop from "../Grid/GridDesktop/GridDesktop";
import Navbar from "../Navbar/Navbar";
import SideDropperMobile from "../SideDropper/SideDropperMobile/SideDropperMobile";
import SideDropperDesktop from "../SideDropper/SideDropperDesktop/SideDropperDesktop";
import ModalRenderer from "../ModalRenderer/ModalRenderer";
import ItemPreviewBtns from "../ItemPreviewBtns/ItemPreviewBtns";
import DragOverlaySvg from "./DragOverlaySvg/DragOverlaySvg"; // look at note 


/// NOTE ////
// inside this is the dnd context for input and output trackers
/////////////


export default function WorkSpace() {


    // hook init
    const isMobileScreen = useIsMobileScreen()
    const editorScrollEventActive = useEditorScrollEventActive()
    const itemPreviewEventActive = useItemPreviewEventActive() // mobile only
    const mutateCreateTrackObj = useMutateCreateTrackObject()

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

            <DndContext
                onDragEnd={(event) => {
                    console.log('event : ', event)
                    if (event.over?.data.current?.type == 'tracker') {
                        console.log('over tracker')
                        mutateCreateTrackObj.mutate({
                            trackerI: event.over.id.toString() ,
                            gridItemI : event.active.id.toString(),
                            trackerType : event.over.data.current.type,
                            gridItemType : event.active.data.current?.parentElementType 

                        })
                    }
                 }}
            >

  
                {/* mobile */}
                {isMobileScreen &&
                <>
                    <ItemPreviewBtns />
                    <GridMobile />
                    <SideDropperMobile />
                    <DragOverlay>  <DragOverlaySvg /> </DragOverlay>

                </>
                }

                {/* desktop*/}
                {!isMobileScreen &&
                <>
                    <GridDesktop />
                    <SideDropperDesktop />
                    <DragOverlay>  <DragOverlaySvg /> </DragOverlay>
                </>
                }
            </DndContext>
        </div>
    )




}