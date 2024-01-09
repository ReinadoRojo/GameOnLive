"use client";

import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export const VolumeControl = ({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAbvoveHalf = value > 50;

  let Icon = Volume1Icon;

  if (isMuted) Icon = VolumeXIcon;
  if (isAbvoveHalf) Icon = Volume2Icon;

  const label = isMuted ? "Unmute" : "Mute";

  const handleChannge = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className='flex items-center gap-2'>
      <Hint
        label={label}
        asChild
      >
        <button
          onClick={onToggle}
          className='text-white hover:bg-white/10 rounded-lg p-1.5'
        >
          <Icon className='h-6 w-6' />
        </button>
      </Hint>
      <Slider
        className='w-[8rem] cursor-pointer'
        onValueChange={handleChannge}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};
