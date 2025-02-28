import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ProfileBanner from './ProfileBanner';
import ProfileInfo from './ProfileInfo';

const AppLayout = () => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <Header />
        <ProfileBanner />
        <ProfileInfo />
      </main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
  },
  main: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f0f4f8',
  },
};

export default AppLayout;
