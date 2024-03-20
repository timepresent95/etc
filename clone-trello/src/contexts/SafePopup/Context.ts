import { Position } from "@/types";
import { createContext, useContext, RefObject } from "react";

interface SafePopupValue {
  setIsVisible: (v: boolean) => void;
  isVisible: boolean;
  position: Position;
  buttonEl?: RefObject<HTMLButtonElement>;
  popupEl?: RefObject<HTMLDivElement>;
}

export const SafePopupContext = createContext<SafePopupValue>({
  setIsVisible: () => {},
  isVisible: false,
  position: { left: -99999, top: -999999 },
});

export function useSafePopupContext() {
  return useContext(SafePopupContext);
}
