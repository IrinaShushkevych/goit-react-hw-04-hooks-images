import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/api'
import Searchbar from '../Searchbar'
import ImageGallery from '../ImageGallery'
import Button from '../Button'
import Loader from '../Loader'
import Modal from '../Modal'

export default function Main() {
  const myRef = useRef(null)
  const [perPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsImg, setItemsImg] = useState([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemLooking, setItemLooking] = useState(null)

  const clearData = () => {
    setItemsImg([])
    setCurrentPage(1)
    setIsLastPage(true)
    setIsLoading(false)
  }

  const scrollToRef = (ref) => {
    const top = ref.current.offsetTop - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const onChangeQuery = (val) => {
    setItemsImg([])
    setCurrentPage(1)
    setSearchQuery(val)
    setIsLoading('true')
  }

  const onClickMore = () => {
    setCurrentPage((prevState) => prevState + 1)
    setIsLoading(true)
  }

  const onClickImg = (el) => {
    setItemLooking({ src: el.dataset.src, tags: el.alt })
  }

  useEffect(() => {
    if (isLoading && searchQuery) {
      API.getSearchImages(currentPage, perPage, searchQuery)
        .then((data) => {
          if (!data) {
            clearData()
            toast.warn('No such results!')
            return
          }

          setIsLoading(false)
          setItemsImg([...itemsImg, ...data.hits])
          setIsLastPage(
            currentPage + 1 >= Math.trunc(data.totalHits / perPage) + 1
              ? true
              : false,
          )

          if (myRef.current) {
            scrollToRef(myRef)
          }
        })
        .catch((error) => {
          clearData()
          toast.error(error.message)
        })
    }
  }, [isLoading, searchQuery, currentPage, perPage, itemsImg])

  return (
    <>
      <Searchbar onSetQuery={onChangeQuery} />
      <ImageGallery itemsImg={itemsImg} myRef={myRef} onClickImg={onClickImg} />
      {isLoading && <Loader />}
      {searchQuery && !isLastPage && !isLoading && (
        <Button onClickMore={onClickMore} />
      )}
      {itemLooking && (
        <Modal
          item={itemLooking}
          onCloseModal={() => {
            setItemLooking(null)
          }}
        />
      )}
    </>
  )
}
