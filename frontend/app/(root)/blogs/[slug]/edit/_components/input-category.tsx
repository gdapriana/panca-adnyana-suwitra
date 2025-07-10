import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlogCategory } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export default function InputCategory({
  availableBlogCategories,
  category,
  setCategory,
}: {
  availableBlogCategories: BlogCategory[] | undefined;
  category: BlogCategory | undefined;
  setCategory: Dispatch<SetStateAction<BlogCategory | undefined>>;
}) {
  return (
    <Label htmlFor="category" className="flex flex-col justify-start items-stretch gap-2">
      <span className="font-semibold">Kategori Blog</span>
      <Select
        value={category?.slug}
        onValueChange={(val) => {
          const selected = availableBlogCategories?.find((cat) => cat.slug === val);
          if (selected) setCategory(selected);
        }}
      >
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder={category?.name} />
        </SelectTrigger>
        <SelectContent>
          {availableBlogCategories?.map((category: BlogCategory, index: number) => {
            return (
              <SelectItem value={category.slug} key={index}>
                {category.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </Label>
  );
}
