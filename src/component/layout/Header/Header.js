import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaBars, FaTimes, FaChevronDown, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa"
import { useSelector } from "react-redux"
import UserOptions from "./UserOptions"
import Search from "../../Product/Search"
import FilterModal from "../../Product/FilterModal"
import "./Header.css"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const location = useLocation()
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 200) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const closeSidebar = () => setIsOpen(false)

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-component">
        <Link to="/" className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="120" height="60">
            <rect x="75" y="40" width="20" height="30" rx="2" fill="#008080" />
            <path d="M75 40 Q77 30, 85 30 Q93 30, 95 40" fill="none" stroke="#fff" strokeWidth="2" />
            <text
              x="110"
              y="60"
              fontFamily="Arial, sans-serif"
              fontSize="36"
              fill="hsla(39,100%,68%,1)"
              fontWeight="bold"
            >
              Trendz
            </text>
            <text x="112" y="85" fontFamily="Arial, sans-serif" fontSize="14" fill="#3f51b5">
              Find Your Style
            </text>
          </svg>
        </Link>

        <nav className="links">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`link-details ${location.pathname === (item === "Home" ? "/" : `/${item.toLowerCase()}`) ? "active" : ""}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="social">
          <button className="sort-btn" onClick={handleOpenModal}>
            Sort By <FaChevronDown />
          </button>
          {isAuthenticated ? (
            <UserOptions user={user} />
          ) : (
            <Link to="/login" className="login-icon">
              <FaUser />
            </Link>
          )}
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
          <div className="search">
            {searchOpen ? (
              <Search onClose={() => setSearchOpen(false)} />
            ) : (
              <div onClick={() => setSearchOpen(true)}>
                <FaSearch className="search-icon" />
              </div>
            )}
          </div>
          <div className="bar-icon" onClick={toggleSidebar}>
            <FaBars />
          </div>
        </div>
      </div>

      <div className={`side-bar ${isOpen ? "open" : ""}`}>
        <div className="side-bar-content">
          <div className="close-icon" onClick={toggleSidebar}>
            <FaTimes />
          </div>
          <div className="side-bar-links">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="side-bar-link"
                onClick={closeSidebar}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FilterModal open={openModal} handleClose={handleCloseModal} />
    </header>
  )
}

export default Header

