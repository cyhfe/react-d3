interface Margin {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface ChartContainerProps extends React.ComponentPropsWithoutRef<"svg"> {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  viewWidth?: number;
  viewHeight?: number;
  margin?: Margin;
}

function Svg({
  children,
  width,
  height,
  viewWidth,
  viewHeight,
  margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  ...rest
}: ChartContainerProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0, 0, ${viewWidth}, ${viewHeight}`}
      {...rest}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>{children}</g>
    </svg>
  );
}

export { Svg };
