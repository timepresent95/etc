import { PropsWithChildren, useContext, HTMLAttributes } from "react";
import { PopupContext } from "./Popup";

export default function PopupContent({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const { isOpen, hidePopup } = useContext(PopupContext);

  return isOpen ? (
    <div onClick={hidePopup} {...rest}>
      {children}
    </div>
  ) : null;
}
