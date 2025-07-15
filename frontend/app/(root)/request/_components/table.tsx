import { JoinRequest } from "@/lib/types";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import AccDialog from "@/app/(root)/request/_components/acc-dialog";
import DeleteDialog from "@/app/(root)/request/_components/delete-dialog";

export default function RequestTable({ requests, token }: { requests: JoinRequest[]; token: string | undefined }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Username</TableHead>
					<TableHead>Nama</TableHead>
					<TableHead>Tanggal Pengajuan</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-center">Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{requests.map((request: JoinRequest, index: number) => {
					return (
						<TableRow key={index}>
							<TableCell className="font-medium">{request.username}</TableCell>
							<TableCell>{request.user.name}</TableCell>
							<TableCell>{moment(request.request_date).format("DD MMMM YYYY")}</TableCell>
							<TableCell>
								{request.is_acc ? (
									<Badge className="bg-green-500">Telah Disetujui pada {moment(request.acc_date).format("DD/MM/YYYY")}</Badge>
								) : (
									<Badge variant="secondary">Belum Disetujui</Badge>
								)}
							</TableCell>
							<TableCell className=" flex justify-center items-center gap-1">
								<AccDialog request={request} token={token} />
								<DeleteDialog request={request} token={token} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
