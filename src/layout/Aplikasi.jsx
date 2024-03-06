import { Link, Outlet } from "react-router-dom";

export default function Aplikasi() {
  return (
    <div className="flex">
      <div className="bg-slate-300 p-2 min-h-screen">
        <p className="text-2xl mb-4">Galery Foto</p>
        <div className="flex flex-col gap-2">
          <Link>Dashboard</Link>
          <Link>Album</Link>
          <Link>Foto</Link>
        </div>
      </div>
      <div className="flex-1 bg-white p-3">
        <Outlet />
        
      </div>
    </div>
  );
}
