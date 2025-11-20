import { useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import type {Layout} from 'react-grid-layout'

// meta store hooks 
// import {useGetMetaElements} from '../../../cross-platform/stores/MetaFactory/MetaFactory'
// import type {ElementMeta} from '../../../cross-platform/stores/MetaFactory/MetaFactory'

// hooks
import useQueryGrid from '../hooks/useQueryGrid.tsx';
import useQueryLayout from '../hooks/useQueryLayout.tsx';
import useDesktopHandleOnDrop from './hooks/useDesktopHandleOnDrop.tsx';
import { useSetGridId } from '../../stores/ProjectAndFolderStore/ProjectAndFolderStore.tsx';
// import useHandleLayoutChange from '../../../cross-platform/workspace-components/Editor/Grid/hooks/useHandleLayoutChange.tsx'

// util
import {gridLayoutProps} from '../util/gridLayoutProps.ts'

// components
import GridItemDesktop from './GridItemDesktop/GridItemDesktop.tsx'

export default function GridDesktop() {

    // hooks init
    const setGridId = useSetGridId()
    
    const {data : gridData}= useQueryGrid()
    const {data : layoutData} = useQueryLayout()

    // set grid ID in context
    useEffect(() => {
        setGridId(gridData.id)
    }, [gridData, setGridId])

    // const layout = useDesktopLayout()
    // const handleLayoutChange = useHandleLayoutChange()
    // const {handleOnDropElementCreation} = useGridListeners()
    // const metaElements = useGetMetaElements()

    // const handleLayoutChangeTrigger = (newLayout : Layout[]) => {
    //     handleLayoutChange({newLayout : newLayout, oldLayout : layout})
    // }

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
                onDrop={useDesktopHandleOnDrop} 
                // onDrop={handleOnDropElementCreation}
                // onLayoutChange={handleLayoutChangeTrigger}
            > 
                {/* {metaElements.map((metaElement: ElementMeta) => (
                    <div key={metaElement.id}>
                        <GridItemDesktop metaElement={metaElement} />
                    </div>
                ))} */}
                <div key='123'>
                    <GridItemDesktop />
                </div>

            </GridLayout>
        </div>

    )
    

}