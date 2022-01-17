//created by Irina Shushkevych
import PropTypes from 'prop-types'
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem'

export default function ImageGallery({ itemsImg, myRef, onClickImg }) {
  return (
    <ul className={s.imageGallery}>
      {itemsImg &&
        itemsImg.map((el, idx, arr) => (
          <ImageGalleryItem
            key={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            tags={el.tags}
            myRef={idx === arr.length - 12 ? myRef : null}
            onClickImg={onClickImg}
          />
        ))}
    </ul>
  )
}

ImageGallery.propTypes = {
  itemsImg: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
  myRef: PropTypes.object,
  onClickImg: PropTypes.func.isRequired,
}
