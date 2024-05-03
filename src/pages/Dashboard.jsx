import { IconLogout } from "@tabler/icons-react";
import API_URL from "../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "../customHooks/useFetchData";
export default function Dashboard() {
  const { data, loading, error } = useFetchData(API_URL + "/foto");

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {loading ? (
          <div className="bg-slate-400 animate-pulse"></div>
        ) : error ? (
          <div className="">Gagal Mengambil Data</div>
        ) : !data.status ? (
          <div className="">Tidak Ada Data</div>
        ) : (
          data.data.map((item, i) => (
            <Link to={'/foto/' + item.id}>
              <img
                src={API_URL + `/getFoto/${item.file}`}
                className="w-fit h-fit"
              />
            </Link>
          ))
        )}
      </div>
    </>
  );
}
