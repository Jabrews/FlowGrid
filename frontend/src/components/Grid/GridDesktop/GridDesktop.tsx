import { useEffect } from 'react';
import GridLayout from 'react-grid-layout';

// meta store hooks 
// import {useGetMetaElements} from '../../../cross-platform/stores/MetaFactory/MetaFactory'
// import type {ElementMeta} from '../../../cross-platform/stores/MetaFactory/MetaFactory'

// hooks
import useQueryGrid from '../hooks/useQueryGrid.tsx';
import useQueryLayout from '../hooks/useQueryLayout.tsx';
import useDesktopHandleOnDrop from './hooks/useDesktopHandleOnDrop.tsx';
import { useSetGridId } from '../../stores/ProjectAndFolderStore/ProjectAndFolderStore.tsx';
import useHandleLayoutChange from '../hooks/useHandleLayoutChange.tsx';

// util
import {gridLayoutProps} from '../util/gridLayoutProps.ts'
import type { Layout } from '../util/types.ts';

// components
import GridItemDesktop from './GridItemDesktop/GridItemDesktop.tsx'

export default function GridDesktop() {

    // hooks init
    const setGridId = useSetGridId()
    const desktopHandleOnDrop = useDesktopHandleOnDrop()
    const handleLayoutChange = useHandleLayoutChange() // in helper func
    
    const {data : gridData}= useQueryGrid()
    const {data : layoutData} = useQueryLayout()

    // set grid ID in context
    useEffect(() => {
        if (gridData == undefined) return
        setGridId(String(gridData.id))
    }, [gridData, setGridId])




    // helper function`
    const handleLayoutChangeTrigger = (newLayout : Layout[]) => {
        if (layoutData == undefined) {
            return
        }
        handleLayoutChange({newLayout : newLayout, oldLayout : layoutData})
    }

    return (
        <div 
        className='grid-container grid-desktop'
        >

            {!layoutData && !gridData &&
                (<p> Loading </p>)
            }

            <GridLayout
                {...gridLayoutProps}
                layout={layoutData}
                onDrop={desktopHandleOnDrop} 
                onLayoutChange={handleLayoutChangeTrigger}
            > 
                    {layoutData?.map((layoutItem : Layout) => (
                        <div key={layoutItem.i}>
                            <GridItemDesktop layout={layoutItem}/>                        
                        </div>
                    ))}


            </GridLayout>
        </div>

    )
    

}