import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
        <>
        <NavBar />
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </div>
    </>
  );
}

export default App;
