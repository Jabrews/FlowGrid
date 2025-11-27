// side dropper store hooks
import { useSideOpen, useToggleSideOpen } from '../../stores/SideDropperStore/SideDropperStore'

// hooks
import { useItemPreviewEventActive } from '../../stores/ItemPreviewStore/ItemPreviewStore'

// util 
import { get_svg_icons } from '../../util/get_svg_icons'

// components (dropper-parts)
import DropperButtons from '../parts/DropperButtons'
import DroppableContainer from '../parts/DroppableContainer'

// framer-motion
import { motion, AnimatePresence } from 'framer-motion'

const slideVariants = {
  closed: { height: 0, opacity: 0, y: -8, overflow: 'hidden' as const },
  open:   { height: 'auto', opacity: 1, y: 0,  overflow: 'hidden' as const },
}

export default function SideDropperMobile() {

  // hook init
  const sideOpen = useSideOpen()
  const toggleSideOpen = useToggleSideOpen()
  const itemPreviewEventActive = useItemPreviewEventActive()

  const handleToggle = () => {
    if (itemPreviewEventActive) return
    toggleSideOpen(!sideOpen)
  }

  return (
    <div className="side-dropper-container side-dropper-container-mobile">
      <div className="side-dropper-header">
        <h1 onClick={handleToggle} role="button" aria-expanded={sideOpen}>
          {/* Button stuff FIX BELOW STUFF */}
          {/* ITEM PREVIEW STUFF */}
          {itemPreviewEventActive
            ? get_svg_icons({ icon: 'Lock', size: 34 })
            : get_svg_icons({
                icon: sideOpen ? 'Side-Dropper-Open-Mobile' : 'Side-Dropper-Close-Mobile',
                size: 34,
            })}
        </h1>
      </div>

      {/* Title slides down */}
      <AnimatePresence initial={false}>
        {sideOpen && (
          <motion.div
            key="title"
            className="side-dropper-title"
            variants={slideVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h1>Side Dropper</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content slides down after title */}
      <AnimatePresence initial={false}>
        {sideOpen && (
          <motion.div
            key="content"
            className="side-dropper-content"
            variants={slideVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1], delay: 0.02 }}
          >
            <DropperButtons />
            <DroppableContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
