// import { css } from "@emotion/react"
import { createContext, useEffect, useContext } from "react"
import { useRequest } from "./hooks/useRequest"
import * as d3 from "d3"
import Charts from "./charts"
import { useMemo } from "react"
import { Global, css } from "@emotion/react"

const DataContext = createContext()

function DataContextProvider({ children, ...props }) {
  const value = { ...props }
  const ctx = useMemo(() => {
    return value
  }, Object.values(value))
  return <DataContext.Provider value={ctx}>{children}</DataContext.Provider>
}

function useDataContext() {
  const ctx = useContext(DataContext)
  return ctx
}

const globalStyle = [
  css`
    @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap");
  `,
  css`
    html {
      font-size: 62.5%;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }
    *,
    ::after,
    ::before {
      box-sizing: inherit;
    }
    body {
      color: red;
      margin: 0 0 60px;
      background-color: #f9fdff;
      font-family: "IBM Plex Mono", monospace;
      font-size: 1.6rem;
      line-height: 1.4;
      font-weight: 500;
      color: #06273b;
    }
  `,
]

function App() {
  const { data, isLoading, run } = useRequest()

  const colorScale = data
    ? d3.scaleOrdinal().domain(data.ids).range(d3.schemeTableau10)
    : null

  useEffect(() => {
    run(d3.json("front_end_frameworks.json"))
  }, [run])

  return (
    <DataContextProvider data={data} colorScale={colorScale}>
      <Global styles={globalStyle} />
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
        {data && <Charts />}
      </div>
    </DataContextProvider>
  )
}

export { App, useDataContext }
