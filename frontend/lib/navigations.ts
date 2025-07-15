import { Navigation } from "@/lib/types";
import { Bug, Building, CalendarCheck, Home, ImageIcon, ListTreeIcon, Shield, UserCog } from "lucide-react";
import { BsEnvelope, BsPhone, BsPinMap } from "react-icons/bs";

export const navigations: Navigation[] = [
	{ name: "Beranda", icon: Home, href: "/" },
	{ name: "STT", icon: Building, href: "/stt" },
	{ name: "Struktur Kepengurusan", icon: ListTreeIcon, href: "/struktur" },
	{ name: "Blog", icon: ImageIcon, href: "/blogs" },
	{ name: "Event", icon: CalendarCheck, href: "/events" },
];

export const support: Navigation[] = [
	{ name: "Pusat Bantuan", icon: UserCog, href: "/support" },
	{ name: "Laporkan Bug", icon: Bug, href: "/bug" },
	{ name: "Privasi dan Keamanan", icon: Shield, href: "/privacy-poclice" },
];

export const contact: Navigation[] = [
	{ name: "pas.info@gmail.com", icon: BsEnvelope, href: "mailto:" },
	{ name: "+62 XXX XXXX XXXX", icon: BsPhone, href: "mailto:" },
	{ name: "Jl. Pantai Lebih, Br. Lebih Duur Kaja, Kec. Gianyar, Kab. Gianyar", icon: BsPinMap, href: "mailto:" },
];
