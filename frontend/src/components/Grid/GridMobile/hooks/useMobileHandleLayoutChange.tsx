import type { Layout } from '../../util/types';

// hooks
import useMutateLayout from '../../hooks/useMutateLayout';
import { useItemPreviewEventActive } from '../../../stores/ItemPreviewStore/ItemPreviewStore';
import { useLayout, useSetLayout} from '../../../stores/ItemPreviewStore/ItemPreviewStore';

type UseHandleLayoutChangeArguments = {
  newLayout: Layout[];
  oldLayout: Layout[];
};

export default function useMobileHandleLayoutChange() {
  
  // hook init
  const mutateLayout = useMutateLayout();
  const itemPreviewEventActive = useItemPreviewEventActive()
  const layout = useLayout()
  const setLayout = useSetLayout() 


  const handleLayoutChange = ({ newLayout, oldLayout }: UseHandleLayoutChangeArguments) => {

      
    // Mobile item preview 
    if (itemPreviewEventActive) {
      const newLayout = layout.map((layoutItem: Layout) => {
        // create a copy so you don't mutate 
        return {
          ...layoutItem,
          static: layoutItem.isMobileItemPreview ? layoutItem.static : true
        };
      });

      setLayout(newLayout);
    }

    else {
      newLayout.forEach((newItem) => {
  
          // NEVER update the mobile preview item
          if (newItem.isMobileItemPreview == true) {
            return
          }

          const oldItem = oldLayout.find((item) => item.i === newItem.i);
          if (!oldItem) {
              return
          };
          const hasMoved = oldItem.x !== newItem.x || oldItem.y !== newItem.y;

            if (!oldItem.id) throw new Error('Could not find layout id')

          if (hasMoved) {
              mutateLayout.mutate({
                id : oldItem.id,
                x : newItem.x,
                y : newItem.y,
                h : newItem.h,
                w : newItem.w,
              })
            }
        });
        };
      }

    return handleLayoutChange;
}

