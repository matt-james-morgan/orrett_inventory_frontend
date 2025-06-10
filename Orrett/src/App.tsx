import "./App.css";

import { LoginForm } from "./components/LoginForm";
import { useUserContext } from "./context/UserContext";
import Dashboard from "./components/Dashboard";

function App() {
  const { auth } = useUserContext();

  if (!auth) {
    return <LoginForm />;
  }

  return (
    <div className="h-screen p-8 w-full">
      <Dashboard />
    </div>
  );
}

export default App;
