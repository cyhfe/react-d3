import Rankings from "./Rankings"
import ScatterplotD3Controlled from "./ScatterplotD3Controlled"
import BarChart from "./BarChart"
import { css } from "@emotion/react"

const rowStyle = css`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
`

const getColStyle = (n) => {
  const scale = (n / 12) * 100 + "%"
  return css`
    flex: 0 0 ${scale};
    padding: 10px;
  `
}

function Charts() {
  return (
    <>
      <h1>Front-end Frameworks</h1>
      <div css={rowStyle}>
        <div css={getColStyle(9)}>
          <Rankings />
        </div>
        <div css={getColStyle(3)}>
          <div>
            <div css={getColStyle(12)}>
              <ScatterplotD3Controlled />
            </div>
            <div css={getColStyle(12)}>
              <BarChart />
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
