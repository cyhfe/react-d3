export default { title: "Examples/BarChart", tags: ["autodocs"] };
import * as d3 from "d3";
import React from "react";
import { Svg } from "./Svg.tsx";
import { useEffect, useState } from "react";

interface Data {
  letter: string;
  frequency: number;
}

export function LineChartDemo() {
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const [data, setData] = useState<d3.DSVParsedArray<Data>>();

  useEffect(() => {
    (async () => {
      const res = (await d3.csv(
        "alphabet.csv",
        d3.autoType
      )) as d3.DSVParsedArray<Data>;
      setData(res);
    })();
  }, []);

  if (!data) return null;

  const letters = d3.groupSort(
    data,
    ([d]) => -d.frequency,
    (d) => d.letter
  );

  const x = d3.scaleBand().domain(letters).range([0, innerWidth]).padding(0.2);

  const maxFrequency = d3.max(data, (d) => d.frequency) ?? 0;
  const y = d3.scaleLinear().domain([0, maxFrequency]).range([innerHeight, 0]);

  return (
    <Svg
      viewBox={`0, 0, ${width}, ${height}`}
      marginLeft={marginLeft}
      marginTop={marginTop}
      className="border w-full"
    >
      <g className="fill-sky-400">
        {data.map((d) => {
          return (
            <rect
              key={d.letter}
              x={x(d.letter)}
              y={y(d.frequency)}
              width={x.bandwidth()}
              height={innerHeight - y(d.frequency)}
            />
          );
        })}
      </g>

      <g transform={`translate(0, ${innerHeight})`}>
        <line x1={0} y1={0} x2={innerWidth} y2={0} className="stroke-black" />
        {data.map(({ letter, frequency }) => {
          return (
            <g key={letter}>
              <text
                x={x(letter)! + x.bandwidth() / 2}
                y={y(frequency) - innerHeight}
                textAnchor="middle"
                alignmentBaseline="after-edge"
                className="text-xs"
              >
                {frequency.toFixed(3)}
              </text>
              <text
                x={x(letter)! + x.bandwidth() / 2}
                y={0}
                textAnchor="middle"
                alignmentBaseline="before-edge"
                className="text-xs"
              >
                {letter}
              </text>
            </g>
          );
        })}
      </g>
    </Svg>
  );
}
