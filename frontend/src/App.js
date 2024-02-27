import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from './components/Footer';
import { AnimatedRoutes } from './components/AnimatedRoutes';
import { Login } from './pages/login';
import { Sign_up } from './pages/sign-up';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
      <AuthContextProvider>
        <AnimatedRoutes />
      </AuthContextProvider>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
