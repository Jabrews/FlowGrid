// hooks
import useQueryAllTrackObjs from "./hooks/useQueryAllTrackObjs";
import { usePauseRender } from "../stores/LineRendererStore/LineRendererStore";

// util
import type { TrackObj } from "../Grid/GridItemHeader/util/track_obj_type";

// components
import { Line } from "./Line/Line";

type LineRendererProps = {
    containerRef: React.RefObject<HTMLElement | null>;


}


export default function LineRenderer({ containerRef }: LineRendererProps) {
  const { data } = useQueryAllTrackObjs();
  const pauseRender = usePauseRender(); 


  if (pauseRender) return null; 

  return (
    <>
      {data?.map((item: TrackObj) => (
        <Line
          key={`line-${item.id}`}
          containerRef={containerRef}
          startId={item.gridItemI}
          endId={item.trackerI}
        />
      ))}
    </>
  );
}

