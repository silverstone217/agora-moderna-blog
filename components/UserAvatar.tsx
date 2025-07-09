"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name?: string | null;
  image?: string | null;
};

const UserAvatar = ({ name, image }: Props) => {
  const shortName = name ? name.slice(0, 1) : "U";

  return (
    <Avatar>
      {image ? (
        <AvatarImage src={image} />
      ) : (
        <AvatarFallback>{shortName}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
