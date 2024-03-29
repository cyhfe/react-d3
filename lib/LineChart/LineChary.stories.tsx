export default { title: "Examples/LineChart", tags: ["autodocs"] };
import * as d3 from "d3";
import React from "react";
import { Svg } from "../Svg.tsx";
import { useEffect, useState } from "react";

interface Data {
  close: number;
  date: Date;
}

export function LineChartDemo() {
  const width = 928;
  const height = 500;
  const marginTop = 40;
  const marginRight = 60;
  const marginBottom = 40;
  const marginLeft = 60;

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const [data, setData] = useState<d3.DSVParsedArray<Data>>();

  useEffect(() => {
    (async () => {
      const res = (await d3.csv(
        "aapl.csv",
        d3.autoType
      )) as d3.DSVParsedArray<Data>;
      setData(res);
    })();
  }, []);

  if (!data) return null;

  const [minX = new Date(), maxX = new Date()] = d3.extent(data, (d) => d.date);
  const maxY = d3.max(data, (d) => d.close);

  const x = d3.scaleUtc([minX, maxX], [0, innerWidth]);
  const y = d3.scaleLinear([0, maxY ?? 0], [innerHeight, 0]);

  const ticksX = x.ticks();
  const ticksY = y.ticks();

  const lineGenerator = d3
    .line<Data>()
    .x((d) => x(d.date))
    .y((d) => y(d.close));

  const path = lineGenerator(data);

  return (
    <Svg
      viewBox={`0, 0, ${width}, ${height}`}
      marginLeft={marginLeft}
      marginTop={marginTop}
      className="border w-full"
    >
      <text x={0} y={-14} textAnchor="middle" className=" font-normal">
        Daily close ($)
      </text>

      <text x={innerWidth + 14} y={innerHeight} alignmentBaseline="central">
        Year
      </text>
      {/* axis-y */}
      <g>
        {ticksY.map((tick, i) => {
          return (
            <g key={tick}>
              {i !== 0 && (
                <line
                  x1={0}
                  y1={y(tick)}
                  x2={innerWidth}
                  y2={y(tick)}
                  className="stroke-slate-200"
                />
              )}
              <text
                x={-8}
                y={y(tick)}
                textAnchor="end"
                alignmentBaseline="central"
                className="text-xs"
              >
                {tick}
              </text>
            </g>
          );
        })}

        <line x1={0} y1={0} x2={0} y2={innerHeight} className="stroke-black" />
      </g>

      {/* axis-x */}
      <g transform={`translate(0, ${innerHeight})`}>
        {ticksX.map((tick) => {
          return (
            <g key={tick.toString()}>
              <line
                x1={x(tick)}
                y1={0}
                x2={x(tick)}
                y2={-innerHeight}
                className="stroke-slate-200"
              />

              <text
                x={x(tick)}
                y={8}
                textAnchor="middle"
                alignmentBaseline="before-edge"
                className="text-xs"
              >
                {d3.utcFormat("%Y")(tick)}
              </text>
            </g>
          );
        })}

        <line x1={0} y1={0} x2={innerWidth} y2={0} className="stroke-black" />
      </g>

      {path && <path fill="none" className="stroke-sky-600" d={path} />}
    </Svg>
  );
}
