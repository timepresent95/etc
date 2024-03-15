import { ChangeEvent, useRef, useState } from "react";
import { useClickOutside } from "@/hook";
import { AutoResizeTextarea } from "@/components/common";
import {
  PlusIcon,
  RectangleGroupIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const IGNORE_CLICK_OUTSIDE_TITLE_EDIT = "ignore-click-outside-title-edit";
const IGNORE_CLICK_OUTSIDE_NEW_CARD = "ignore-click-outside-new-card";

const NEW_CARD_TITLE_PLACEHOLDER = "Enter a title for this card...";

export default function List() {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [isVisibleNewCard, setIsVisibleNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const titleInputRef = useRef(null);
  const newCardRef = useRef(null);

  const showNewCard = () => {
    setIsVisibleNewCard(true);
  };

  const hideNewCard = () => {
    setNewCardTitle("");
    setIsVisibleNewCard(false);
  };

  const activeTitleEdit = () => {
    setIsTitleEdit(true);
  };

  const deactiveTitleEdit = () => {
    setTitleInput("");
    setIsTitleEdit(false);
  };

  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleNewCardTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCardTitle(e.target.value);
  };

  useClickOutside(titleInputRef, deactiveTitleEdit, [
    IGNORE_CLICK_OUTSIDE_TITLE_EDIT,
  ]);
  useClickOutside(newCardRef, hideNewCard, [IGNORE_CLICK_OUTSIDE_NEW_CARD]);

  return (
    <section className="min-w-72 px-1.5">
      <div className="w-full rounded-xl bg-neutral-100 px-2 pb-1.5 pt-2">
        <div className="flex items-center">
          <div className="w-full">
            {isTitleEdit ? (
              <input
                ref={titleInputRef}
                value={titleInput}
                onChange={handleTitleInput}
                autoFocus
                type="text"
                className="text-body1-sb w-full rounded py-1.5 pl-3 pr-2"
              />
            ) : (
              <h2
                className={`${IGNORE_CLICK_OUTSIDE_TITLE_EDIT} text-body1-sb cursor-pointer py-1.5 pl-3 pr-2`}
                onClick={activeTitleEdit}
              >
                1
              </h2>
            )}
          </div>
          <div className="px-1 pb-1 pt-2">
            <EyeIcon className="h-4 w-4" />
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
                autoFocus
                value={newCardTitle}
                onChange={handleNewCardTitle}
                className="text-body1 w-full rounded-lg px-3 py-2 shadow"
                placeholder={NEW_CARD_TITLE_PLACEHOLDER}
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
  );
}
