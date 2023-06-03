import './App.css';
import AllRoutes from './AllRoutes';
import Navbar from './components/navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
