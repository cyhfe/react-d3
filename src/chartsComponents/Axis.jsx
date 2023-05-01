import { css } from "@emotion/react"

const textStyle = css`
  font-size: 12px;
  fill: #374f5e;
`

function Top({ scale, innerWidth, innerHeight, label }) {}

function Bottom({ scale, innerWidth, innerHeight, label, numberOfTicks }) {
  const ticks = scale.ticks(numberOfTicks)
  return (
    <g transform={`translate(0, ${innerHeight})`}>
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={"#888b8d"} />

      {ticks.map((tick) => {
        return (
          <g key={tick} transform={`translate(${scale(tick)}, 0)`}>
            <text x={0} y={20} textAnchor="middle" css={textStyle}>
              {tick}
            </text>
            <line x1={0} y1={0} x2={0} y2={5} stroke={"#888b8d"} />
          </g>
        )
      })}
      <text
        textAnchor="middle"
        alignmentBaseline="hanging"
        x={0}
        y={0}
        transform={`translate(${innerWidth / 2}, 35)`}
        css={textStyle}
      >
        {label}
      </text>
    </g>
  )
}

function Left({ scale, innerWidth, innerHeight, label, numberOfTicks }) {
  const ticks = scale.ticks(numberOfTicks)
  return (
    <g>
      <line x1={0} y1={innerHeight} x2={0} y2={0} stroke={"#888b8d"} />

      {ticks.map((tick) => {
        return (
          <g key={tick} transform={`translate(0, ${scale(tick)})`}>
            <text
              x={-10}
              y={0}
              textAnchor="end"
              alignmentBaseline="middle"
              css={textStyle}
            >
              {tick}
            </text>
            <line x1={-5} y1={0} x2={0} y2={0} stroke={"#888b8d"} />
          </g>
        )
      })}

      <text
        textAnchor="middle"
        alignmentBaseline="baseline"
        x={0}
        y={0}
        transform={`translate(-35, ${innerHeight / 2}) rotate(-90)`}
        css={textStyle}
      >
        {label}
      </text>
    </g>
  )
}

function Right({ scale, innerWidth, innerHeight, label }) {}

function BandBottom({ scale, innerWidth, innerHeight, label, ticks }) {
  return (
    <g transform={`translate(0, ${innerHeight})`}>
      <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={"#888b8d"} />

      {ticks.map((tick) => {
        return (
          <g
            key={tick}
            transform={`translate(${scale(tick) + scale.bandwidth() / 2}, 0)`}
          >
            <text
              x={-15}
              y={0}
              textAnchor="end"
              alignmentBaseline="central"
              css={textStyle}
              transform={`rotate(-90)`}
            >
              {tick}
            </text>
            <line x1={0} y1={0} x2={0} y2={5} stroke={"#888b8d"} />
          </g>
        )
      })}
      {/* <text
        textAnchor="middle"
        alignmentBaseline="hanging"
        x={0}
        y={0}
        transform={`translate(${innerWidth / 2}, 35)`}
        css={textStyle}
      >
        {label}
      </text> */}
    </g>
  )
}

const Axis = {
  Top,
  Left,
  Bottom,
  Right,
  BandBottom,
}

export default Axis
