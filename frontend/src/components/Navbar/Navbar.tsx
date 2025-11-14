import { useState } from "react"
import { motion } from "framer-motion"
import { get_svg_icons } from "../util/get_svg_icons"

export default function Navbar() {

    const [settingsMenuOpen, toggleSettingsMenuOpen] = useState(false)
    const [accountMenuOpen, toggleAccountMenuOpen] = useState(false)

    return (
        <div className='navbar'>
            
            <div className='navbar-left'>
                <p>FlowGrid / Folder / Project</p>
            </div>

            <div></div> {/* blank center */}

            <div className='navbar-right'>

                {/* ------------------ ACCOUNT  ------------------ */}
                <motion.div
                    className={`user ${accountMenuOpen ? "active" : ""}`}
                    onClick={() => toggleAccountMenuOpen(prev => !prev)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {get_svg_icons({ icon: "User-Logo", size: 24 })}
                    <div className="user-menu" style={{ display: accountMenuOpen ? "block" : "none" }}>
                        <p>user: user</p>
                        <p>logout</p>
                    </div>
                </motion.div>

                {/* ------------------ Settings  ------------------ */}
                <motion.div
                    className={`settings ${settingsMenuOpen ? "active" : ""}`}
                    onClick={() => toggleSettingsMenuOpen(prev => !prev)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {get_svg_icons({ icon: "Settings", size: 24 })}
                    <div className="settings-menu" style={{ display: settingsMenuOpen ? "block" : "none" }}>
                        <p>theme</p>
                        <p>preferences</p>
                        <p>shortcuts</p>
                    </div>
                </motion.div>


            </div>
        </div>
    )
}
