import type { Layout } from '../../util/types';

// hooks
import useMutateLayout from '../../hooks/useMutateLayout';
import { useItemPreviewEventActive } from '../../../stores/ItemPreviewStore/ItemPreviewStore';
import { usePreviewItemI } from '../../../stores/ItemPreviewStore/ItemPreviewStore';
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
  const previewItemI = usePreviewItemI()


  const handleLayoutChange = ({ newLayout, oldLayout }: UseHandleLayoutChangeArguments) => {

      
    // Mobile item preview 
    if (itemPreviewEventActive) {

      // find preview item inside newLayout (from RGL)
      const previewItemUpdated = newLayout.find(
        (layoutItem: Layout) => layoutItem.i === previewItemI
      );

      if (!previewItemUpdated) {
        return
      }

      const newPos = {
        x: previewItemUpdated.x,
        y: previewItemUpdated.y,
      };

      const mobileLayout = layout.map((layoutItem: Layout) => {
        if (layoutItem.i === previewItemI) {
          return {
            ...layoutItem,
            x: newPos.x,
            y: newPos.y,
            static: false,     
          };
        }

        return {
          ...layoutItem,
          static: layoutItem.isMobileItemPreview ? layoutItem.static : true,
        };
      });

      setLayout(mobileLayout);
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

