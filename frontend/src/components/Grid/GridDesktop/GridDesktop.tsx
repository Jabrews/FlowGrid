import GridLayout from 'react-grid-layout';
import type {Layout} from 'react-grid-layout'
import {gridLayoutProps} from '../util/gridLayoutProps.ts'

// meta store hooks 
// import {useGetMetaElements} from '../../../cross-platform/stores/MetaFactory/MetaFactory'
// import type {ElementMeta} from '../../../cross-platform/stores/MetaFactory/MetaFactory'

// hooks
import useQueryGrid from '../hooks/useQueryGrid.tsx';
import useQueryLayout from '../hooks/useQueryLayout.tsx';
// import useDesktopLayout from './hooks/useDesktopLayout.tsx'
// import useGridListeners from './hooks/useGridListeners.tsx'
// import useHandleLayoutChange from '../../../cross-platform/workspace-components/Editor/Grid/hooks/useHandleLayoutChange.tsx'

// components
import GridItemDesktop from './GridItemDesktop/GridItemDesktop.tsx'

export default function GridDesktop() {

    const {data : gridData}= useQueryGrid()
    console.log(gridData)
    const {data : layoutData} = useQueryLayout()
    console.log(layoutData)



    // hooks init
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
            <GridLayout
                {...gridLayoutProps}
                layout={layoutData}
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