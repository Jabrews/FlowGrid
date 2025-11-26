import { useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import type { Layout } from '../util/types'

// hooks
import useQueryGrid from "../hooks/useQueryGrid"
import { useSetGridId } from '../../stores/ProjectAndFolderStore/ProjectAndFolderStore'
import useQueryLayout from '../hooks/useQueryLayout'
import useMobileHandleOnDrop from './hooks/useMobileHandleOnDrop'

// util
import { gridLayoutProps } from '../util/gridLayoutProps'

// components
import GridItemMobile from './GridItemMobile/GridItemMobile'

export default function GridMobile() {

    // hook init
    const setGridId = useSetGridId()
    const handleOnDropElementCreation = useMobileHandleOnDrop()

    // queries
    const {data : gridData}= useQueryGrid()
    const {data : layoutData} = useQueryLayout()

    // set grid ID in context
    useEffect(() => {
        if (gridData == undefined) return
        setGridId(String(gridData.id))
    }, [gridData, setGridId])

    return (
        <div 
        className='grid-container grid-mobile'
        >

            {!layoutData && !gridData &&
                (<p> Loading </p>)
            }

            <GridLayout
                {...gridLayoutProps}
                layout={layoutData}
                onDrop={handleOnDropElementCreation}
                // onLayoutChange={handleLayoutChangeTrigger}
            > 
                {layoutData.map((layoutItem : Layout) => 
                    <div key={layoutItem.i}>
                        <GridItemMobile layout={layoutItem}/>
                    </div>
                )}
            </GridLayout>
        </div>
    )

}