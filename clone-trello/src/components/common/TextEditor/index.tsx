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
import FontSizePopup from "./FontSizePopup";
import { FontSize } from "@/types";
import { Popup, PopupButton, PopupContent } from "@/components/common/Popup";

export default function TextEditor() {
  const editorEl = useRef<HTMLDivElement>(null);
  const [isVisiblePlaceholder, setIsVisiblePlaceholder] = useState(true);
  const [isFocus, setIsFocus] = useState(true);

  const onSelectHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;

    if (isVisiblePlaceholder) {
      const range = document.createRange();
      range.setStart(target, 0);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  function findImmediateChild(node: Node) {
    if (editorEl.current === null) {
      return null;
    }
    let currentNode: Node | null = node;
    while (currentNode) {
      if (currentNode.parentNode === editorEl.current) {
        return currentNode as HTMLElement;
      }
      currentNode = currentNode.parentNode;
    }
    return null;
  }

  function getSelectedImmediateChild(range: Range) {
    const ret: HTMLElement[] = [];
    if (editorEl.current === null) {
      return ret;
    }
    const immediateChildren = editorEl.current.children;
    for (const child of immediateChildren) {
      if (range.intersectsNode(child)) {
        ret.push(child as HTMLElement);
      }
    }
    return ret;
  }

  function replaceTagName(target: HTMLElement, tagName: string) {
    const newElement = document.createElement(tagName);
    newElement.textContent = target.textContent;

    // p 요소를 h1 요소로 대체
    editorEl.current!.replaceChild(newElement, target);
    return newElement;
  }

  // TODO: 비어있는 영역에 커서가 올라와있거나 선택된 커서가 없는 경우에는 가장 마지막에 해당 타입의 태그 요소를 생성
  // TODO: 영역의 마지막에 p 태그를 추가하여 줄바꿈 이후에도 항상 p태그를 재생산하도록 구현
  function changeFontSize(fontType: FontSize) {
    const selection = window.getSelection();
    if (selection === null) {
      return;
    }
    const range = selection.getRangeAt(0);
    const offset = range.startOffset ?? 0;
    const paragraphNode = findImmediateChild(range.startContainer);
    if (paragraphNode) {
      const tagNames: { [key in FontSize]: string } = {
        normal: "p",
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
      };

      // XXX: 영역 선택을 유지하는 코드가 제대로 실행되지 않음
      getSelectedImmediateChild(range).forEach((target) => {
        const newElement = replaceTagName(target, tagNames[fontType]);
        const newRange = document.createRange();
        newRange.setStart(newElement.childNodes[0], offset);
        newRange.collapse(true);
        selection.addRange(newRange);
      });
    }
  }

  const onInput = () => {
    const editor = editorEl.current;
    if (editor === null) {
      return;
    }
    if (editor.innerText.length === 0 || editor.innerText === "\n") {
      editor.innerHTML = `<p><span class='placeholder-decoration' contentEditable='false'>Need formatting help? Type /help.</span></p>`;
      return setIsVisiblePlaceholder(true);
    }
    editor.querySelector(".placeholder-decoration")?.remove();
    setIsVisiblePlaceholder(false);
  };

  return (
    <section
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      className={`${isFocus && "focus-line-shadow"} relative rounded border border-stone-200 bg-white p-1`}
    >
      <div className="sibling flex items-center border-b-2 border-stone-200 p-2 font-extrabold leading-4 text-black">
        <Popup>
          <PopupButton className="button-light-gray  flex h-6 rounded p-1">
            <span className="w-6">Aa</span>
            <ChevronDownIcon className="h-4 w-4" />
          </PopupButton>
          <PopupContent
            className={`${styles.selector} absolute left-0 top-6 grid w-52 grid-rows-7 rounded bg-white py-1 shadow-lg`}
          >
            <FontSizePopup onClick={changeFontSize} />
          </PopupContent>
        </Popup>
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
