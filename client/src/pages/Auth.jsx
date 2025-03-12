import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <svg 
              className="h-14 w-14 text-primary" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z" />
              <path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-text-primary">
            <span className="text-primary">Task</span>ly
          </h2>
          <p className="mt-2 text-text-secondary">Organize your life, one task at a time</p>
        </div>

        <div className="bg-surface-2 p-8 rounded-2xl shadow-xl border border-border animate-slide-up">
          <div className="flex mb-6 border-b border-border">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-3 px-4 font-medium text-sm transition-all relative ${
                isLogin 
                  ? 'text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Login
              {isLogin && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-3 px-4 font-medium text-sm transition-all relative ${
                !isLogin 
                  ? 'text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Register
              {!isLogin && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
              )}
            </button>
          </div>

          {isLogin ? (
            <Login onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <Register onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>

        <div className="mt-6 text-center text-sm text-text-tertiary">
          <p>© {new Date().getFullYear()} Taskly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth; 