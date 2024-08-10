import { useState, useEffect } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";
import About from "./pages/About.jsx";
import Awards from "./pages/Awards.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Chess_Visualizer from "./pages/Chess_Visualizer.jsx";
import { Route, Routes } from "react-router-dom";
import './App.css';
import axios from "axios";

function App() {

    const [prediction, setPrediction] = useState('');

    const fetchPrediction = async () => {
        const response = await axios.get('http://localhost:8000/generate');
        setPrediction(response.data.result);
    };

    useEffect(() => {
        fetchPrediction();
    }, []);

    return (
        <>
            {/* <Header/> */}
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/chess_visualizer" element={<Chess_Visualizer/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/awards" element={<Awards/>} />
            </Routes>
            <Footer/>
        </>
    );
}

export default App
