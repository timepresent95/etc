import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { useClickOutside } from "@/hook";
import { TextEditor } from "@/components/common";
import {
  EyeIcon,
  WindowIcon,
  CheckIcon,
  Bars3BottomLeftIcon,
  ListBulletIcon,
  XMarkIcon,
  Cog8ToothIcon,
  UserIcon,
  TagIcon,
  CheckCircleIcon,
  ClockIcon,
  PaperClipIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  PlusIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  DocumentDuplicateIcon,
  RectangleGroupIcon,
  ArchiveBoxIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const IGNORE_CLICK_OUTSIDE_TITLE_EDIT = "ignore-click-outside-title-edit";

interface Props {
  onClose: () => void;
}

export default function CardDetail({ onClose }: Props) {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [isVisibleDescriptionEditor, setIsVisibleDescriptionEditor] =
    useState(false);

  const titleInputRef = useRef(null);

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

  const showDescriptionEditor = () => {
    setIsVisibleDescriptionEditor(true);
  };

  // const hideDescriptionEditor = () => {
  //   setIsVisibleDescriptionEditor(false);
  // };

  const handleClickOverlay = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };
  useClickOutside(titleInputRef, deactiveTitleEdit, [
    IGNORE_CLICK_OUTSIDE_TITLE_EDIT,
  ]);

  return (
    <div
      className="absolute left-0 top-0 h-dvh w-dvw overflow-auto bg-black/75"
      onClick={handleClickOverlay}
    >
      <section className="relative mx-auto mb-20 mt-12 w-full max-w-3xl rounded-xl bg-neutral-100 px-4 py-2">
        <span
          className="button absolute right-3 top-3 rounded-full p-2.5"
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </span>
        <div className="py-2 pr-11">
          <div className="flex items-center">
            <span className="p-1">
              <WindowIcon className="h-6 w-6" />
            </span>
            {isTitleEdit ? (
              <input
                ref={titleInputRef}
                type="text"
                className="text-h1-sb w-full rounded px-2.5 py-1.5"
                value={titleInput}
                onChange={handleTitleInput}
                autoFocus
              />
            ) : (
              <h3
                className={`${IGNORE_CLICK_OUTSIDE_TITLE_EDIT} text-h1-sb w-full cursor-text py-1.5 pl-2 pr-2.5`}
                onClick={activeTitleEdit}
              >
                ㅁㅁㅁ
              </h3>
            )}
          </div>
          <div className="flex items-center pb-2 pl-10">
            <p className="text-body1 items-center pl-0.5 pr-2.5">
              in list&nbsp;<span className="cursor-pointer underline">2</span>
            </p>
            <EyeIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex">
          <div className="max-w-xl flex-grow">
            <div className="mb-5 mt-2 pl-10">
              <h5 className="text-h5-sb">Notifications</h5>
              <div>
                {/* <button className="button-dark-gray relative flex items-center rounded px-3 py-1.5">
              <EyeIcon className="mr-1.5 h-4 w-4" />
              <span className="text-body1-m">Watch</span>
            </button> */}
                <button className="button-dark-gray relative flex items-center rounded py-1.5 pl-3 pr-10">
                  <EyeIcon className="mr-1.5 h-4 w-4" />
                  <span className="text-body1-m">Watching</span>
                  <span className="absolute right-1 top-1 rounded bg-slate-500 px-1.5 py-1">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </span>
                </button>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center pb-3 pt-2">
                <span className="p-1">
                  <Bars3BottomLeftIcon className="h-6 w-6" />
                </span>
                <h3 className="text-h3-sb py-1.5 pl-1.5 pr-2.5">Description</h3>
              </div>
              {isVisibleDescriptionEditor ? (
                <TextEditor />
              ) : (
                <div className="pl-10" onClick={showDescriptionEditor}>
                  <p className="button-dark-gray text-body1-m mb-2 rounded px-3 py-2">
                    Add a more detailed description...
                    <br />
                    <br />
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center pb-3 pt-2">
                <span className="p-1">
                  <ListBulletIcon className="h-6 w-6" />
                </span>
                <h3 className="text-h3-sb mr-auto py-1.5 pl-1.5 pr-2.5">
                  Activity
                </h3>
                <button className="button-dark-gray relative ml-2 flex items-center rounded px-3 py-1.5">
                  <span className="text-body1-m">Show details</span>
                </button>
              </div>
              <div className="flex">
                <span className="text-body2-b mr-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 leading-8 text-white">
                  HE
                </span>
                <button className="text-body1-m w-full rounded-lg bg-white px-3 py-2 text-left shadow">
                  Write a comment...
                </button>
              </div>
            </div>
          </div>
          <div className="pb-2 pl-2 pr-4">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <h5 className="text-h5-sb -mb-1">Suggested</h5>
                <span className="button-dark-gray rounded p-0.5">
                  <Cog8ToothIcon className="h-4 w-4" />
                </span>
              </div>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <UserIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Join</span>
              </button>
            </div>
            <div className="mb-6 space-y-2">
              <h5 className="text-h5-sb -mb-1">Add to card</h5>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <UserIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Members</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <TagIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Labels</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <CheckCircleIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Checklist</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <ClockIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Dates</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <PaperClipIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Attachment</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <SparklesIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Cover</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <PuzzlePieceIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Custom Fields</span>
              </button>
            </div>
            <div className="mb-6 space-y-2">
              <h5 className="text-h5-sb -mb-1">Power-Ups</h5>
              <button className="text-body1-m button flex w-full items-center rounded py-1.5 pl-1.5 pr-3">
                <PlusIcon className="mr-2 h-5 w-5" />
                <span>Add Power-Ups</span>
              </button>
            </div>
            <div className="mb-6 space-y-2">
              <div className=" flex items-center justify-between">
                <h5 className="text-h5-sb -mb-1">Automation</h5>
                <span className="button-dark-gray rounded-full p-0.5">
                  <InformationCircleIcon className="h-4 w-4" />
                </span>
              </div>
              <button className="text-body1-m button flex w-full items-center rounded py-1.5 pl-1.5 pr-3">
                <PlusIcon className="mr-2 h-5 w-5" />
                <span>Add button</span>
              </button>
            </div>
            <div className="mb-6 space-y-2">
              <h5 className="text-h5-sb -mb-1">Actions</h5>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <ArrowRightIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Move</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <DocumentDuplicateIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Copy</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <RectangleGroupIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Make template</span>
              </button>
              <hr />
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <ArchiveBoxIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Archive</span>
              </button>
              <button className="button-dark-gray relative flex w-full items-center rounded px-3 py-1.5">
                <ShareIcon className="mr-1.5 h-4 w-4" />
                <span className="text-body1-m">Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
