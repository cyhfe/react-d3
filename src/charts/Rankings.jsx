import React from "react"
import Card from "../components/Card"
import ChartContainer from "../chartsComponents/ChartContainer"
import * as d3 from "d3"
import Curve from "../chartsComponents/Curve"
import { useDataContext } from "../App"

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
]

export default function Rankings({ margin }) {
  const width = 1000
  const height = 550
  const marginRight = 150
  const marginLeft = 110
  const innerWidth = width - marginLeft - marginRight
  const innerHeight = height - margin.top - margin.bottom

  const { data, colorScale } = useDataContext()
  const [activeFilter, setActiveFilter] = React.useState("satisfaction")

  console.log(data)

  const xScale = d3.scalePoint().domain(data.years).range([0, innerWidth])
  const yScale = d3
    .scalePoint()
    .domain(d3.range(1, data.ids.length + 1))
    .range([0, innerHeight])

  return (
    <Card>
      <h2>Rankings</h2>
      <ChartContainer width={width} height={height} margin={margin}>
        {data.experience.map((d) => {
          return (
            <Curve
              key={d.id}
              data={d[activeFilter]}
              xScale={xScale}
              yScale={yScale}
              xAccessor={"year"}
              yAccessor={"rank"}
              stroke={colorScale(d.id)}
              strokeWidth={5}
            />
          )
        })}
      </ChartContainer>
    </Card>
  )
}
