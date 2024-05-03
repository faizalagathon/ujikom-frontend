import React, { useEffect, useState } from "react";
import useFetchData from "../../customHooks/useFetchData";
import API_URL from "../../config";
import axios from "axios";
import InputField from "../../components/InputField";
import {
	IconHeart,
	IconLoader2,
	IconPencil,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";

function Foto() {
	const param = useParams();

	const { data, loading, error, handleRefetch } = useFetchData(
		API_URL + "/foto/" + param.id
	);

	console.table({ data });

	const [formData, setFormData] = useState({
		isi: "",
		foto_id: param.id,
		user_id: JSON.parse(sessionStorage.getItem("dataUser")).id,
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
			const response = await axios.post(API_URL + "/komentar", formData);
			// console.log(response);
			if (response.status === 201) {
				alert("Berhasil Menambah Komentar");
				handleRefetch();
				setFormData({
					...formData,
					isi: "",
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
				const response = await axios.delete(
					API_URL + "/komentar/" + id
				);
				console.log(response);
				if (response.status === 200) {
					alert("Berhasil Menghapus Komentar");
					handleRefetch();
				}
			} catch (error) {
				console.error(error);
			}
			setIdHapus(null);
			setLoadingHapus(false);
		}
	};

	const [isLiked, setIsLiked] = useState(null);
	const [loadingIsLiked, setLoadingIsLiked] = useState(true);
	const [isToggleLike, setIsToggleLike] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoadingIsLiked(true);
			try {
				const response = await axios
					.get(
						`${API_URL}/like/check/${
							JSON.parse(sessionStorage.getItem("dataUser")).id
						}/${param.id}`
					)
					.then((response) => {
						setIsToggleLike(response.data.status);
					});
				setIsLiked(response.data.status);
			} catch (error) {
				console.error(error);
			}
			setLoadingIsLiked(false);
		};
		fetchData();
	}, [param.id]);

	const [loadingLike, setLoadingLike] = useState(false);
	const handleLike = async () => {
		setLoadingLike(true);
		try {
			const response = await axios.post(API_URL + "/like", {
				id_foto: param.id,
				id_user: JSON.parse(sessionStorage.getItem("dataUser")).id,
			});
			console.log(response);
			if (response.status === 200) {
				handleRefetch();
				setIsToggleLike(!isToggleLike);
			}
		} catch (error) {
			console.error(error);
		}
		setLoadingLike(false);
	};
	return (
		<div className="flex w-full gap-3">
			<div className="w-72">
				<div className="border p-1 border-slate-500">
					<img
						src={API_URL + `/getFotoById/${param.id}`}
						className="w-fit h-fit mb-3"
					/>
					<button
						className={`bg-pink-500 text-white rounded-md flex p-1 gap-2 items-center`}
						onClick={handleLike}
						disabled={loadingLike || loadingIsLiked}
					>
						{loadingLike || loadingIsLiked ? (
							<IconLoader2 className="animate-spin" />
						) : isToggleLike ? (
							<IconHeartFilled />
						) : (
							<IconHeart />
						)}
						{data?.jumlahLike}
					</button>
				</div>
			</div>
			<div className="flex-1">
				<div className="flex gap-2 mb-3">
					<InputField
						id="isi"
						onChange={handleInputChange}
						value={formData.isi}
						type="text"
					/>
					<button
						onClick={handleTambah}
						className="bg-blue-500 p-1 text-white rounded-md"
					>
						{loadingSubmit ? (
							<IconLoader2 className="animate-spin" />
						) : (
							<IconMessageCircle />
						)}
					</button>
				</div>
				<div className="flex flex-col gap-2">
					{loading ? (
						<div className="flex justify-center">
							<IconLoader2 className="animate-spin" />
						</div>
					) : error ? (
						<div className="border bg-slate-300 w-full p-2 font-bold">
							Gagal Mengambil Data
						</div>
					) : data?.komentar?.length === 0 ? (
						<div className="border bg-slate-300 w-full p-2 font-bold">
							Tidak Ada Data
						</div>
					) : (
						data?.komentar?.map((item, i) => (
							<div
								key={i}
								className="border bg-slate-300 w-full p-2 flex"
							>
								<div className="flex-1">
									<p>{item.isi}</p>
								</div>
								<div className="flex text-white gap-2">
									{item.user_id ===
										JSON.parse(
											sessionStorage.getItem("dataUser")
										).id && (
										<button
											onClick={() => {
												handleHapus(item.id);
											}}
											className="p-1 bg-red-500 rounded-md"
										>
											{idHapus === item.id &&
											loadingHapus ? (
												<IconLoader2 className="animate-spin" />
											) : (
												<IconTrash />
											)}
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default Foto;
