import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import ApiListRoute from "./routes/ApisRoute";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<ApiListRoute />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
