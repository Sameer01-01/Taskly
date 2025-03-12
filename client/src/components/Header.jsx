import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        
        {user && (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 