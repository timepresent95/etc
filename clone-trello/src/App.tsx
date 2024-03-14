import { ChangeEvent, useRef, useState } from "react";
import { useClickOutside } from "@/hook";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import {
  PlusIcon,
  RectangleGroupIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const IGNORE_CLICK_OUTSIDE_TITLE_EDIT = "ignore-click-outside-title-edit";
const IGNORE_CLICK_OUTSIDE_NEW_CARD = "ignore-click-outside-new-card";
const NEWCARD_TITLE_PLACEHOLDER = "Enter a title for this card...";

function App() {
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [isVisibleNewCard, setIsVisibleNewVard] = useState(false);
  const [newCardTitleValue, setNewCardTitleValue] = useState("");

  const titleInputRef = useRef(null);
  const newCardRef = useRef(null);

  const showNewCard = () => {
    setIsVisibleNewVard(true);
  };

  const hideNewCard = () => {
    setNewCardTitleValue("");
    setIsVisibleNewVard(false);
  };

  const activeTitleEditMode = () => {
    setIsTitleEditMode(true);
  };

  const deactiveTitleEditMode = () => {
    setTitleInputValue("");
    setIsTitleEditMode(false);
  };

  const handleTitleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(e.target.value);
  };

  const handleNewCardTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitleValue(e.target.value);
  };

  useClickOutside(titleInputRef, deactiveTitleEditMode, [
    IGNORE_CLICK_OUTSIDE_TITLE_EDIT,
  ]);
  useClickOutside(newCardRef, hideNewCard, [IGNORE_CLICK_OUTSIDE_NEW_CARD]);

  return (
    <section className="flex h-dvh w-full items-start bg-sky-500 pt-3">
      <section className="min-w-72 px-1.5">
        <div className="w-full rounded-xl bg-neutral-100 px-2 pb-1.5 pt-2">
          <div className="flex">
            <div className="w-full">
              {isTitleEditMode ? (
                <input
                  ref={titleInputRef}
                  value={titleInputValue}
                  onChange={handleTitleInputValue}
                  autoFocus
                  type="text"
                  className="text-body1-sm w-full rounded py-1.5 pl-3 pr-2"
                />
              ) : (
                <h2
                  className={`${IGNORE_CLICK_OUTSIDE_TITLE_EDIT} text-body1-sm cursor-pointer py-1.5 pl-3 pr-2`}
                  onClick={activeTitleEditMode}
                >
                  1
                </h2>
              )}
            </div>
            <button className="button rounded-lg p-2">
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <div className="text-body1 group relative w-full rounded-lg bg-white px-3 pb-1 pt-2 shadow">
              <h3 className="text-body1 mb-1 cursor-pointer">2</h3>
              <div className="button absolute right-0.5 top-0.5 rounded-full bg-white px-2 py-1.5 opacity-0 group-hover:opacity-100">
                <PencilIcon className="h-4 w-4" />
              </div>
            </div>
            {isVisibleNewCard && (
              <div ref={newCardRef}>
                <AutoResizeTextarea
                  value={newCardTitleValue}
                  onChange={handleNewCardTitle}
                  className="text-body1 w-full rounded-lg px-3 py-2 shadow"
                  placeholder={NEWCARD_TITLE_PLACEHOLDER}
                />
                <div className="mt-2 flex gap-1">
                  <button className="text-body1-m button-blue rounded px-3 py-1.5 text-white">
                    Add card
                  </button>
                  <button className="p-1.5" onClick={hideNewCard}>
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {!isVisibleNewCard && (
            <div className={`${IGNORE_CLICK_OUTSIDE_NEW_CARD} flex gap-1 pt-2`}>
              <button
                onClick={showNewCard}
                className="text-body1-m button flex w-full items-center rounded-lg py-1.5 pl-3 pr-2"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                <span>Add a card</span>
              </button>
              <button className="button rounded-lg p-2">
                <RectangleGroupIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="px-1.5">
        <button className="text-body1-m flex min-w-72 items-center rounded-xl bg-blue-500 p-3 text-white hover:bg-blue-600 active:bg-blue-500">
          <PlusIcon className="mr-2 h-4 w-4" />
          <span>Add another list</span>
        </button>
      </section>
    </section>
  );
}

export default App;
