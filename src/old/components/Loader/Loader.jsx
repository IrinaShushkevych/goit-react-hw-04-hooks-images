i//created by Irina Shushkevych
port { css } from '@emotion/react'
import CircleLoader from 'react-spinners/CircleLoader'

const override = css`
  display: block;
  margin: 10px auto;
`

const loading = true

function Loader() {
  return (
    <CircleLoader
      color="rgb(6, 255, 247)"
      loading={loading}
      css={override}
      size={50}
    />
  )
}

export default Loader
