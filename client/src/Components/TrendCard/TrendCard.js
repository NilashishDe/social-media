import React, { useState, useEffect } from 'react';
import './TrendCard.css';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';
import UserFollow from '../UserFollow/UserFollow';

const TrendCard = () => {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'followers', 'following'
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await getAllUser();
        setPersons(data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    }
    fetchPersons();
  }, []);

  const handleFollowersClick = () => {
    setActiveTab('followers');
  };

  const handleFollowingClick = () => {
    setActiveTab('following');
  };

  const handleHomeClick = () => {
    setActiveTab('home');
  };

  // Filter users based on active tab
  const getFilteredUsers = () => {
    if (activeTab === 'followers') {
      // Show users who are following the current user
      return persons.filter(person => person._id !== user._id && person.following.includes(user._id));
    } else if (activeTab === 'following') {
      // Show users whom the current user is following
      return persons.filter(person => person._id !== user._id && user.following.includes(person._id));
    }
    return [];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="trend-content-section">
            <h3>Quick Actions</h3>
            <div className="home-features">
              <div className="home-feature-item" >
                <MessageIcon />
                <span>Messages</span>
              </div>
              <div className="home-feature-item">
                <SearchIcon />
                <span>Search</span>
              </div>
              <div className="home-feature-item">
                <ExploreIcon />
                <span>Explore</span>
              </div>
              <div className="home-feature-item">
                <NotificationsIcon />
                <span>Notifications</span>
              </div>
            </div>
          </div>
        );
      case 'followers':
        return (
          <div className="trend-content-section">
            <h3>Your Followers</h3>
            {getFilteredUsers().length > 0 ? (
              getFilteredUsers().map((person, id) => (
                <UserFollow person={person} key={id} showFollowButton={false} />
              ))
            ) : (
              <p className="no-data">No followers yet</p>
            )}
          </div>
        );
      case 'following':
        return (
          <div className="trend-content-section">
            <h3>People You're Following</h3>
            {getFilteredUsers().length > 0 ? (
              getFilteredUsers().map((person, id) => (
                <UserFollow person={person} key={id} showFollowButton={true} />
              ))
            ) : (
              <p className="no-data">Not following anyone yet</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='TrendCard'>
        {/* Navigation Icons */}
        <div className="trend-nav-icons">
          <div className={`nav-icon ${activeTab === 'home' ? 'active' : ''}`} onClick={handleHomeClick}>
            <HomeIcon />
            <span>Home</span>
          </div>
          <div className={`nav-icon ${activeTab === 'followers' ? 'active' : ''}`} onClick={handleFollowersClick}>
            <PeopleIcon />
            <span>Followers</span>
          </div>
          <div className={`nav-icon ${activeTab === 'following' ? 'active' : ''}`} onClick={handleFollowingClick}>
            <PersonAddIcon />
            <span>Following</span>
          </div>
        </div>

        {/* Content Section */}
        {renderContent()}
      </div>
      
    </>
  )
}

export default TrendCard
