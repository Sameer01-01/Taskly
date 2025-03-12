import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const { email, password } = formData;
  const { login, isLoading, error } = useContext(AuthContext);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(formData);
    } catch (error) {
      // Error is already handled in the context
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mb-4"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login; 