import React, { useCallback } from "react"
import useSafeDispatch from "./useSafeDIspatch"
function reducer(state, action) {
  switch (action.type) {
    case "pendding": {
      return {
        ...state,
        status: "pendding",
        data: null,
        error: null,
      }
    }
    case "resolve": {
      return {
        ...state,

        status: "idle",
        data: action.payload,
        error: null,
      }
    }
    case "reject": {
      return {
        ...state,

        status: "idle",
        data: null,
        error: action.payload,
      }
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

function useRequest(
  initialState = {
    status: "idle",
    error: null,
    data: null,
  }
) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const safeDispatch = useSafeDispatch(dispatch)
  const { status, data, error } = state

  const run = useCallback(
    function run(promise) {
      promise.then(
        (data) => {
          safeDispatch({
            type: "resolve",
            payload: data,
          })
        },
        (error) => {
          safeDispatch({
            type: "reject",
            payload: error,
          })
        }
      )
    },
    [safeDispatch]
  )

  const isLoading = status === "pendding"
  const isError = error !== null

  return {
    status,
    data,
    error,

    isLoading,
    isError,

    run,
  }
}

export { useRequest }
