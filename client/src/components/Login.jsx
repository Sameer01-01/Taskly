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
    <div className="w-full">      
      {error && (
        <div className="bg-error bg-opacity-10 text-error text-sm p-3 rounded-lg mb-4 flex items-start">
          <svg className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-text-secondary text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-text-tertiary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="pl-10 bg-surface-3 text-text-primary border border-border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-text-secondary text-sm font-medium">
              Password
            </label>
            <button type="button" className="text-primary text-xs hover:text-primary-light">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-text-tertiary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="pl-10 bg-surface-3 text-text-primary border border-border rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-medium p-3 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
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