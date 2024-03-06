import { IconLogout, IconPlus } from "@tabler/icons-react";
import API_URL from "../../config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
export default function Album() {
  const { data, loading, error } = useFetchData(
    API_URL + "/album/user/" + JSON.parse(sessionStorage.getItem("dataUser")).id
  );
  return (
    <>
      <Link
        to="/album/tambah"
        className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md mb-3"
      >
        <IconPlus /> Tambah Album
      </Link>
      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="bg-slate-400 animate-pulse"></div>
        ) : error ? (
          <div className="">Gagal Mengambil Data</div>
        ) : !data.status ? (
          <div className="">Tidak Ada Data</div>
        ) : (
          data.data.map((item, i) => (
            <Link to={`/album/${item.id}`} className="border bg-slate-300 w-full p-2">
              <p className="font-bold">{item.nama}</p>
              <p className="text-sm">{item.deskripsi}</p>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
