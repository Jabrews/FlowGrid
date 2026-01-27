import { useRef } from "react"

// hooks
import { useToggleShowTutorialModal } from "../../../stores/ModalRendererStore/ModelRendererStore"

// utill
import { get_svg_icons } from "../../../util/get_svg_icons"

// images
import SideDropper1 from '../../../../assets/side-dropper-1.png'
import SideDropper2 from '../../../../assets/side-dropper-2.png'
import SideDropperVid1 from '../../../../assets/side-dropper-vid-1.mp4'
import SideDropperVid2 from '../../../../assets/side-dropper-vid-3.mp4'
import Timer1 from '../../../../assets/timer1.png'
import Timer2 from '../../../../assets/timer2.png'
import Tracker1 from '../../../../assets/tracker1.png'
import Sticky1 from '../../../../assets/sticky-1.png'
import Table1 from '../../../../assets/table-1.png'
import NoteNav1 from '../../../../assets/note-nav-1.png'
import NoteNav2 from '../../../../assets/note-nav-2.png'
import NoteNav3 from '../../../../assets/note-nav-1.mp4'




export default function TutorialModal() {

    const modalRef = useRef<HTMLDivElement | null>(null)
    const sideDropperRef = useRef<HTMLDivElement | null>(null)
    const gridItemsRef = useRef<HTMLDivElement | null>(null)
    const noteNavigatorRef = useRef<HTMLDivElement | null>(null)


    // hook init
    const toggleShowTutorialModal = useToggleShowTutorialModal()

    const scrollToTarget = (targetRef : React.RefObject<HTMLDivElement | null>) => {
        if (targetRef.current == null) return
        targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
        
    };



    return (

        <div className='center-modal'>
            <div className='tutorial-modal' ref={modalRef}>
                <div className='modal-header'> 
                    <p> Tutorial : </p>
                    <button 
                        onClick={() => toggleShowTutorialModal(false)} 
                    > 
                        {get_svg_icons({icon : 'Folder-Close' , size : 40})}
                    </button>

                </div>
                {/* Table of Content */}
                <div className='table-of-cont'>
                    <h1> Table Of Contents : </h1>
                    <div className='section-container'>
                        <p onClick={() => {scrollToTarget(sideDropperRef)}}> Side Dropper </p>
                        <p onClick={() => {scrollToTarget(gridItemsRef)}}> Grid Item Guide </p>
                        <p onClick={() => {scrollToTarget(noteNavigatorRef)}}> Note Navigator + Markdown Guide</p>
                    </div>
                {/* SIDE DROPPEr */}
                <div className="side-dropper" ref={sideDropperRef}>
                    <h1> Side Dropper : </h1>
                    <p style={{marginBottom:'1em'}}> found in the following spots (desktop/mobile) </p>
                    <div className='images-1'> 
                        <img src={SideDropper1}/>                
                        <img src={SideDropper2}/>                
                    </div>
                    <div className='open-place'>
                        <p style={{marginBottom:'1em'}}> Open up side dropper by clicking the icon.</p>
                        <p className='label'> Desktop : add items by dragging and dropping. </p>
                        <video muted loop playsInline controls>
                            <source src={SideDropperVid1} type="video/mp4"/>
                        </video>
                        <p className='label' style={{marginTop : '2em'}}> Mobile : add items by clicking and pressing the confirm btn.</p>
                        <video muted loop playsInline controls>
                            <source src={SideDropperVid2} type="video/mp4"/>
                        </video>
                    </div>
                    <h3 style={{marginTop : '1em'}}> Grid Item Properties : </h3>
                     <p> Delete Items by hovering and pressing "X"</p>
                    <p> Move Items by clicking and dragging the handle "::"</p>
                </div>
                </div>
                {/* Grid items */}
                <div className="grid-items " ref={gridItemsRef}>
                        <h1> Grid Items : </h1>
                        <div className='item-container'>
                            <h2> Timer </h2>
                            <img src={Timer1}/>
                            <p> simply switch bewteen timer modes using the topmost tab buttons. </p>
                            <h4 style={{marginTop : '0.5em'}}> Note : </h4>
                            <p> this item can be tracked using the Tracker item (next in list). </p>
                            <p> Simply drag and drop the timers input icon (bottom blue circle) <br/> Onto the trackers output icon (red). </p>
                            <img src={Timer2}/>
                        </div>

                        <hr />

                        <div className='item-container'>
                            <h2> Tracker </h2>
                            <img src={Tracker1}/>
                            <p> Control extra fields on trackable grid item (just the timer right now!).</p>

                                <p style={{marginTop: '1em'}}> drag a trackable item's input circle onto the trackers </p>
                                <p> to initate a linking event.</p>

                            <div className='section-1'>
                                {get_svg_icons({icon : 'unplug', size : 24})}
                                <p> Click on the output icon to dissconnect connected icons. </p>
                            </div>
                        </div>                

                        <hr />

                        <div className='item-container'>
                            <h2> Sticky Note </h2>
                            <img src={Sticky1}/>
                            <p> Contains decorated rows of text for notes and task tracking. </p>
                            <h3 style={{marginTop:'1em'}}> using top bar : </h3>
                            <p > add note "+", <br/> navigate through notes {"'<>'"} <br/> delete note "x" </p>
                        </div>                

                        <hr />

                        <div className='item-container'>
                            <h2> Table </h2>
                            <img src={Table1}/>
                            <p > Use rows and columns to keep track of data and info.</p>
                            <p style={{marginTop : '1em'}}> - Add by clicking plus sign btn on either row or column</p>
                            <p> - Delete row and column by clicking x. </p>
                            
                        </div>                
                    </div>
                
                {/* NOTE NAV*/}
                <div className='note-navigator' ref={noteNavigatorRef}>
                    <h1> Note Navigator : </h1>
                    <img src={NoteNav1}/>
                    <p> Open by pressing the above btn. located in the top right </p>

                    <div className='folder-section'>
                        {/* Folder pannel */}
                        <h1> Folder Pannel : </h1>
                        <img src={NoteNav2} />
                        <p style={{marginTop : '1em'}}> 
                            to create folder press 
                            + 
                            { get_svg_icons({ icon: "folder-open", size: 15 })}
                             (located on folder nav. header).
                        </p>
                        <h3 style={{marginTop: '1em'}}> For both folder & note </h3>
                        <p>
                        'X' : delete
                        </p>
                        <p>
                        '{get_svg_icons({ icon: "Change-Input", size: 12 })}' : rename
                        </p>

                        {/* Note pannel */}
                        <h1> Note Pannel & Markup : </h1>
                            <video muted loop playsInline controls className='vid-1'>
                                <source src={NoteNav3} type="video/mp4"/>
                            </video>

                            <div className='markdown-container'>
                                <h3 style={{marginTop :  '1em'}}> Markdown : </h3>

                                <div className='markdown-item'>
                                    <h4> Type </h4>     
                                    <h4> Button </h4>     
                                    <h4> Markdown </h4>
                                    <h4> Effect </h4> 
                                </div>
                                <div className='markdown-item'>
                                    <p>Highlight</p>
                                    <p>{get_svg_icons({ icon: 'highlight', size: 24 })}</p>
                                    <p>== ==</p>
                                    <p className='highlight'>sample</p>
                                </div>     
                                <div className='markdown-item'>
                                    <p>Bold</p>
                                    <p>{get_svg_icons({ icon: 'bold', size: 24 })}</p>
                                    <p>** **</p>
                                    <p className='bold'>sample</p>
                                </div>     
                                <div className='markdown-item'>
                                    <p>Italic</p>
                                    <p>{get_svg_icons({ icon: 'italic', size: 24 })}</p>
                                    <p>"" ""</p>
                                    <p className='italic'>sample</p>
                                </div>     
                                <div className='markdown-item'>
                                    <p>Header</p>
                                    <p>{get_svg_icons({ icon: 'highlight', size: 24 })}</p>
                                    <p>#/##/###</p>
                                    <p className='header'>sample</p>
                                </div>     

                                <h3 style={{marginTop :  '1em'}}> Indent : </h3>
                                <div className='indent-container' >
                                    <p> indent foward </p>
                                    <p> 'tab' </p>
                                    <p> {get_svg_icons({ icon: 'indent-right', size: 24 })}</p>
                                </div>
                                <div className='indent-container' >
                                    <p> indent back </p>
                                    <p> 'shift + tab' </p>
                                    <p> {get_svg_icons({ icon: 'indent-left', size: 24 })}</p>
                                </div>

                            </div> 


                    </div>
                </div>
            </div>
        </div>
    )

}