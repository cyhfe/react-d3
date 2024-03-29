import React, { ComponentPropsWithoutRef, forwardRef } from "react";

interface SvgProps extends ComponentPropsWithoutRef<"svg"> {
  marginLeft?: number;
  marginTop?: number;
}
const Svg = forwardRef<SVGSVGElement, SvgProps>(function Svg(
  props: SvgProps,
  forwardRef
) {
  const { marginLeft = 0, marginTop = 0, children, ...rest } = props;
  return (
    <svg {...rest} ref={forwardRef}>
      <g transform={`translate(${marginLeft}, ${marginTop})`}>{children}</g>
    </svg>
  );
});

export { Svg };
