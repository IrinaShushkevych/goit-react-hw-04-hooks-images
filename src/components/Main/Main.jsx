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
  const [perPage, setPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsImg, setItemsImg] = useState([])
  const [isLastPage, setIsLastPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemLooking, setItemLooking] = useState(null)
  const [prevQuery, setPrevQuery] = useState(null)

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
    setPrevQuery(searchQuery)
    setSearchQuery(val)
    setIsLoading('true')
    setCurrentPage(1)
  }

  useEffect(() => {
    const newSearch = searchQuery === prevQuery ? false : true
    if (isLoading) {
      API.getSearchImages(currentPage, perPage, searchQuery)
        .then((data) => {
          if (!data) {
            clearData()
            toast.warn('No such results!')
            return
          }

          setItemsImg((prevState) =>
            newSearch
              ? [
                  ...data.hits.map((el) => ({
                    id: el.id,
                    webformatURL: el.webformatURL,
                    largeImageURL: el.largeImageURL,
                    tags: el.tags,
                  })),
                ]
              : [
                  ...prevState,
                  ...data.hits.map((el) => ({
                    id: el.id,
                    webformatURL: el.webformatURL,
                    largeImageURL: el.largeImageURL,
                    tags: el.tags,
                  })),
                ],
          )
          setPrevQuery(searchQuery)
          setIsLastPage(
            currentPage + 1 >= Math.trunc(data.totalHits / perPage) + 1
              ? true
              : false,
          )
          setCurrentPage((prevState) => prevState + 1)
          setIsLoading(false)

          if (myRef.current) {
            scrollToRef(myRef)
          }
        })
        .catch((error) => {
          clearData()
          toast.error(error.message)
        })
    }
  }, [isLoading])

  return (
    <>
      <Searchbar onSetQuery={onChangeQuery} />
      <ImageGallery
        itemsImg={itemsImg}
        myRef={myRef}
        onClickImg={(el) => {
          setItemLooking({ src: el.dataset.src, tags: el.alt })
        }}
      />
      {isLoading && <Loader />}
      {searchQuery && !isLastPage && !isLoading && (
        <Button
          onClickMore={() => {
            setIsLoading(true)
          }}
        />
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
