import Rankings from "./Rankings"
import ScatterplotD3Controlled from "./ScatterplotD3Controlled"
import BarChart from "./BarChart"
import { css } from "@emotion/react"

const rowStyle = css`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
`

const colBaseStyle = css`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 10px;
  padding-left: 10px;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
`

const getColStyle = (n) => {
  const scale = (n / 12) * 100 + "%"
  return [
    colBaseStyle,
    css`
      flex-basis: ${scale};
      max-width: ${scale};
    `,
  ]
}

function Charts() {
  const margin = { top: 30, right: 10, bottom: 50, left: 60 }

  return (
    <>
      <h1>Front-end Frameworks</h1>
      <div css={rowStyle}>
        <div css={getColStyle(9)}>
          <Rankings margin={margin} />
        </div>
        <div css={getColStyle(3)}>
          <div>
            <div css={getColStyle(12)}>
              <ScatterplotD3Controlled margin={margin} />
            </div>
            <div css={getColStyle(12)}>
              <BarChart margin={margin} />
            </div>
          </div>
        </div>
      </div>
      <div className="source">
        Data source and original rankings chart:{" "}
        <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">
          The State of JS 2021: Front-end Frameworks
        </a>
      </div>
    </>
  )
}

export default Charts
