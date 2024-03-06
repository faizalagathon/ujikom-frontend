import { IconLoader2, IconLogout, IconPlus } from "@tabler/icons-react";
import API_URL from "../../config";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import InputField from "../../components/InputField";
import axios from "axios";
export default function AlbumDetail() {
  const param = useParams();
  const { data, loading, error } = useFetchData(
    API_URL + "/foto/album/" + param.id
  );

  return (
    <>
      <Link
        to="/foto/tambah"
        className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md mb-3"
      >
        <IconPlus /> Tambah Foto
      </Link>
      <div className="grid grid-cols-3 gap-2">
        {loading ? (
          <div className="bg-slate-400 animate-pulse"></div>
        ) : error ? (
          <div className="">Gagal Mengambil Data</div>
        ) : !data.status ? (
          <div className="">Tidak Ada Data</div>
        ) : (
          data.data.map((item, i) => (
            <Link>
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
