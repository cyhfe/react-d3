import { css } from "@emotion/react"
import { transition } from "d3"

const textStyle = css`
  font-size: 12px;
  fill: #374f5e;
`

function Top({ scale, innerWidth, innerHeight, label }) {}

function Bottom({ scale, innerWidth, innerHeight, label, numberOfTicks }) {
  const ticks = scale.ticks(numberOfTicks)
  console.log(ticks)
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
    </g>
  )
}

function Right({ scale, innerWidth, innerHeight, label }) {}

function BandBottom({ scale, innerWidth, innerHeight, label }) {}

const Axis = {
  Top,
  Left,
  Bottom,
  Right,
  BandBottom,
}

export default Axis
