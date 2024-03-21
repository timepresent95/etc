import { PropsWithChildren, useContext } from "react";
import { PopupContext } from "./Popup";

export default function PopupContent({ children }: PropsWithChildren) {
  const { isOpen } = useContext(PopupContext);

  return isOpen ? <>{children}</> : null;
}
