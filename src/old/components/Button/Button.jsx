//created by Irina Shushkevych
import PropTypes from 'prop-types'
import s from './Button.module.css'

function Button({ onClickMore }) {
  return (
    <div className={s.blockMore}>
      <button type="button" className={s.button} onClick={onClickMore}>
        Load more...
      </button>
    </div>
  )
}

Button.propTypes = {
  onClickMore: PropTypes.func.isRequired,
}

export default Button
