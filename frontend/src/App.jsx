import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './input.css'

//PAGINAS
import Home from './pages/Home';
import Login from './pages/Login';



const Protegido = ({ component: Component }) => {
  const [autenticado, setAutenticado] = useState(false);


  return autenticado ? <Component /> : <Navigate to="/login" />;
};


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Protegido component={Home} />} />
          <Route path="/teste"  element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
