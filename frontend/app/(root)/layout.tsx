import { ReactNode } from "react";
import Header from "@/app/_components/header/root";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col justify-start items-stretch">
      <Header />
      {children}
      <footer></footer>
    </main>
  );
}
