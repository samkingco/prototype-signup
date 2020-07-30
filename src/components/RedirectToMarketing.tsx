import { useEffect } from "react";

export function RedirectToMarketing() {
  useEffect(() => {
    (window.location as any) = "/echo.html";
  }, []);

  return null;
}
