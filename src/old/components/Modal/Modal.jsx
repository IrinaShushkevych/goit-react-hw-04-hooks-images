import { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import s from './Modal.module.css'

const root = document.querySelector('#root-modal')

export default class Modal extends Component {
  propTypes = {
    item: PropTypes.shape({
      src: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
    onCloseModal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onCloseKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseKey)
  }

  onCloseKey = (e) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal()
    }
  }

  render() {
    const {
      onCloseModal,
      item: { src, tags },
    } = this.props
    return createPortal(
      <div
        className={s.overlay}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onCloseModal()
          }
        }}
      >
        <div className={s.modal}>
          <img src={src} alt={tags} />
        </div>
      </div>,
      root,
    )
  }
}
