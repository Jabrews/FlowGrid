import { useEffect, useState} from 'react'
import GridLayout from 'react-grid-layout'
import type { Layout } from '../util/types'

// hooks
import useQueryGrid from "../hooks/useQueryGrid"
import { useSetGridId } from '../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import useQueryLayout from '../hooks/useQueryLayout'
// hooks pertaining to 2nd layout
import { useLayout } from '../../stores/ItemPreviewStore/ItemPreviewStore'
import { useSetLayout } from '../../stores/ItemPreviewStore/ItemPreviewStore'
import { useItemPreviewEventActive } from '../../stores/ItemPreviewStore/ItemPreviewStore' 
import useMobileHandleLayoutChange from './hooks/useMobileHandleLayoutChange'

// util
import { gridLayoutProps } from '../util/gridLayoutProps'

// components
import GridItemMobile from './GridItemMobile/GridItemMobile'

export default function GridMobile() {

    const [hasUpdated, toggleHasUpdated] = useState(false)    

    // hook init
    const setGridId = useSetGridId()
    const layout = useLayout()
    const setLayout = useSetLayout()
    const itemPreviewEventActive = useItemPreviewEventActive()
    const mobileHandleLayoutChange = useMobileHandleLayoutChange()

    // queries
    const {data : gridData}= useQueryGrid()
    const {data : layoutData} = useQueryLayout()
    // kinda hacky but layout on mobile has to be in store, for item preview

    // set grid ID in context
    useEffect(() => {
        if (gridData == undefined) return
        setGridId(String(gridData.id))
    }, [gridData, setGridId])


    useEffect(() => {
        if (!itemPreviewEventActive) {
            toggleHasUpdated(false)
        }
        // bit hacky but prevents updating
        else if (!hasUpdated){
            setLayout(layoutData)
            toggleHasUpdated(true)
        }
    },[setLayout, layoutData, itemPreviewEventActive, hasUpdated])



    // helper function
    const handleLayoutChangeTrigger = (newLayout : Layout[]) => {
        if (layoutData == undefined) {
            return
        }
        mobileHandleLayoutChange({newLayout : newLayout, oldLayout : !itemPreviewEventActive ? layoutData : layout})
    }

    const items = itemPreviewEventActive ? layout : layoutData;


    return (
        <div 
        className='grid-container grid-mobile'
        >

            {!layoutData && !gridData  &&
                (<p> Loading </p>)
            }


            <GridLayout
                {...gridLayoutProps}
                layout={!itemPreviewEventActive ? layoutData : layout }
                onLayoutChange={handleLayoutChangeTrigger}
            > 
                {items?.map((layoutItem: Layout) => (
                    <div key={layoutItem.i}>
                        <GridItemMobile layout={layoutItem} />
                    </div>
                ))}
            </GridLayout>
        </div>
    )

}