import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-surface-2 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-4xl">
        <div className="flex items-center">
          <svg className="w-7 h-7 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
            <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
            <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
          </svg>
          <Link to="/" className="text-xl font-bold text-text-primary">
            Taskly
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-text-secondary text-sm hidden sm:inline-block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-surface-3 hover:bg-surface text-text-primary px-3 py-1.5 rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm bg-surface-3 hover:bg-surface text-text-primary px-3 py-1.5 rounded-md transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-md transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 