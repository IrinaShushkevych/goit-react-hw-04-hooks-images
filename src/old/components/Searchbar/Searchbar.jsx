import { Component } from 'react'
import PropTypes from 'prop-types'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import s from './Searchbar.module.css'

export default class Searchbar extends Component {
  static propTypes = {
    onSetQuery: PropTypes.func.isRequired,
  }

  state = { query: '' }

  onChangeQuery = (e) => {
    this.setState({ query: e.target.value })
  }

  onSubmitForm = (e) => {
    const query = this.state.query.trim()
    e.preventDefault()
    if (query) {
      this.props.onSetQuery(query)
    }
  }

  render() {
    return (
      <header className={s.container}>
        <form className={s.form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={s.button}>
            <ImageSearchIcon
              className={s.icon}
              style={{ width: '90%', height: '90%', fill: 'blue' }}
            />
          </button>

          <input
            className={s.input}
            value={this.state.query}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeQuery}
          />
        </form>
      </header>
    )
  }
}
