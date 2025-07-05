"use client";

import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { redirect } from "next/navigation";
import EventForm from "@/app/(root)/events/create/_components/event";

export default function CreateEventPage() {
  const { authenticated, loading, role, user } = useAuthContext();

  if (loading) return <CustomLoading />;
  if (!authenticated) {
    return redirect("/login");
  }
  if (role !== "ADMIN" && role !== "SUPERADMIN") {
    return redirect("/event");
  }

  return (
    <main className="flex justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
        <div className="mb-12">
          <h1 className="font-bold text-xl">Event Baru</h1>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            adipisci consectetur delectus distinctio earum eligendi esse
            exercitationem fuga illo ipsum modi mollitia porro quod recusandae
            totam veniam, vero! Alias error ipsam molestias neque nesciunt
            officia quibusdam recusandae temporibus voluptatem voluptatibus!
          </p>
        </div>
        <EventForm token={user!.token as string} role={role} />
      </div>
    </main>
  );
}
