import "./App.css";

import LoadingCard from "./components/LoadingCard";
import Header from "./components/Header";
import type { Bin } from "./types";
import { TextField } from "@mui/material";
import BinCard from "./components/BinCard";
import { useBinContext } from "./context/BinContext";
import { useUserContext } from "./context/UserContext";
import { LoginForm } from "./components/LoginForm";
import { Button } from "./components/ui/button";

function App() {
  const { bins, isLoading } = useBinContext();
  const { auth, logout } = useUserContext();

  if (isLoading) {
    return <LoadingCard />;
  }
  if (!auth) {
    return <LoginForm />;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight pb-12">
          Musical Theatre Inventory
        </h1>
        <Button onClick={logout}>Logout</Button>
      </div>
      <Header bins={bins} />
      <div style={{ padding: "16px 0", width: "100%" }}>
        <TextField
          label="Search bins and items..."
          variant="outlined"
          sx={{ width: "25%" }}
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {bins.map((bin: Bin) => (
          <BinCard key={bin.id} bin={bin} />
        ))}
      </div>
    </div>
  );
}

export default App;
