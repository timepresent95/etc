import { ChangeEvent, useRef, useState } from "react";
import { useClickOutside } from "@/hook";
import List from "@/components/List";
import CardDetail from "@/components/CardDetail";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

const IGNORE_CLICK_OUTSIDE_NEW_LIST = "ignore-click-outside-new-list";
const NEW_LIST_TITLE_PLACEHOLDER = "Enter list title...";

function App() {
  const [isVisibleNewList, setIsVisibleNewList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [isVisibleCradDetail, setIsVisibleCradDetail] = useState(false);

  const newListRef = useRef(null);

  const showNewList = () => {
    setIsVisibleNewList(true);
  };

  const hideNewList = () => {
    setNewListTitle("");
    setIsVisibleNewList(false);
  };

  const handleNewListTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewListTitle(e.target.value);
  };

  const onClickCard = () => {
    setIsVisibleCradDetail(true);
  };

  const onCloseCardDetail = () => {
    setIsVisibleCradDetail(false);
  };

  useClickOutside(newListRef, hideNewList, [IGNORE_CLICK_OUTSIDE_NEW_LIST]);

  return (
    <>
      <section className="flex h-dvh w-full items-start bg-sky-500 pt-3">
        <List onClickCard={onClickCard} />
        <section className="min-w-72 px-1.5">
          {isVisibleNewList ? (
            <div
              className="w-full rounded-xl bg-neutral-100 px-2 pb-1.5 pt-2"
              ref={newListRef}
            >
              <input
                placeholder={NEW_LIST_TITLE_PLACEHOLDER}
                autoFocus
                value={newListTitle}
                type="text"
                className="text-body1-sb w-full rounded py-1.5 pl-3 pr-2"
                onChange={handleNewListTitle}
              />
              <div className="mt-2 flex gap-1">
                <button className="text-body1-m button-blue rounded px-3 py-1.5 text-white">
                  Add list
                </button>
                <button className="p-1.5" onClick={hideNewList}>
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              className={`${IGNORE_CLICK_OUTSIDE_NEW_LIST} text-body1-m flex w-full items-center rounded-xl bg-blue-500 p-3 text-white hover:bg-blue-600 active:bg-blue-500`}
              onClick={showNewList}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Add another list</span>
            </button>
          )}
        </section>
      </section>
      {isVisibleCradDetail &&
        createPortal(<CardDetail onClose={onCloseCardDetail} />, document.body)}
    </>
  );
}

export default App;
