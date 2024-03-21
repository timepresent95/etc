import { ChevronDownIcon } from "@heroicons/react/16/solid";
import styles from "./TextEditor.module.scss";
import { Popup, PopupButton, PopupContent } from "@/components/common/Popup";

export default function FontSizePopup() {
  return (
    <Popup>
      <PopupButton className="button-light-gray  flex h-6 rounded p-1">
        <span className="w-6">Aa</span>
        <ChevronDownIcon className="h-4 w-4" />
      </PopupButton>
      <PopupContent>
        <div
          className={`${styles.selector} absolute left-0 top-6 grid w-52 grid-rows-7 rounded bg-white py-1 shadow-lg`}
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
      </PopupContent>
    </Popup>
  );
}
