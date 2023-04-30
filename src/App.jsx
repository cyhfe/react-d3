// import { css } from "@emotion/react"
import { createContext, useEffect, useContext } from "react"
import { useRequest } from "./hooks/useRequest"
import * as d3 from "d3"
import Charts from "./charts"
import { css } from "@emotion/react"
import { useMemo } from "react"

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

function App() {
  const { data, isLoading, run } = useRequest()

  useEffect(() => {
    run(d3.json("front_end_frameworks.json"))
  }, [run])

  return (
    <DataContextProvider data={data}>
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
    </DataContextProvider>
  )
}

export { App, useDataContext }
