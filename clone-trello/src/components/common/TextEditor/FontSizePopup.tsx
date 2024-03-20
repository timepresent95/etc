import { SafePopupContext } from "@/contexts";
import styles from "./TextEditor.module.scss";
import { useClickOutside } from "@/hook";

interface Props {
  ignoreClickOutsideClassName: string;
}

export default function FontSizePopup({ ignoreClickOutsideClassName }: Props) {
  const { isVisible, setIsVisible, popupEl, position } =
    SafePopupContext.Context();

  function hideFontSizePopup() {
    setIsVisible(false);
  }

  useClickOutside(popupEl!, hideFontSizePopup, [ignoreClickOutsideClassName]);

  return isVisible ? (
    <div
      ref={popupEl}
      className={`${styles.selector} absolute grid w-52 grid-rows-7 rounded bg-white py-1 shadow-lg`}
      style={{ top: position.top + "px", left: position.left + "px" }}
    >
      <div className={styles.selected}>
        <span>Normal text</span>
        <span className={`${styles["short-cut"]}`}>⌘⌥0</span>
      </div>
      <div className="">
        <h1>Heading 1</h1>
        <span className={`${styles["short-cut"]}`}>⌘⌥1</span>
      </div>
      <div>
        <h2>Heading 2</h2>
        <span className={`${styles["short-cut"]}`}>⌘⌥2</span>
      </div>
      <div>
        <h3>Heading 3</h3>
        <span className={`${styles["short-cut"]}`}>⌘⌥3</span>
      </div>
      <div>
        <h4>Heading 4</h4>
        <span className={`${styles["short-cut"]}`}>⌘⌥4</span>
      </div>
      <div>
        <h5>Heading 5</h5>
        <span className={`${styles["short-cut"]}`}>⌘⌥5</span>
      </div>
      <div>
        <h6>Heading 6</h6>
        <span className={`${styles["short-cut"]}`}>⌘⌥6</span>
      </div>
    </div>
  ) : null;
}
