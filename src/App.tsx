import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Locations from "./pages/Locations";
import Favorites from "./pages/Favorites";
import CharacterDetails from "./pages/CharacterDetails";
import LocationChars from "./pages/LocationChars";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/location/:locationId" element={<LocationChars />} />
        <Route path="/character/:charId" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
