function ChartContainer({ width, height, margin, children }) {
  return (
    <svg viewBox={`0, 0, ${width}, ${height}`}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>{children}</g>
    </svg>
  )
}

export default ChartContainer
