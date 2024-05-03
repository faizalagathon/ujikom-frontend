import {
	IconLoader2,
	IconLogout,
	IconMessageCircle,
	IconPencil,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import API_URL from "../../config";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import InputField from "../../components/InputField";
import axios from "axios";
import { format } from "date-fns";

export default function AlbumDetail() {
	const param = useParams();
	const { data, loading, error, handleRefetch } = useFetchData(
		API_URL + "/foto/album/" + param.id
	);

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

	const handleTambah = async () => {
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
			const response = await axios.post(
				API_URL + "/foto",
				formDataToSubmit,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(response);
			if (response.status === 201) {
				alert("Berhasil Menambah Foto");
				handleRefetch();
				setFormData({
					...formData,
					judul: "",
					deskripsi: "",
					file: null,
				});
			}
		} catch (error) {
			console.error(error);
			setMessageErrorValidasi(error.response.data.errors ?? "");
		}
		setLoadingSubmit(false);
	};

	const [idEdit, setIdEdit] = useState(null);
	const setDataEdit = (item) => {
		setIdEdit(item.id);
		setFormData({
			...formData,
			judul: item.judul,
			deskripsi: item.deskripsi,
		});
	};
	const setDataTambah = () => {
		setIdEdit(null);
		setFormData({
			...formData,
			judul: "",
			deskripsi: "",
			file: null,
		});
	};
	const handleEdit = async () => {
		setLoadingSubmit(true);
		setMessageErrorValidasi({});
		try {
			const response = await axios.patch(
				API_URL + "/foto/" + idEdit,
				formData
			);
			console.log(response);
			if (response.status === 200) {
				alert("Berhasil Mengedit Foto");
				handleRefetch();
				setFormData({
					...formData,
					judul: "",
					deskripsi: "",
				});
			}
		} catch (error) {
			console.error(error);
			setMessageErrorValidasi(error.response.data.errors);
		}
		setLoadingSubmit(false);
	};

	const [loadingHapus, setLoadingHapus] = useState(false);
	const [idHapus, setIdHapus] = useState(null);
	const handleHapus = async (id) => {
		setIdHapus(id);
		if (confirm("Yakin Ingin Menghapus Data?")) {
			setLoadingHapus(true);
			try {
				const response = await axios.delete(API_URL + "/foto/" + id);
				console.log(response);
				if (response.status === 200) {
					alert("Berhasil Menghapus Foto");
					handleRefetch();
				}
			} catch (error) {
				console.error(error);
			}
		}
		setLoadingHapus(false);
	};

	return (
		<>
			<div className="flex w-full gap-3">
				<div className="w-auto">
					{idEdit ? (
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

							<button
								onClick={handleEdit}
								className="flex justify-center items-center w-full bg-yellow-500 text-white p-2 rounded-md"
							>
								{loadingSubmit ? (
									<IconLoader2 className="animate-spin" />
								) : (
									<IconPencil />
								)}
								Edit Foto
							</button>

							<button
								onClick={setDataTambah}
								className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md"
							>
								<IconPlus />
								Tambah Foto
							</button>
						</div>
					) : (
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
								onClick={handleTambah}
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
					)}
				</div>
				<div className="flex-1">
					{loading ? (
						<div className="flex justify-center">
							<IconLoader2 className="animate-spin" />
						</div>
					) : error ? (
						<div className="">Gagal Mengambil Data</div>
					) : !data.status ? (
						<div className="">Tidak Ada Data</div>
					) : (
						<div className="grid grid-cols-3 gap-2">
							{data.data.map((item, i) => (
								<div className="border p-1 border-slate-500">
									<img
										src={API_URL + `/getFoto/${item.file}`}
										className="w-fit h-fit"
									/>
									<p className="text-lg">{item.judul}</p>
									<p className="text-sm">{item.deskripsi}</p>
									<div className="flex justify-between">
										<div className="flex gap-2">
											<button
												onClick={() =>
													setDataEdit(item)
												}
												className="text-white p-1 rounded-md bg-yellow-500"
											>
												<IconPencil />
											</button>
											<button
												onClick={() =>
													handleHapus(item.id)
												}
												className="text-white p-1 rounded-md bg-red-500"
											>
												{idHapus === item.id &&
												loadingHapus ? (
													<IconLoader2 className="animate-spin" />
												) : (
													<IconTrash />
												)}
											</button>
										</div>
										<Link to={'/foto/' + item.id} className="text-white p-1 rounded-md bg-blue-500">
											<IconMessageCircle />
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
