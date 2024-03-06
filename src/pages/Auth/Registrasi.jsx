import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useState } from "react";
import axios from "axios";
import API_URL from "../../config";
import { IconLoader2 } from "@tabler/icons-react";

export default function Registrasi() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nama_lengkap: "",
    alamat: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [messageErrorValidasi, setMessageErrorValidasi] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setMessageErrorValidasi({});
    try {
      const response = await axios.post(API_URL + "/user/registrasi", formData);
      console.log(response);
      if (response.data.status) {
        alert("Berhasil Registrasi");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setMessageErrorValidasi(error.response.data.errors);
    }
    setLoadingSubmit(false);
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="bg-slate-300 p-5 w-80 rounded-lg flex flex-col gap-2">
          <p className="text-2xl">Registrasi Page</p>

          <InputField
            labelContent={"Username :"}
            id={"username"}
            value={formData.username}
            onChange={handleInputChange}
          />
          {Object.keys(messageErrorValidasi).length > 0 &&
            messageErrorValidasi.username && (
              <p className="text-sm text-red-500">
                * {messageErrorValidasi.username}
              </p>
            )}

          <InputField
            labelContent={"Password :"}
            id={"password"}
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {Object.keys(messageErrorValidasi).length > 0 &&
            messageErrorValidasi.password && (
              <p className="text-sm text-red-500">
                * {messageErrorValidasi.password}
              </p>
            )}

          <InputField
            labelContent={"Email :"}
            id={"email"}
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {Object.keys(messageErrorValidasi).length > 0 &&
            messageErrorValidasi.email && (
              <p className="text-sm text-red-500">
                * {messageErrorValidasi.email}
              </p>
            )}

          <InputField
            labelContent={"Nama Lengkap :"}
            id={"nama_lengkap"}
            value={formData.nama_lengkap}
            onChange={handleInputChange}
          />
          {Object.keys(messageErrorValidasi).length > 0 &&
            messageErrorValidasi.nama_lengkap && (
              <p className="text-sm text-red-500">
                * {messageErrorValidasi.nama_lengkap}
              </p>
            )}

          <div className="flex flex-col">
            <label htmlFor="alamat">Alamat :</label>
            <textarea
              name="alamat"
              id="alamat"
              cols="30"
              rows="3"
              value={formData.alamat}
              onChange={handleInputChange}
              className="border border-slate-400 focus:border-slate-600 focus:outline-none p-1"
            ></textarea>
          </div>
          {Object.keys(messageErrorValidasi).length > 0 &&
            messageErrorValidasi.alamat && (
              <p className="text-sm text-red-500">
                * {messageErrorValidasi.alamat}
              </p>
            )}

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white flex justify-center items-center p-1 rounded-md mt-2"
          >
            {loadingSubmit ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>Registrasi</>
            )}
          </button>

          <Link to="/login" className="italic underline text-sm text-center">
            Sudah punya akun?
          </Link>
        </div>
      </div>
    </>
  );
}
