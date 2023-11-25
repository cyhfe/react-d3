export default { title: "Examples/LineChart" };
import * as d3 from "d3";

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from "react";

interface SvgProps extends ComponentPropsWithoutRef<"svg"> {}
const Svg = forwardRef<SVGSVGElement, SvgProps>(function Svg(
  props: SvgProps,
  forwardRef
) {
  const { children, ...rest } = props;
  return (
    <svg ref={forwardRef} {...rest}>
      {children}
    </svg>
  );
});

interface Data {
  close: number;
  date: Date;
}

function LineChartDemo() {
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
      console.log(res);
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
    <svg
      width={width}
      height={height}
      viewBox={`0, 0, ${width}, ${height}`}
      className="border"
    >
      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        <text x={0} y={-8} textAnchor="middle">
          Daily close ($)
        </text>

        <text x={innerWidth + 8} y={innerHeight} alignmentBaseline="central">
          Year
        </text>
        {/* axis-x */}
        <g transform={`translate(0, ${innerHeight})`}>
          <line x1={0} y1={0} x2={innerWidth} y2={0} stroke="steelblue" />

          {ticksX.map((tick) => {
            return (
              <g key={tick.toString()}>
                <line
                  x1={x(tick)}
                  y1={0}
                  x2={x(tick)}
                  y2={-innerHeight}
                  stroke="steelblue"
                />
                <text
                  x={x(tick)}
                  textAnchor="middle"
                  alignmentBaseline="before-edge"
                >
                  {d3.utcFormat("%Y")(tick)}
                </text>
              </g>
            );
          })}
        </g>
        {/* axis-y */}
        <g>
          <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="steelblue" />

          {ticksY.map((tick) => {
            return (
              <g key={tick}>
                <line
                  x1={0}
                  y1={y(tick)}
                  x2={innerWidth}
                  y2={y(tick)}
                  stroke="steelblue"
                />
                <text
                  x={-4}
                  y={y(tick)}
                  textAnchor="end"
                  alignmentBaseline="central"
                >
                  {tick}
                </text>
              </g>
            );
          })}
        </g>

        {path && (
          <path fill="none" stroke="steelblue" strokeWidth="1.5" d={path} />
        )}
      </g>
    </svg>
  );
}

export { LineChartDemo };
