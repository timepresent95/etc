import { SafePopupContext } from "./Context";
import { FC, useState, PropsWithChildren, useRef, useEffect } from "react";

interface Position {
  top: number;
  left: number;
}

function calcPopupPosition(
  boundary: DOMRect,
  buttonRect: DOMRect,
  popupRect: DOMRect,
): Position {
  let top = buttonRect.bottom - boundary.top + 2;
  let left = buttonRect.left - boundary.left;

  const { clientWidth, clientHeight } = document.documentElement;

  if (boundary.left + left + popupRect.width > clientWidth) {
    const safeLeft = clientWidth - popupRect.width - boundary.left;
    left = safeLeft + boundary.left > 0 ? safeLeft : left;
  }

  if (boundary.top + top + popupRect.height > clientHeight) {
    const safeTop = clientHeight - popupRect.height - boundary.top;
    top = safeTop + boundary.top > 0 ? safeTop : top;
  }
  return { top, left };
}

export const SafePopupProvider: FC<
  PropsWithChildren & { boundaryEl?: HTMLElement }
> = ({ children, boundaryEl = document.body }) => {
  const buttonEl = useRef<HTMLButtonElement>(null);
  const popupEl = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({
    left: -99999,
    top: -999999,
  });

  useEffect(() => {
    if (buttonEl.current === null || popupEl.current === null) {
      return;
    }
    setPosition(
      calcPopupPosition(
        boundaryEl.getBoundingClientRect(),
        buttonEl.current.getBoundingClientRect(),
        popupEl.current.getBoundingClientRect(),
      ),
    );
  }, [boundaryEl, isVisible, setPosition]);

  return (
    <SafePopupContext.Provider
      value={{
        setIsVisible,
        isVisible,
        buttonEl,
        popupEl,
        position,
      }}
    >
      {children}
    </SafePopupContext.Provider>
  );
};
