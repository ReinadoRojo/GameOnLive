import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [identity, setIdentity] = useState<string>("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity); // 12:24
      } catch {
        toast.error("Something went wrong");
      }
    };
  }, []);
};
