import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Details />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;