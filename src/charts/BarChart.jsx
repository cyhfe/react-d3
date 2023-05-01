import { useDataContext } from "../App"
import * as d3 from "d3"
import ChartContainer from "../chartsComponents/ChartContainer"
import Card from "../components/Card"
import Axis from "../chartsComponents/Axis"

export default function BarChart({ margin }) {
  const width = 300
  const height = 245
  const marginBottom = 85

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - marginBottom
  const ctx = useDataContext()
  const colorScale = ctx.colorScale
  const data = []
  ctx.data.experience.forEach((d) => {
    const awareness = {
      id: d.id,
      name: d.name,
      awareness_percentage:
        d.awareness[d.awareness.length - 1].percentage_question,
    }
    data.push(awareness)
  })

  data.sort((a, b) => b.awareness_percentage - a.awareness_percentage)

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, innerWidth])
    .padding(0.2)

  const yScale = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0])

  return (
    <Card>
      <h2>Awareness</h2>

      <ChartContainer width={width} height={height} margin={margin}>
        <g>
          <Axis.Left
            scale={yScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            numberOfTicks={5}
            label={"Awareness %"}
          />
          <Axis.BandBottom
            scale={xScale}
            ticks={data.map((d) => d.name)}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
          {data.map((d) => {
            return (
              <rect
                key={d.id}
                x={xScale(d.name)}
                y={yScale(d.awareness_percentage)}
                width={xScale.bandwidth()}
                height={innerHeight - yScale(d.awareness_percentage)}
                fill={colorScale(d.id)}
              />
            )
          })}
        </g>
      </ChartContainer>
    </Card>
  )
}
