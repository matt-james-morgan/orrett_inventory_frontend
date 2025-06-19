import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginForm } from "./components/LoginForm";
import { useUserContext } from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import BinDetailsPage from "./pages/BinDetailsPage";

function App() {
  const { auth } = useUserContext();

  if (!auth) {
    return <LoginForm />;
  }

  return (
    <div className="h-screen p-8 w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bin/:id" element={<BinDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
