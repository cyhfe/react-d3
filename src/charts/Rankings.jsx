import React, { Fragment } from "react"
import Card from "../components/Card"
import ChartContainer from "../chartsComponents/ChartContainer"
import * as d3 from "d3"
import Curve from "../chartsComponents/Curve"
import { useDataContext } from "../App"
import { css } from "@emotion/react"
import RankingFilters from "../interaction/RankingFilters"

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
]

const lineStyle = css`
  stroke: #888b8d;
`

const textStyle = css`
  font-size: 14px;
  fill: #374f5e;
`

export default function Rankings({ margin }) {
  const width = 1000
  const height = 550
  const marginRight = 150
  const marginLeft = 110
  const innerWidth = width - marginLeft - marginRight
  const innerHeight = height - margin.top - margin.bottom

  const { data, colorScale } = useDataContext()
  const [activeFilter, setActiveFilter] = React.useState("satisfaction")

  const xScale = d3.scalePoint().domain(data.years).range([0, innerWidth])
  const yScale = d3
    .scalePoint()
    .domain(d3.range(1, data.ids.length + 1))
    .range([0, innerHeight])

  console.log(data)

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      />
      <ChartContainer
        width={width}
        height={height}
        margin={{ ...margin, right: marginRight, left: marginLeft }}
      >
        <g>
          {data.years.map((y) => {
            return (
              <g
                key={"x-axis-" + y}
                transform={`translate(${xScale(y)} , ${innerHeight})`}
              >
                <text
                  transform="translate(0 , 30)"
                  textAnchor="middle"
                  alignmentBaseline="hanging"
                  css={textStyle}
                >
                  {y}
                </text>
                <line
                  x1={0}
                  y1={-innerHeight}
                  x2={0}
                  y2={0}
                  strokeDasharray={"6, 4"}
                  css={lineStyle}
                />
              </g>
            )
          })}
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
          {data.experience.map((d) => {
            const rank = d[activeFilter][0].rank
            return (
              rank && (
                <g
                  transform={`translate(-36, ${yScale(rank)})`}
                  css={css`
                    transition: transform 300ms cubic-bezier(0.5, 0, 0.5, 1);
                  `}
                >
                  <text
                    stroke={colorScale(d.id)}
                    key={"rank-start-" + rank}
                    textAnchor="end"
                    alignmentBaseline="middle"
                  >
                    {d.name}
                  </text>
                </g>
              )
            )
          })}
          <g transform={`translate(${innerWidth}, 0)`}>
            {data.experience.map((d) => {
              const rank = d[activeFilter][d[activeFilter].length - 1].rank
              return (
                rank && (
                  <g
                    transform={`translate(36, ${yScale(rank)})`}
                    css={css`
                      transition: transform 300ms cubic-bezier(0.5, 0, 0.5, 1);
                    `}
                  >
                    <text
                      stroke={colorScale(d.id)}
                      key={"rank-end-" + rank}
                      textAnchor="start"
                      alignmentBaseline="middle"
                    >
                      {d.name}
                    </text>
                  </g>
                )
              )
            })}
          </g>
          {data.experience.map((d) => {
            return (
              <g key={"framework-percent-" + d.id}>
                {d[activeFilter].map((f) => {
                  return (
                    f.rank && (
                      <g
                        key={"circle-percent-" + f.year}
                        transform={`translate(${xScale(f.year)},${yScale(
                          f.rank
                        )})`}
                      >
                        <circle
                          cx={0}
                          cy={0}
                          r={18}
                          fill="#fff"
                          stroke={colorScale(d.id)}
                          strokeWidth={3}
                        ></circle>
                        <text
                          textAnchor="middle"
                          alignmentBaseline="central"
                          fill="#374f5e"
                          css={css`
                            font-size: 14px;
                            font-weight: bold;
                          `}
                        >
                          {Math.round(f.percentage_question)}
                        </text>
                      </g>
                    )
                  )
                })}
              </g>
            )
          })}
        </g>
      </ChartContainer>
    </Card>
  )
}
