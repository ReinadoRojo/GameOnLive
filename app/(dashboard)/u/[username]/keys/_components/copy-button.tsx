"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckCheckIcon, CopyIcon } from "lucide-react";

interface CopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const Icon = isCopied ? CheckCheckIcon : CopyIcon;

  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant={"ghost"}
      size={"icon"}
    >
      <Icon className='h-4 w-4' />
    </Button>
  );
};
