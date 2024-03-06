import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useState } from "react";
import axios from "axios";
import API_URL from "../../config";
import { IconLoader2 } from "@tabler/icons-react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await axios.post(API_URL + "/user/login", formData);
      console.log(response);
      if (response.data.status) {
        alert("Berhasil Login");
        sessionStorage.setItem('dataUser', JSON.stringify(response.data.dataUser))
        navigate('/')
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
        <div className="bg-slate-300 p-5 rounded-lg flex flex-col gap-2">
          <p className="text-2xl">Login Page</p>

          <InputField
            labelContent={"Username"}
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
            labelContent={"Password"}
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

          <button
            onClick={handleSubmit}
            className="bg-blue-500 flex justify-center items-center text-white p-1 rounded-md mt-2"
          >
            {loadingSubmit ? (
              <IconLoader2 className="animate-spin" />
            ) : (
              <>Login</>
            )}
          </button>

          <Link
            to="/registrasi"
            className="italic underline text-sm text-center"
          >
            Tidak punya akun?
          </Link>
        </div>
      </div>
    </>
  );
}
