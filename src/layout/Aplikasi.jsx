import { IconLogout } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Aplikasi() {
  const [dataUser, setDataUser] = useState({});

  const handleLogout = () => {
    sessionStorage.removeItem("dataUser");
    setDataUser({});
  };

  useEffect(() => {
    const isLogin = sessionStorage.getItem("dataUser");
    if (isLogin) {
      setDataUser(JSON.parse(isLogin));
    }
  }, []);

  return (
    <div className="flex">
      <div className="bg-slate-300 p-2 min-h-screen">
        <p className="text-2xl mb-4">Galery Foto</p>
        <div className="flex flex-col gap-2">
          <Link to="/">Dashboard</Link>
          {Object.keys(dataUser).length > 0 && <Link to="/album">Album</Link>}
        </div>
      </div>
      <div className="flex-1 bg-white p-3">
        <div className="flex justify-between items-center">
          <p className="text-xl mb-4">
            {location.pathname === "/"
              ? "Dashboard"
              : location.pathname === "/album"
              ? "Daftar Album"
              : location.pathname === "/album/tambah"
              ? "Tambah Album"
              : location.pathname === "/foto/tambah"
              ? "Tambah Foto"
              : "Detail Album"}
          </p>
          {Object.keys(dataUser).length > 0 ? (
            <div className="flex items-center gap-2">
              <p>{dataUser.username}</p>
              <button className="text-red-500">
                <IconLogout onClick={handleLogout} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="italic underline text-blue-500">
                Login
              </Link>
              <Link to="/registrasi" className="italic underline text-blue-500">
                Registrasi
              </Link>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
