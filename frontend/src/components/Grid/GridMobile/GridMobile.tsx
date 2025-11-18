import GridLayout from 'react-grid-layout'
import type {Layout} from 'react-grid-layout'

// hooks
import useQueryGrid from "../hooks/useQueryGrid"

// util
import type { Grid } from "../util/types"
import { gridLayoutProps } from '../util/gridLayoutProps'

// components
import GridItemMobile from './GridItemMobile/GridItemMobile'

export default function GridMobile() {

    // hook init
    const {data : Grid}= useQueryGrid()
    console.log('grid data : ', Grid)

    //layout **eventually seperate into seperate hook 
    const layout : Layout[] = [{
        i: 'id',
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        static: false,
        isResizable: false,
    }]

    return (
        <div 
        className='grid-container grid-desktop'
        >
            <GridLayout
                {...gridLayoutProps}
                layout={layout}
                // onDrop={handleOnDropElementCreation}
                // onLayoutChange={handleLayoutChangeTrigger}
            > 
                <div key='123'>
                    <GridItemMobile />
                </div>

                 {/* {metaElements.map((metaElement: ElementMeta) => (
                    <div key={metaElement.id}>
                        <GridItemDesktop metaElement={metaElement} />
                    </div>
                ))} */}
 
            </GridLayout>
        </div>
    )

}