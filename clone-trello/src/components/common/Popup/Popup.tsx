import { PropsWithChildren, createContext, useRef, useState } from "react";
import { useClickOutside } from "@/hook";

interface PopupContext {
  isOpen: boolean;
  showPopup: () => void;
}

export const PopupContext = createContext<PopupContext>({
  isOpen: false,
  showPopup: () => {},
});

export const Popup = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const showPopup = () => {
    setIsOpen(true);
  };

  const hidePopup = () => {
    setIsOpen(false);
  };

  useClickOutside(ref, hidePopup);

  return (
    <PopupContext.Provider value={{ isOpen, showPopup }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </PopupContext.Provider>
  );
};
