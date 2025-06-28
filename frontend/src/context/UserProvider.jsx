// src/App.jsx
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>{/* All routes here */}</BrowserRouter>
    </UserProvider>
  );
}
