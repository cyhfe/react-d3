import { useEffect, useRef } from "react"
import ChartContainer from "../chartsComponents/ChartContainer"
import Card from "../components/Card"
import { useDataContext } from "../App"
export default function ScatterplotD3Controlled({ margin }) {
  const width = 300
  const height = 245
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const scatterplotRef = useRef(null)
  const data = useDataContext()

  useEffect(() => {
    console.log(data)
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
