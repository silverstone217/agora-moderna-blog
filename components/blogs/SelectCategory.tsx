"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoriesData } from "@/utils/data";

type Props = {
  disabled: boolean;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const SelectCategory = ({ category, disabled, setCategory }: Props) => {
  return (
    <Select
      disabled={disabled}
      defaultValue={category}
      onValueChange={(val) => setCategory(val)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choisir une categorie" />
      </SelectTrigger>
      <SelectContent>
        {CategoriesData.map((item, idx) => (
          <SelectItem value={item.value} key={idx}>
            <item.icon className="shrink-0 mr-2" />
            <span>{item.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
