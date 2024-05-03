import {
	IconEdit,
	IconLoader2,
	IconLogout,
	IconPencil,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import API_URL from "../../config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import InputField from "../../components/InputField";
import axios from "axios";
export default function Album() {
	const { data, loading, error, handleRefetch } = useFetchData(
		API_URL +
			"/album/user/" +
			JSON.parse(sessionStorage.getItem("dataUser")).id
	);

	const [formData, setFormData] = useState({
		nama: "",
		deskripsi: "",
		user_id: JSON.parse(sessionStorage.getItem("dataUser")).id,
		tanggal: new Date(),
	});
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [messageErrorValidasi, setMessageErrorValidasi] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleTambah = async () => {
		setLoadingSubmit(true);
		setMessageErrorValidasi({});
		try {
			const response = await axios.post(API_URL + "/album", formData);
			// console.log(response);
			if (response.status === 201) {
				alert("Berhasil Menambah Album");
				handleRefetch();
				setFormData({
					nama: "",
					deskripsi: "",
					user_id: JSON.parse(sessionStorage.getItem("dataUser")).id,
					tanggal: new Date(),
				});
			}
		} catch (error) {
			console.error(error);
			setMessageErrorValidasi(error.response.data.errors);
		}
		setLoadingSubmit(false);
	};

	const [idEdit, setIdEdit] = useState(null);
	const setDataEdit = (item) => {
		setIdEdit(item.id);
		setFormData({
			...formData,
			nama: item.nama,
			deskripsi: item.deskripsi,
		});
	};
	const setDataTambah = () => {
		setIdEdit(null);
		setFormData({
			...formData,
			nama: "",
			deskripsi: "",
		});
	};
	const handleEdit = async () => {
		setLoadingSubmit(true);
		setMessageErrorValidasi({});
		try {
			const response = await axios.patch(
				API_URL + "/album/" + idEdit,
				formData
			);
			console.log(response);
			if (response.status === 200) {
				alert("Berhasil Mengedit Album");
				handleRefetch();
				setFormData({
					...formData,
					nama: "",
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
				const response = await axios.delete(API_URL + "/album/" + id);
				console.log(response);
				if (response.status === 200) {
					alert("Berhasil Menghapus Album");
					handleRefetch();
				}
			} catch (error) {
				console.error(error);
			}
			setIdHapus(null);
			setLoadingHapus(false);
		}
	};
	return (
		<div className="flex w-full gap-3">
			<div className="w-auto">
				{idEdit ? (
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
							onClick={handleEdit}
							className="flex justify-center items-center w-full bg-yellow-500 text-white p-2 rounded-md"
						>
							{loadingSubmit ? (
								<IconLoader2 className="animate-spin" />
							) : (
								<IconPencil />
							)}
							Edit Album
						</button>

						<button
							onClick={setDataTambah}
							className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md"
						>
							<IconPlus />
							Tambah Data
						</button>
					</div>
				) : (
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
							onClick={handleTambah}
							className="flex justify-center items-center w-full bg-blue-500 text-white p-2 rounded-md"
						>
							{loadingSubmit ? (
								<IconLoader2 className="animate-spin" />
							) : (
								<IconPlus />
							)}
							Tambah Album
						</button>
					</div>
				)}
			</div>
			<div className="flex-1">
				<div className="flex flex-col gap-2">
					{loading ? (
						<div className="flex justify-center">
							<IconLoader2 className="animate-spin" />
						</div>
					) : error ? (
						<div className="">Gagal Mengambil Data</div>
					) : !data.status ? (
						<div className="">Tidak Ada Data</div>
					) : (
						data.data.map((item, i) => (
							<div
								key={i}
								className="border bg-slate-300 w-full p-2 flex"
							>
								<Link
									to={`/album/${item.id}`}
									className="flex-1"
								>
									<p className="font-bold">{item.nama}</p>
									<p className="text-sm">{item.deskripsi}</p>
								</Link>
								<div className="flex text-white gap-2">
									<button
										onClick={() => setDataEdit(item)}
										className="p-1 bg-yellow-500 rounded-md"
									>
										<IconPencil />
									</button>
									<button
										onClick={() => {
											handleHapus(item.id);
										}}
										className="p-1 bg-red-500 rounded-md"
									>
										{idHapus === item.id && loadingHapus ? (
											<IconLoader2 className="animate-spin" />
										) : (
											<IconTrash />
										)}
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
