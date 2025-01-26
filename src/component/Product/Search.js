import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { FaSearch, FaTimes } from "react-icons/fa"
import "./Search.css"

const Search = ({ onClose }) => {
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate("/products")
    }
    onClose()
  }

  return (
    <form className="search-box" onSubmit={searchSubmitHandler}>
      <div className="search-container">
        <FaSearch className="searching" />
        <input
          type="text"
          ref={inputRef}
          placeholder="Search products..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <button type="button" className="close-search" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </form>
  )
}

export default Search

