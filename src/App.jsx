import { css } from "@emotion/react"
import { useEffect } from "react"
import * as d3 from "d3"

function App() {
  useEffect(() => {
    d3.json("front_end_frameworks.json").then((d) => console.log(d))
  }, [])
  return (
    <div
      css={css`
        color: red;
      `}
    >
      app
    </div>
  )
}

export default App
