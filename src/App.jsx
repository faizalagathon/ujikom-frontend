import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Registrasi from "./pages/Auth/Registrasi";
import Dashboard from "./pages/Dashboard";
import Aplikasi from "./layout/Aplikasi";
import Album from "./pages/Album/Album";
import AlbumTambah from "./pages/Album/AlbumTambah";
import AlbumDetail from "./pages/Album/AlbumDetail";
import FotoTambah from "./pages/Album/FotoTambah";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route element={<Aplikasi />} >
          <Route index element={<Dashboard />} />
          <Route path="/album" element={<Album />} />
          <Route path="/album/tambah" element={<AlbumTambah />} />
          <Route path="/foto/tambah/:id" element={<FotoTambah />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
        </Route>
        <Route
          path="*"
          element={
            <p className="text-center text-2xl mt-4">Halaman Tidak Ditemukan</p>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
