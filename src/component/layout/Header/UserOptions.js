import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { useDispatch } from "react-redux"
import { logout } from "../../../actions/userAction"
import { FaUser, FaShoppingCart, FaSignOutAlt, FaClipboardList, FaTachometerAlt } from "react-icons/fa"
import "./Header.css"

const UserOptions = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()

  const options = [
    { icon: FaClipboardList, name: "Orders", func: orders },
    { icon: FaUser, name: "Profile", func: account },
    { icon: FaShoppingCart, name: "Cart", func: cart },
    { icon: FaSignOutAlt, name: "Logout", func: logoutUser },
  ]

  if (user.role === "admin") {
    options.unshift({
      icon: FaTachometerAlt,
      name: "Dashboard",
      func: dashboard,
    })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  function dashboard() {
    navigate("/admin/dashboard")
  }

  function orders() {
    navigate("/orders")
  }

  function account() {
    navigate("/account")
  }

  function cart() {
    navigate("/cart")
  }

  function logoutUser() {
    dispatch(logout())
    alert.success("Logout Successfully")
    navigate("/")
  }

  return (
    <div className="user-options" ref={menuRef}>
      <img
        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
        alt="Profile"
        className="avatar"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="options-menu">
          {options.map((item) => (
            <div key={item.name} className="option-item" onClick={item.func}>
              <item.icon className="option-icon" />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOptions

