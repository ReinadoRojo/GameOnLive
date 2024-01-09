import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

// TODO: Add this encryption feature to stream backend

/*

import crypto from "node:crypto";

export const enc = (sid: string, token: string) => {
  const rawstr = `${sid}:${token}`; // streamid:viewertocken -> row text
  const b64str = Buffer.from(rawstr).toString("base64");
  const hstr = crypto.createHash("whirlpool").update(b64str).digest("hex");

  return hstr;
};

export const dec = (hstr: string) => {
  const b64str = crypto.createHash("whirlpool").update(hstr).digest("base64");
  const rawstr = Buffer.from(b64str, "base64").toString("utf-8");

  return [rawstr, rawstr.split(":")[0], rawstr.split(":")[1]];
};

*/
