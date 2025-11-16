import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"



// hooks
import { useActiveFolder, useSetActiveFolder } from "../stores/NavbarStore/NavbarStore"
import { useActiveProject, useSetActiveProject } from "../stores/NavbarStore/NavbarStore"
import { useUserName } from "../stores/AccountsStore/AccountsStore"
// logout hooks
import useLogout from "./hooks/useLogout" 
import { useToggleIsAuth } from "../stores/AccountsStore/AccountsStore"
import { useSetUserName } from "../stores/AccountsStore/AccountsStore"

//util
import { get_svg_icons } from "../util/get_svg_icons"

export default function Navbar() {

    const [settingsMenuOpen, toggleSettingsMenuOpen] = useState(false)
    const [accountMenuOpen, toggleAccountMenuOpen] = useState(false)

    const navigate = useNavigate()

    // hooks init
    const activeFolder = useActiveFolder()
    const activeProject = useActiveProject()
    const setActiveFolder = useSetActiveFolder()
    const setActiveProject = useSetActiveProject()
    const userName = useUserName()
    const logoutMutation = useLogout()
    const toggleIsAuth = useToggleIsAuth()
    const setUserName = useSetUserName()

    // when at home set navabar to empty on default
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/home') {
            setActiveFolder('')
            setActiveProject('')
        }
    }, [location.pathname, setActiveFolder, setActiveProject])

    const handleLogoutBtnDown = () => {
       logoutMutation.mutate() 
       toggleIsAuth(false)
       setUserName('')
    }

    return (
        <div className='navbar'>
            
            <div className='navbar-left'>
                <p  onClick={() => navigate("/home")}>
                FlowGrid
                {activeFolder && ` / ${activeFolder}`}
                {activeProject && ` / ${activeProject}`}
                </p>            
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
                        <p>user: {userName}</p>
                        <p onClick={handleLogoutBtnDown}>logout</p>
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
