import * as d3 from "d3"
import { useRef, useEffect } from "react"
function Curve({ data, xScale, yScale, xAccessor, yAccessor, ...rest }) {
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d[xAccessor]))
    .y((d) => yScale(d[yAccessor]))
    .defined((d) => d[yAccessor] !== null)
    .curve(d3.curveMonotoneX)

  const pathRef = useRef()
  useEffect(() => {
    const path = pathRef.current

    d3.select(path)
      .transition()
      .duration(300)
      .ease(d3.easeCubicOut)
      .attr("d", lineGenerator(data))
  }, [data, lineGenerator])

  return <path fill="none" {...rest} ref={pathRef} />
}

export default Curve
