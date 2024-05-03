import { IconLoader2, IconLogout, IconPlus } from "@tabler/icons-react";
import API_URL from "../../config";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import InputField from "../../components/InputField";
import axios from "axios";
import { format } from 'date-fns';
export default function FotoTambah() {
	const param = useParams();

  const currentDate = new Date();

  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");

	const [formData, setFormData] = useState({
		judul: "",
		deskripsi: "",
		tanggal: formattedDate,
		file: null,
		album_id: param.id,
		user_id: JSON.parse(sessionStorage.getItem("dataUser")).id,
	});
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [messageErrorValidasi, setMessageErrorValidasi] = useState({});

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleInputFileChange = (e) => {
		setFormData({ ...formData, file: e.target.files[0] });
	};

	const handleSubmit = async () => {
		setLoadingSubmit(true);
		setMessageErrorValidasi({});
		const formDataToSubmit = new FormData();
		formDataToSubmit.append("judul", formData.judul);
		formDataToSubmit.append("deskripsi", formData.deskripsi);
		formDataToSubmit.append("tanggal", formData.tanggal);
		formDataToSubmit.append("file", formData.file);
		formDataToSubmit.append("album_id", formData.album_id);
		formDataToSubmit.append("user_id", formData.user_id);

		try {
			const response = await axios.post(API_URL + "/foto", formDataToSubmit, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(response);
			if (response.status === 201) {
				alert("Berhasil Menambah Foto");
				navigate("/album");
			}
		} catch (error) {
			console.error(error);
			setMessageErrorValidasi(error.response.data.errors ?? "");
		}
		setLoadingSubmit(false);
	};

	console.log(formData);

	return (
		<>
			<div className="flex flex-col gap-2">
				<InputField
					labelContent="Judul"
					id="judul"
					value={formData.judul}
					onChange={handleInputChange}
				/>
				{Object.keys(messageErrorValidasi).length > 0 &&
					messageErrorValidasi.judul && (
						<p className="text-sm text-red-500">
							* {messageErrorValidasi.judul}
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

				<InputField
					labelContent="Foto"
					type="file"
          id="file"
					onChange={handleInputFileChange}
				/>
				{Object.keys(messageErrorValidasi).length > 0 &&
					messageErrorValidasi.file && (
						<p className="text-sm text-red-500">
							* {messageErrorValidasi.file}
						</p>
					)}

				<button
					onClick={handleSubmit}
					className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md"
				>
					{loadingSubmit ? (
						<IconLoader2 className="animate-spin" />
					) : (
						<IconPlus />
					)}
					Tambah Foto
				</button>
			</div>
		</>
	);
}
