import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark p-3 shadow-sm" style={{ background: 'linear-gradient(90deg, #4a148c, #7b1fa2)' }}>
            <div className="container">
                <span className="navbar-brand mb-0 h1">🦖 DinoBox Delivery</span>
            </div>
        </nav>
    );
};

export default Navbar;