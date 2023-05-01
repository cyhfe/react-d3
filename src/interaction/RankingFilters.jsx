import { css } from "@emotion/react"
const containerStyle = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
`

const buttonStyle = css`
  margin: 0;
  padding: 8px 10px;
  font-family: "IBM Plex Mono", monospace;
  font-size: 1.4rem;
  color: #06273b;
  background-color: transparent;
  border: 1px dashed #06273b;
  border-left: none;
  cursor: pointer;
  transition: all 250ms ease-in;
  &:first-of-type {
    border-left: 1px dashed #06273b;
  }
  &:hover,
  &:active {
    cursor: default;
  }
`

const activeBottonStyle = css`
  background-color: rgba(6, 39, 59, 0.15);
  transition-timing-function: ease-out;
`

function RankingFilters({ filters, setActiveFilter, activeFilter }) {
  return (
    <div css={containerStyle}>
      {filters.map((f) => {
        const isActive = activeFilter === f.id
        return (
          <button
            css={[buttonStyle, isActive ? activeBottonStyle : null]}
            key={f.id}
            onClick={() => !isActive && setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        )
      })}
    </div>
  )
}

export default RankingFilters
