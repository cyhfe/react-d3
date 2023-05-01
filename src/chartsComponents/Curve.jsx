import * as d3 from "d3"
function Curve({ data, xScale, yScale, xAccessor, yAccessor, ...rest }) {
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d[xAccessor]))
    .y((d) => yScale(d[yAccessor]))
    .defined((d) => d[yAccessor] !== null)
    .curve(d3.curveMonotoneX)
  return <path d={lineGenerator(data)} fill="none" {...rest} />
}

export default Curve
