import React from 'react';
// Elements
import Banner from '../assets/img/banner.jpg';
// import Profile from '../assets/img/profile.jpg';

const ProfileBanner = () => {
  return (
    <div style={styles.bannerContainer}>
      <img
        src={Banner}
        alt="Banner"
        style={styles.bannerImage}
      />

    </div>
  );
};

const styles = {
  bannerContainer: {
    position: 'relative',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '1000%',
    height: '300px',
    objectFit: 'cover',
  },
  profileDetails: {
    position: 'absolute',
    bottom: '-30px',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '3px solid white',
    
  },
  editButton: {
    marginLeft: '15px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProfileBanner;
