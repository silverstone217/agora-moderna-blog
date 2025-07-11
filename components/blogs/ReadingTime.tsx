import { estimateReadingTime } from "@/utils/functions";
import React from "react";

type Props = {
  content: string;
};

export const ReadingTime = ({ content }: Props) => {
  const time = estimateReadingTime(content);

  return (
    <p className="text-sm text-muted-foreground">
      Temps de lecture : <span className="text-amber-600">{time}</span>
    </p>
  );
};
