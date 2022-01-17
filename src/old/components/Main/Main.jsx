//created by Irina Shushkevych
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import API from '../../services/api'
import Searchbar from '../Searchbar'
import ImageGallery from '../ImageGallery'
import Button from '../Button'
import Loader from '../Loader'
import Modal from '../Modal'

class Main extends Component {
  state = {
    itemLooking: null,
    searchQuery: '',
    isLoading: false,
    isLastPage: false,
    itemsImg: [],
    myRef: React.createRef(),
    currentPage: 1,
    perPage: 12,
    totalPage: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    const { perPage, currentPage, myRef, searchQuery, isLoading } = this.state
    let newSearch = false
    if (searchQuery !== prevState.searchQuery) {
      newSearch = true
    }
    if (isLoading !== prevProps.isLoading && isLoading) {
      API.getSearchImages(currentPage, perPage, searchQuery)
        .then((data) => {
          if (!data) {
            this.clearData()
            toast.warn('No such results!')
            return
          }

          this.setState((prevState) => ({
            itemsImg: newSearch
              ? [
                  ...data.hits.map((el) => ({
                    id: el.id,
                    webformatURL: el.webformatURL,
                    largeImageURL: el.largeImageURL,
                    tags: el.tags,
                  })),
                ]
              : [
                  ...prevState.itemsImg,
                  ...data.hits.map((el) => ({
                    id: el.id,
                    webformatURL: el.webformatURL,
                    largeImageURL: el.largeImageURL,
                    tags: el.tags,
                  })),
                ],
            totalPage: Math.trunc(data.totalHits / prevState.perPage) + 1,
            currentPage: prevState.currentPage + 1,
            isLastPage:
              prevState.currentPage + 1 >=
              Math.trunc(data.totalHits / prevState.perPage) + 1
                ? true
                : false,
            isLoading: false,
          }))

          if (myRef.current) {
            this.scrollToRef(myRef)
          }
        })
        .catch((error) => {
          this.clearData()
          toast.error(error.message)
        })
    }
  }

  clearData = () => {
    this.setState({
      itemsImg: [],
      totalPage: 0,
      currentPage: 1,
      isLastPage: true,
      isLoading: false,
    })
  }

  scrollToRef = (ref) => {
    const top = ref.current.offsetTop - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  loadItemImg = () => {
    this.setState({ isLoading: true })
  }

  setSearchQuery = (value) => {
    this.setState({
      searchQuery: value,
      isLoading: true,
    })
  }

  setItemLooking = (el) => {
    this.setState({ itemLooking: { src: el.dataset.src, tags: el.alt } })
  }

  clearItemLooking = () => {
    this.setState({ itemLooking: null })
  }

  render() {
    const {
      itemsImg,
      isLoading,
      itemLooking,
      isLastPage,
      searchQuery,
      myRef,
    } = this.state

    return (
      <>
        <Searchbar onSetQuery={this.setSearchQuery} />
        <ImageGallery
          itemsImg={itemsImg}
          myRef={myRef}
          onClickImg={this.setItemLooking}
        />
        {isLoading && <Loader />}
        {searchQuery && !isLastPage && !isLoading && (
          <Button onClickMore={this.loadItemImg} />
        )}
        {itemLooking && (
          <Modal item={itemLooking} onCloseModal={this.clearItemLooking} />
        )}
      </>
    )
  }
}

export default Main
