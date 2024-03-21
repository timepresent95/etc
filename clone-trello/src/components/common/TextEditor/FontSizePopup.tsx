import { FontSize } from "@/types";
import styles from "./TextEditor.module.scss";

interface Props {
  onClick: (fontSize: FontSize) => void;
}

export default function FontSizePopup({ onClick }: Props) {
  return (
    <>
      <div className={styles.selected} onClick={() => onClick("normal")}>
        <span>Normal text</span>
        <span className={`${styles["short-cut"]}`}>⌘⌥0</span>
      </div>
      <div onClick={() => onClick("h1")}>
        <h1>Heading 1</h1>
        <span className={`${styles["short-cut"]}`}>⌘⌥1</span>
      </div>
      <div onClick={() => onClick("h2")}>
        <h2>Heading 2</h2>
        <span className={`${styles["short-cut"]}`}>⌘⌥2</span>
      </div>
      <div onClick={() => onClick("h3")}>
        <h3>Heading 3</h3>
        <span className={`${styles["short-cut"]}`}>⌘⌥3</span>
      </div>
      <div onClick={() => onClick("h4")}>
        <h4>Heading 4</h4>
        <span className={`${styles["short-cut"]}`}>⌘⌥4</span>
      </div>
      <div onClick={() => onClick("h5")}>
        <h5>Heading 5</h5>
        <span className={`${styles["short-cut"]}`}>⌘⌥5</span>
      </div>
      <div onClick={() => onClick("h6")}>
        <h6>Heading 6</h6>
        <span className={`${styles["short-cut"]}`}>⌘⌥6</span>
      </div>
    </>
  );
}
