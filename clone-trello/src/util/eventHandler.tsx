import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void,
  ignore: string[] = [],
) => {
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        ref.current === null ||
        ref.current.contains(target) ||
        !ignore.every((v) => !target.classList.contains(v))
      ) {
        return;
      }
      onClickOutside();
    };
    if (ref.current !== null) {
      document.addEventListener("click", handler);
    }
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [ref, onClickOutside]);
};
