import {
  PlusIcon,
  RectangleGroupIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function App() {
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  return (
    <section className="flex h-dvh w-full items-start bg-sky-500 pt-3">
      <section className="min-w-72 px-1.5">
        <div className="w-full rounded-xl bg-neutral-100 px-2 pb-1.5 pt-2">
          <div className="flex">
            <div className="w-full">
              {isTitleEditMode ? (
                <input
                  type="text"
                  className="text-body1-sm w-full rounded py-1.5 pl-3 pr-2"
                />
              ) : (
                <h2
                  className="text-body1-sm cursor-pointer py-1.5 pl-3 pr-2"
                  onClick={() => setIsTitleEditMode(true)}
                >
                  1
                </h2>
              )}
            </div>
            <button className="button rounded-lg p-2">
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-1 pt-2">
            <button className="text-body1-m button flex w-full items-center rounded-lg py-1.5 pl-3 pr-2">
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Add another list</span>
            </button>
            <button className="button rounded-lg p-2">
              <RectangleGroupIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
      <section className="px-1.5">
        <button className="text-body1-m flex min-w-72 items-center rounded-xl bg-sky-400 p-3 text-white">
          <PlusIcon className="mr-2 h-4 w-4" />
          <span>Add another list</span>
        </button>
      </section>
    </section>
  );
}

export default App;
