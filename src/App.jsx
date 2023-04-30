// import { css } from "@emotion/react"
import { useEffect } from "react"
import { useRequest } from "./hooks/useRequest"
import * as d3 from "d3"
import Charts from "./charts"
import { css } from "@emotion/react"

function App() {
  const { data, isLoading, run } = useRequest()

  useEffect(() => {
    run(d3.json("front_end_frameworks.json"))
  }, [run])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div
      css={css`
        margin-right: auto;
        margin-left: auto;
        padding-right: 20px;
        padding-left: 20px;
        max-width: 1400px;
      `}
    >
      {isLoading && "loading"}
      {data && <Charts data={data} />}
    </div>
  )
}

export default App
