import InputProfileImg from "@/app/(root)/profile/edit/_components/input-profile-img";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchPatchUser } from "@/lib/api/user";
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

export default function ProfileEditForm({ 
  profile, setLoading, token, username
}: { 
  profile: User | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string | undefined;
  username: string | undefined;
}) {
  const [defaultName, setDefaultName] = useState<string | undefined>();
  const [defaultEmail, setDefaultEmail] = useState<string | undefined>();
  const [defaultDescription, setDefaultDescription] = useState<string | undefined>();
  const [defaultAddress, setDefaultAddress] = useState<string | undefined>();
  const [defaultWAUrl, setDefaultWAUrl] = useState<string | undefined>();
  const [defaultIGUrl, setDefaultIGUrl] = useState<string | undefined>();
  const [defaultFBUrl, setDefaultFBUrl] = useState<string | undefined>();
  const [defaultImgUrl, setDefaultImgUrl] = useState<string | undefined>();
  const [defaultImgId, setDefaultImgId] = useState<string | undefined>();
  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (profile) {
      setDefaultName(profile.name);
      setDefaultEmail(profile.email);
      setDefaultAddress(profile.address);
      setDefaultDescription(profile.description);
      setDefaultWAUrl(profile.whatsapp_url);
      setDefaultIGUrl(profile.instagram_url);
      setDefaultFBUrl(profile.facebook_url);
      setDefaultImgUrl(profile.profile_img_url);
      setDefaultImgId(profile.profile_img_public_id);
    }
  }, [profile]);

  const handlleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await fetchPatchUser({
      setLoading,
      token,
      username,
      userProps: {
        name: defaultName === profile?.name ? undefined : defaultName,
        email: defaultEmail === profile?.email ? undefined : defaultEmail,
        description: defaultDescription === profile?.description ? undefined : defaultDescription,
        address: defaultAddress === profile?.address ? undefined : defaultAddress,
        instagram_url: defaultIGUrl === profile?.instagram_url ? undefined : defaultIGUrl,
        facebook_url: defaultFBUrl === profile?.facebook_url ? undefined : defaultFBUrl,
        whatsapp_url: defaultWAUrl=== profile?.whatsapp_url ? undefined : defaultWAUrl,
        profile_img_file: newImageFile,
        profile_img_url: defaultImgUrl === profile?.profile_img_url ? undefined : defaultImgUrl,
        profile_img_public_id: defaultImgId === profile?.profile_img_public_id ? undefined : defaultImgId
      }
    })
  }

  return (
    <form onSubmit={handlleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2 flex justify-center items-center">
      <InputProfileImg
          defaultImage={{ url: defaultImgUrl, setUrl: setDefaultImgUrl }}
          newImageFile={{ file: newImageFile, setFile: setNewImageFile }}
        />
      </div>
      <Label
        htmlFor={"name"}
        className={cn(
          "flex cursor-not-allowed justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Nama</span>
        <Input
          type="text"
          id="name"
          onChange={(e) => setDefaultName(e.target.value)}
          placeholder="Masukkan nama"
          defaultValue={profile?.name}
        />
      </Label>
      <Label
        htmlFor={"email"}
        className={cn(
          "flex cursor-not-allowed justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Email</span>
        <Input
          type="email"
          onChange={(e) => setDefaultEmail(e.target.value)}
          placeholder="Masukkan email"
          defaultValue={profile?.email}
        />
      </Label>
      <Label
        htmlFor={"whatsapp_url"}
        className={cn(
          "flex cursor-not-allowed justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Whatsapp Url</span>
        <Input
          type="text"
          id="whatsapp_url"
          onChange={(e) => setDefaultWAUrl(e.target.value)}
          placeholder="Masukkan url whatsapp"
          defaultValue={profile?.whatsapp_url}
        />
      </Label>
      <Label
        htmlFor={"instagram_url"}
        className={cn(
          "flex cursor-not-allowed justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Instagram Url</span>
        <Input
        id="instagram_url"
          type="text"
          onChange={(e) => setDefaultIGUrl(e.target.value)}
          placeholder="Masukkan url instagram"
          defaultValue={profile?.instagram_url}
        />
      </Label>
      <Label
        htmlFor={"facebook_url"}
        className={cn(
          "flex cursor-not-allowed justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Facebook Url</span>
        <Input
        id="facebook_url"
          type="text"
          placeholder="Masukkan url facebook"
          onChange={(e) => setDefaultFBUrl(e.target.value)}
          defaultValue={profile?.facebook_url}
        />
      </Label>
      <Label
        htmlFor={"address"}
        className={cn(
          "flex cursor-not-allowed justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Alamat</span>
        <Input
          type="text"
          id="address"
          placeholder="Masukkan alamat"
          onChange={(e) => setDefaultAddress(e.target.value)}
          defaultValue={profile?.address}
        />
      </Label>
      <Label
        htmlFor={"description"}
        className={cn(
          "flex cursor-not-allowed md:col-span-2 justify-start items-stretch gap-1 flex-col",
        )}
      >
        <span>Dekripsi</span>
        <Textarea
          id="description"
          placeholder="Masukkan deskripsi singkat..."
          onChange={(e) => setDefaultDescription(e.target.value)}
          defaultValue={profile?.description}
        />
      </Label>
      
      <div className="flex md:col-span-2  justify-end items-center gap-2">
        <Button className="cursor-pointer" variant="secondary" asChild>
          <Link href="/profile">Batal</Link>
        </Button>
        <Button className="cursor-pointer">Perbaharui profile</Button>
      </div>
    </form>
  );
}
