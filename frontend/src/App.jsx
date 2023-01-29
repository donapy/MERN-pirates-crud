import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Error } from "./Pages/Error";
import { ListPirate } from "./Components/Pirate/ListPirate";
import { NewPirate } from "./Components/Pirate/NewPirate";
import { EditPirate } from "./Components/Pirate/EditPirate";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pirate" element={<ListPirate />} />
          <Route path="pirate/new" element={<NewPirate />} />
          <Route path="pirate/edit/:id" element={<EditPirate />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
