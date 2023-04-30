import { useEffect, useRef, useState } from "react"
import ChartContainer from "../chartsComponents/ChartContainer"
import Card from "../components/Card"
import { useDataContext } from "../App"
import * as d3 from "d3"
import Circle from "../chartsComponents/Circle"
import Axis from "../chartsComponents/Axis"

export default function ScatterplotD3Controlled({ margin }) {
  const width = 300
  const height = 245
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const scatterplotRef = useRef(null)
  const ctx = useDataContext()

  const data = ctx.data.experience
  const { colorScale } = ctx

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.user_count)])
    .range([0, innerWidth])
    .nice()

  const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])

  return (
    <Card>
      <h2>Retention vs Usage</h2>
      <ChartContainer width={width} height={height} margin={margin}>
        <g ref={scatterplotRef}>
          <Axis.Left
            scale={yScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            numberOfTicks={5}
          />
          {data.map((d) => {
            return (
              <Circle
                key={d.id}
                cx={xScale(d.user_count)}
                cy={yScale(d.retention_percentage)}
                r={5}
                fill={colorScale(d.id)}
              />
            )
          })}
        </g>
      </ChartContainer>
    </Card>
  )
}
