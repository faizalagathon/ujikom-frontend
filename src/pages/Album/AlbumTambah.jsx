import { IconLoader2, IconLogout, IconPlus } from "@tabler/icons-react";
import API_URL from "../../config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import InputField from "../../components/InputField";
import axios from "axios";
export default function AlbumTambah() {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    user_id: JSON.parse(sessionStorage.getItem("dataUser")).id,
    tanggal: new Date(),
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [messageErrorValidasi, setMessageErrorValidasi] = useState({});

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setMessageErrorValidasi({});
    try {
      const response = await axios.post(API_URL + "/album", formData);
      console.log(response);
      if (response.status === 201) {
        alert('Berhasil Menambah Album')
        navigate('/album')
      }
    } catch (error) {
      console.error(error);
      setMessageErrorValidasi(error.response.data.errors ?? '');
    }
    setLoadingSubmit(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <InputField
          labelContent="Nama"
          id="nama"
          value={formData.nama}
          onChange={handleInputChange}
        />
        {Object.keys(messageErrorValidasi).length > 0 &&
          messageErrorValidasi.nama && (
            <p className="text-sm text-red-500">
              * {messageErrorValidasi.nama}
            </p>
          )}

        <div className="flex flex-col">
          <label htmlFor="deskripsi">Deskripsi :</label>
          <textarea
            name="deskripsi"
            id="deskripsi"
            cols="30"
            rows="3"
            value={formData.deskripsi}
            onChange={handleInputChange}
            className="border border-slate-400 focus:border-slate-600 focus:outline-none p-1"
          ></textarea>
        </div>
        {Object.keys(messageErrorValidasi).length > 0 &&
          messageErrorValidasi.deskripsi && (
            <p className="text-sm text-red-500">
              * {messageErrorValidasi.deskripsi}
            </p>
          )}

        <button
          onClick={handleSubmit}
          className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md"
        >
          {loadingSubmit ? <IconLoader2 className="animate-spin" /> : <IconPlus />}
          Tambah Album
        </button>
      </div>
    </>
  );
}
