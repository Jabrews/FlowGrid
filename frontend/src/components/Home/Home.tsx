import { useState } from "react"

import image from '../../assets/example.png'

// components
import FolderNavigator from "./Parts/FolderNavigator"


export default function Home() {
    const [selected, setSelected] = useState('')

    const handleFolderSelect = (id: string) => {
        setSelected(id)
    }

    return (
        <div className='home-container'>
            <FolderNavigator 
                selected={selected}
                onSelect={handleFolderSelect}
            />
            <div className='project-menu'>
                <div className='project-container active-project'>
                    <img src={image}/>
                    <h1> Example Project</h1>
                    <p> 1/1/2009</p>
                </div>
                <div className='project-container'>
                    <img src={image}/>
                    <h1> Example Project 2</h1>
                    <p> 1/1/200339</p>
                </div>
            </div>
        </div>
    )
}