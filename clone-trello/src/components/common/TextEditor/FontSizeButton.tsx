import { SafePopupContext } from "@/contexts";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface Props {
  className: string;
}

export default function FontSizeButton({ className }: Props) {
  const { setIsVisible, buttonEl } = SafePopupContext.Context();

  function showFontSizePopup() {
    setIsVisible(true);
  }

  return (
    buttonEl && (
      <button
        ref={buttonEl}
        onClick={showFontSizePopup}
        className={`${className} button-light-gray flex h-6 rounded p-1`}
      >
        <span className="w-6">Aa</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>
    )
  );
}
