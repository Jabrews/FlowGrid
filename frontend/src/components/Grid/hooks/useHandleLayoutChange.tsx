import type { Layout } from '../util/types';

// meta elements store hooks
import useMutateLayout from './useMutateLayout';

type UseHandleLayoutChangeArguments = {
  newLayout: Layout[];
  oldLayout: Layout[];
};

export default function useHandleLayoutChange() {
  const mutateLayout = useMutateLayout();
  
  const handleLayoutChange = ({ newLayout, oldLayout }: UseHandleLayoutChangeArguments) => {
    
    newLayout.forEach((newItem) => {
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

  return handleLayoutChange;
}

