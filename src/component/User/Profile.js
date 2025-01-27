import React, { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import MetaData from "../layout/metaData"
import Loader from "../layout/Loader/Loader"
import { FaUser, FaEnvelope, FaCalendarAlt, FaShoppingBag, FaLock } from "react-icons/fa"
import "./Profile.css"

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login")
    }
  }, [navigate, isAuthenticated])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profile-container">
            <div className="profile-header">
              <h1>My Profile</h1>
            </div>
            <div className="profile-content">
              <div className="profile-avatar">
                <img src={user.avatar.url || "/placeholder.svg"} alt={user.name} />
                <Link to="/me/update" className="edit-profile-btn">
                  Edit Profile
                </Link>
              </div>
              <div className="profile-info">
                <div className="info-item">
                  <FaUser className="info-icon" />
                  <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaCalendarAlt className="info-icon" />
                  <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>
                </div>
                <div className="profile-actions">
                  <Link to="/orders" className="action-btn">
                    <FaShoppingBag className="action-icon" />
                    My Orders
                  </Link>
                  <Link to="/password/update" className="action-btn">
                    <FaLock className="action-icon" />
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile

