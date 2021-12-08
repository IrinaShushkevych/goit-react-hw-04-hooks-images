import { useState } from 'react'
import PropTypes from 'prop-types'
import ImageSearchIcon from '@mui/icons-material/ImageSearch'
import s from './Searchbar.module.css'

export default function Searchbar({ onSetQuery }) {
  const [query, setQuery] = useState('')

  const onSubmitForm = (e) => {
    e.preventDefault()
    const val = query.trim()
    if (val) {
      onSetQuery(val)
    }
  }

  return (
    <header className={s.container}>
      <form className={s.form} onSubmit={onSubmitForm}>
        <button type="submit" className={s.button}>
          <ImageSearchIcon
            className={s.icon}
            style={{ width: '90%', height: '90%', fill: 'blue' }}
          />
        </button>

        <input
          className={s.input}
          value={query}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSetQuery: PropTypes.func.isRequired,
}
