import React from "react"

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

async function useRequest(
  initialState = {
    status: "idle",
    error: null,
    data: null,
  }
) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { status, data, error } = state

  function run(promise) {
    promise.then(
      (data) => {
        dispatch({
          type: "resolve",
          payload: data,
        })
      },
      (error) => {
        dispatch({
          type: "reject",
          payload: error,
        })
      }
    )
  }

  const isLoading = status === "pendding"
  const isError = status !== null

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
