"use client";
import { SttMembership, User } from "@/lib/types";
import { Crown, Trash2, UserX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import moment from "moment";
import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import AlertDeleteAnggota from "@/app/(root)/stt/[slug]/_components/alert-delete-anggota";
import { useState } from "react";
import Empty from "@/app/_components/empty";
import { TbDatabaseOff } from "react-icons/tb";

export default function PageAnggota({
  memberships,
}: {
  memberships: SttMembership[];
}) {
  const { authenticated, loading, role, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  if (loading || isLoading) return <CustomLoading />;

  return (
    <main className="flex justify-center items-stretch flex-col">
      {memberships.length === 0 && (
        <div className="w-full h-40 flex justify-center items-center">
          <UserX /> Tidak ada anggota
        </div>
      )}

      {memberships.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sebagai</TableHead>
              <TableHead>Bergabung pada</TableHead>
              <TableHead>Sosial Media</TableHead>
              {authenticated && (role === "ADMIN" || role === "SUPERADMIN") && (
                <TableHead>Aksi</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberships.map((member: SttMembership, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{member.user.name}</TableCell>
                  <TableCell>{member.username}</TableCell>
                  <TableCell>{member.user.email}</TableCell>
                  <TableCell>
                    {member.role === "LEADER" && (
                      <Badge>
                        <Crown /> Ketua
                      </Badge>
                    )}
                    {member.role === "VICE" && <Badge> Wakil</Badge>}
                    {member.role === "TREASURES" && <Badge> Bendahara</Badge>}
                    {member.role === "SECRETARY" && <Badge> Sekretaris</Badge>}
                    {member.role === "MEMBER" && (
                      <Badge variant="secondary"> Anggota</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {moment(member.join_date).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    {member.user.instagram_url && (
                      <Badge asChild>
                        <Link href={member.user.instagram_url}>
                          <BsInstagram />
                          IG
                        </Link>
                      </Badge>
                    )}
                    {member.user.facebook_url && (
                      <Badge asChild>
                        <Link href={member.user.facebook_url}>
                          <BsFacebook />
                          FB
                        </Link>
                      </Badge>
                    )}
                    {member.user.whatsapp_url && (
                      <Badge asChild>
                        <Link href={member.user.whatsapp_url}>
                          <BsWhatsapp />
                          WA
                        </Link>
                      </Badge>
                    )}
                  </TableCell>
                  {authenticated &&
                    (role === "ADMIN" || role === "SUPERADMIN") && (
                      <TableCell>
                        {member.role === "MEMBER" && (
                          <AlertDeleteAnggota
                            setLoading={setIsLoading}
                            token={user?.token}
                            username={member.username}
                          />
                        )}
                      </TableCell>
                    )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
          <Empty Icon={TbDatabaseOff} message="Tidak ada anggota" />
      )}
    </main>
  );
}
