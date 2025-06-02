import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
        <nav>
            <h3 style={styles.breadcrumb}>Feel Flow / Perfil</h3>
        </nav>
        <div style={styles.icons}>
            <button style={styles.iconButton}>🔔</button>
            <button style={styles.iconButton}>⚙️</button>
            <button style={styles.iconButton}>👤</button>
        </div>
        </header>
    );
    };

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#d9e7f3',
        borderRadius: '10px',
    },
    breadcrumb: {
        fontSize: '16px',
    },
    icons: {
        display: 'flex',
        gap: '10px',
    },
    iconButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    },
    };

export default Header;
