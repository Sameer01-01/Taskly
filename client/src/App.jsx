import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Header';
import Auth from './pages/Auth';
import Todos from './pages/Todos';

const AppContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-6">
        {user ? <Todos /> : <Auth />}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
