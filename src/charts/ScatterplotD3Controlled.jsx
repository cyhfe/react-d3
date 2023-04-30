import ChartContainer from "../chartsComponents/ChartContainer"
export default function ScatterplotD3Controlled({ margin }) {
  const width = 300
  const height = 245
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  return (
    <ChartContainer
      width={width}
      height={height}
      margin={margin}
    ></ChartContainer>
  )
}
