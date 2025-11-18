import { motion } from 'framer-motion'

// hooks
import { useToggleCloseAllDropperTables } from '../../stores/SideDropperStore/SideDropperStore'


export default function DropperButtons() {

  // hook init
  const toggleCloseAllDropperTables = useToggleCloseAllDropperTables()


  const handleCloseAllBtn = () => {
    toggleCloseAllDropperTables(true)
  }


  return (
    <div className='side-dropper-content-buttons-container'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.55 }}
        className='close-all-btn'
        onClick={handleCloseAllBtn}
      >
        Close All
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.55 }}
        className='workshop-btn'
      >
        Workshop
      </motion.button>
    </div>
  )
}
