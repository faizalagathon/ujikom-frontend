import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

          <InputField
            labelContent={"Password"}
            id={"password"}
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button className="bg-blue-500 text-white p-1 rounded-md mt-2">Login</button>

          <Link to='/registrasi' className="italic underline text-sm text-center">
            Tidak punya akun?
          </Link>
        </div>
      </div>
    </>
  );
}
