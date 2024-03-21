import { ButtonHTMLAttributes, PropsWithChildren, useContext } from "react";
import { PopupContext } from "./Popup";

export default function PopupButton({
  children,
  onClick = () => {},
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { showPopup } = useContext(PopupContext);

  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick(e);
        showPopup();
      }}
    >
      {children}
    </button>
  );
}
