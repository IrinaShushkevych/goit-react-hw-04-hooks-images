//created by Irina Shushkevych
import PropTypes from 'prop-types'
import s from './ImageGalleryItem.module.css'

function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  myRef = null,
  onClickImg,
}) {
  return (
    <li
      className={s.imageItem}
      ref={myRef}
      onClick={(e) => {
        onClickImg(e.target)
      }}
    >
      <img
        src={webformatURL}
        data-src={largeImageURL}
        className={s.image}
        alt={tags}
      />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
  myRef: PropTypes.object,
}

export default ImageGalleryItem
