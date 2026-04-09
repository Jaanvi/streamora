import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import History from "./pages/History";
import Settings from "./pages/Settings";
import UploadMovie from "./pages/UploadMovie";
import WatchPage from "./pages/WatchPage";
import AdminUpload from "./pages/AdminUpload";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private */}
        <Route path="/home" element={<Navigate to="/browse" />} />
        <Route
          path="/browse"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <Movies />
            </PrivateRoute>
          }
        />
        <Route
          path="/tv"
          element={
            <PrivateRoute>
              <Tv />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadMovie />
            </PrivateRoute>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <PrivateRoute>
              <WatchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
          <PrivateRoute>
          <AdminUpload />
          </PrivateRoute>
         }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;