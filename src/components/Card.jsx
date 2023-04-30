import { css } from "@emotion/react"

const cardStyle = css`
  margin: 10px 0;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
`

function Card({ children }) {
  return <div css={cardStyle}>{children}</div>
}

export default Card