import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import s from './Modal.module.css'

export default function Modal({ item, onCloseModal }) {
  const root = document.querySelector('#root-modal')

  const onCloseKey = (e) => {
    if (e.code === 'Escape') {
      onCloseModal()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onCloseKey)
    return () => {
      window.removeEventListener('keydown', onCloseKey)
    }
  }, [])

  const { src, tags } = item
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

Modal.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onCloseModal: PropTypes.func.isRequired,
}
