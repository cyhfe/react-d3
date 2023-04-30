import { useEffect, useRef, useState } from "react"
import ChartContainer from "../chartsComponents/ChartContainer"
import Card from "../components/Card"
import { useDataContext } from "../App"
import * as d3 from "d3"
export default function ScatterplotD3Controlled({ margin }) {
  const width = 300
  const height = 245
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const scatterplotRef = useRef(null)
  const ctx = useDataContext()

  const data = ctx.data.experience
  const { colorScale } = ctx

  useEffect(() => {
    console.log(data)
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.user_count)])
      .range([0, innerWidth])
      .nice()

    const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])

    const scatterplot = d3.select(scatterplotRef.current)

    scatterplot
      .selectAll(".circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.user_count))
      .attr("cy", (d) => yScale(d.retention_percentage))
      .attr("r", 5)
      .attr("fill", (d) => colorScale(d.id))
    const leftAxis = d3.axisLeft(yScale).ticks([5])

    const bottomAxis = d3
      .axisBottom(xScale)
      .ticks([3])
      .tickFormat(d3.format("d"))

    scatterplot.append("g").call(leftAxis)
    scatterplot
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)
  }, [data])

  return (
    <Card>
      <h2>Retention vs Usage</h2>

      <ChartContainer width={width} height={height} margin={margin}>
        <g ref={scatterplotRef}></g>
      </ChartContainer>
    </Card>
  )
}
