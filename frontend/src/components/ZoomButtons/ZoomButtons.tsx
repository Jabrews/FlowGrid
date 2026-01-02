import { useRef } from 'react';
import {motion} from 'framer-motion'

// utill
import { get_svg_icons } from "../util/get_svg_icons" 

type ZoomButtonsProps = {
    gridRef: React.RefObject<HTMLDivElement | null>;
}

export default function ZoomButtons({gridRef}: ZoomButtonsProps) {

    const scaleRef = useRef(1)    

    const handleZoomFoward = () => {
        if (!gridRef.current) return
        scaleRef.current += 0.2;
        gridRef.current.style.transform = `scale(${scaleRef.current})`;

    }


    const handleZoomBack = () => {
        if (!gridRef.current) return

        if (scaleRef.current <= 0.5) return

        scaleRef.current -= 0.2;
        gridRef.current.style.transform = `scale(${scaleRef.current})`;

    }


    return (
        <div className='zoom-btn-container'>

            {/*  + zoom */}
            <motion.button 
                className='plus-zoom-btn'
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}            
                onClick={handleZoomFoward}
            > 
                {get_svg_icons({icon : 'zoom-in', size : 24})} 
            </motion.button>

            {/*  - zoom */}
            <motion.button 
                className='minus-zoom-btn'
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}            
                onClick={handleZoomBack}
            >
                {get_svg_icons({icon : 'zoom-out', size : 24})}
            </motion.button>
        </div>


    )


}