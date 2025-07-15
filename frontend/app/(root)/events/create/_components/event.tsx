"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Role } from "@/lib/types";

export default function EventForm({ token, role }: { token: string; role: Role }) {
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [startDate, setStartDate] = useState<string>();
	const [endDate, setEndDate] = useState<string>();
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const validateDates = () => {
		if (!startDate || !endDate) return true;

		const start = new Date(startDate);
		const end = new Date(endDate);

		return start <= end;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!validateDates()) {
			toast.error("Tanggal berakhir tidak boleh sebelum tanggal mulai!");
			return;
		}

		try {
			setButtonDisabled(true);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${role === "USER" ? "sttevent" : "mainsttevent"}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-TOKEN": token,
				},
				body: JSON.stringify({
					name: title,
					description,
					start_date: startDate,
					end_date: endDate,
				}),
			});
			const data = await res.json();
			if (!res.ok) {
				toast.error(JSON.stringify(data.errors));
				return;
			}
			toast.success("berhasil membuat event");
		} catch (error) {
			toast.error("terjadi kesalahan saat mengirim permintaan.");
		} finally {
			setButtonDisabled(false);
		}
	};

	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newStartDate = e.target.value;
		setStartDate(newStartDate);

		if (endDate && new Date(newStartDate) > new Date(endDate)) {
			setEndDate("");
			toast.warning("Tanggal berakhir tidak boleh sebelum tanggal mulai!");
		}
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEndDate = e.target.value;

		if (startDate && new Date(newEndDate) < new Date(startDate)) {
			toast.error("Tanggal berakhir tidak boleh sebelum tanggal mulai!");
			return;
		}

		setEndDate(newEndDate);
	};

	return (
		<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
			<Label htmlFor="title" className="flex flex-col justify-start items-start">
				<span>Judul Event</span>
				<Input
					onChange={(e) => setTitle(e.target.value)}
					disabled={buttonDisabled}
					id="title"
					type="text"
					placeholder="Masukkan judul event..."
				/>
			</Label>

			<Label htmlFor="start_date" className="flex flex-col justify-start items-start">
				<span>Tanggal Mulai Event</span>
				<Input
					disabled={buttonDisabled}
					onChange={handleStartDateChange}
					value={startDate || ""}
					id="start_date"
					type="date"
					placeholder="Tanggal mulai event..."
				/>
			</Label>

			<Label htmlFor="end_date" className="flex flex-col justify-start items-start">
				<span>Tanggal Berakhir Event</span>
				<Input
					disabled={buttonDisabled}
					onChange={handleEndDateChange}
					value={endDate || ""}
					id="end_date"
					type="date"
					placeholder="Tanggal berakhir event..."
					min={startDate} // HTML5 validation - end date minimum adalah start date
				/>
			</Label>

			<Label htmlFor="description" className="flex md:col-span-3 flex-col justify-start items-start">
				<span>Deskripsi Event (Opsional)</span>
				<Textarea
					disabled={buttonDisabled}
					onChange={(e) => setDescription(e.target.value)}
					id="description"
					placeholder="Deskripsi event..."
				/>
			</Label>

			<Button disabled={buttonDisabled || !validateDates()} type="submit" className="">
				Buat event
			</Button>
		</form>
	);
}
