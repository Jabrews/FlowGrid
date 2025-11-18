export const GRID_COLS = 24;
export const GRID_WIDTH = 2500;
export const GRID_ROW_HEIGHT = 100;

export const gridLayoutStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '100%',
  minHeight: '100%',
};

export const gridLayoutProps = {
  cols: GRID_COLS,
  rowHeight: GRID_ROW_HEIGHT,
  width: GRID_WIDTH,
  compactType: null,
  preventCollision: false,
  isDroppable: true,
  draggableHandle: '.drag-handle',
  style: gridLayoutStyle,
};
