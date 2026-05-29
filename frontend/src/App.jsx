import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MainLayout } from "./Layout/MainLayout";
import Home from "./pages/Home";
import { SingleNews } from "./pages/SingleNews";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WriteNews from "./pages/WriteNews";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/category/:category" element={<Home />} />
            <Route path="/news/:slug" element={<SingleNews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/write" element={<WriteNews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
