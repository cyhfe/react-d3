// import { css } from "@emotion/react"
import { useEffect } from "react"
import { useRequest } from "./hooks/useRequest"
import * as d3 from "d3"
import Charts from "./charts/charts"

function App() {
  const { data, isLoading, run } = useRequest()

  useEffect(() => {
    run(d3.json("front_end_frameworks.json"))
  }, [run])

  return (
    <div>
      {isLoading && "loading"}
      {data && <Charts data={data} />}
    </div>
  )
}

export default App
