import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  ListBulletIcon,
  LinkIcon,
  PhotoIcon,
  PlusIcon,
  PaperClipIcon,
  ArrowLongDownIcon,
} from "@heroicons/react/16/solid";
import styles from "./TextEditor.module.scss";
import { SyntheticEvent, useRef, useState } from "react";

export default function TextEditor() {
  const editorEl = useRef<HTMLDivElement>(null);
  const [isVisiblePlaceholder, setIsVisiblePlaceholder] = useState(true);
  const [isFocus, setIsFocus] = useState(true);

  // const onBlurHandler = (e: SyntheticEvent<HTMLDivElement>) => {
  //   console.log(e.target, "blur");
  // };

  // const onInputHandler = (e: ChangeEvent<HTMLDivElement>) => {
  //   if (
  //     e.target.classList.contains("placeholder") &&
  //     e.target.innerText.replace("Need formatting help? Type /help", "")
  //       .length > 0
  //   ) {
  //     const textLine = (
  //       <p
  //         contentEditable={true}
  //         suppressContentEditableWarning={true}
  //         key={0}
  //         className={styles.paragraph}
  //       >
  //         {e.target.innerText.replace("Need formatting help? Type /help", "")}
  //       </p>
  //     );
  //     setElements([textLine]);
  //   }
  // };

  const onSelectHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (isVisiblePlaceholder) {
      const range = document.createRange();
      range.setStart(target, 0);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const onInput = (e: SyntheticEvent) => {
    const editor = editorEl.current;
    if (editor === null) {
      return;
    }
    console.log(editor.innerText.length, editor.innerText);
    if (editor.innerText.length === 0 || editor.innerText === "\n") {
      editor.innerHTML = `<p><span class='placeholder-decoration' contentEditable='false'>Need formatting help? Type /help.</span></p>`;
      return setIsVisiblePlaceholder(true);
    }
    editor.querySelector(".placeholder-decoration")?.remove();
    return setIsVisiblePlaceholder(false);
  };

  return (
    <section
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      className={`${isFocus && "focus-line-shadow"} relative rounded border border-stone-200 bg-white p-1`}
    >
      <div className="sibling flex items-center border-b-2 border-stone-200 p-2 font-extrabold leading-4 text-black">
        <button className="button-light-gray  flex h-6 rounded p-1 ">
          <span className="w-6">Aa</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="vertical-line mx-2 my-1 self-stretch"></div>
        <button className="button-light-gray h-6 w-6 rounded p-1 text-center">
          B
        </button>
        <button className="button-light-gray h-6 w-6 rounded p-1 text-center italic">
          I
        </button>
        <button className="button-light-gray rounded p-1">
          <EllipsisHorizontalIcon className="h-4 w-4" />
        </button>
        <div className="vertical-line mx-2 my-1 self-stretch"></div>
        <button className="button-light-gray flex rounded p-1">
          <ListBulletIcon className="h-4 w-4" />
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="vertical-line mx-2 my-1 self-stretch"></div>
        <button className="button-light-gray flex rounded p-1">
          <LinkIcon className="h-4 w-4" />
        </button>
        <button className="button-light-gray flex rounded p-1">
          <PhotoIcon className="h-4 w-4" />
        </button>
        <button className="button-light-gray flex rounded p-1">
          <PlusIcon className="h-4 w-4" />
          <ChevronDownIcon className="h-4 w-4" />
        </button>
        <div className="ml-auto flex">
          <button className="button-light-gray h-8 w-8 rounded p-1">
            <PaperClipIcon className="mx-auto h-4 w-4" />
          </button>
          <button className="button-light-gray relative flex h-8 w-8 items-center justify-center rounded p-1">
            <span className="translate-x-1 text-xs leading-3">M</span>
            <ArrowLongDownIcon className="mx-auto  h-3 w-3" />
          </button>
          <button className="button-light-gray h-8 w-8 rounded p-1">
            <span className="w-6">?</span>
          </button>
        </div>
      </div>
      <div
        className={`${styles.editor} sibling min-h-56 w-full whitespace-pre-wrap break-words p-5`}
        contentEditable="true"
        aria-multiline="true"
        role="textbox"
        translate="no"
        data-gramm="false"
        suppressContentEditableWarning={true}
        onSelect={onSelectHandler}
        onInput={onInput}
        ref={editorEl}
      >
        <p>
          <span className="placeholder-decoration" contentEditable={false}>
            Need formatting help ? Type /help
          </span>
        </p>
      </div>
    </section>
  );
}
