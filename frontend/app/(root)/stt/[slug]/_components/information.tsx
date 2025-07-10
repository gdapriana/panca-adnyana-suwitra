import { Stt } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { MdEvent, MdPostAdd } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

export default function SttInformation({ stt }: { stt: Stt }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">
        <FaUserFriends />
        {stt._count?.stt_membership} Anggota
      </Badge>
      <Badge variant="outline">
        <MdEvent />
        {stt._count?.events} Event
      </Badge>
      <Badge variant="outline">
        <MdPostAdd />
        {stt._count?.blogs} Blog
      </Badge>
    </div>
  );
}
