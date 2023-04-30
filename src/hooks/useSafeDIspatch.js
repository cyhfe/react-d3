import React, { useLayoutEffect, useRef } from "react"

function useSafeDispatch(dispatch) {
  const isMountRef = useRef(false)

  useLayoutEffect(() => {
    isMountRef.current = true
    return () => {
      isMountRef.current = false
    }
  }, [])

  return React.useCallback(
    (...args) => {
      if (isMountRef.current) {
        dispatch(...args)
      }
    },
    [dispatch]
  )
}

export default useSafeDispatch
