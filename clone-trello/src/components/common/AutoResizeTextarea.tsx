import { ChangeEvent, useRef, useEffect, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minHeight?: number;
  maxHeight?: number;
}

const AutoResizeTextarea = ({
  minHeight = 52,
  maxHeight = 120,
  ...attrs
}: Props) => {
  const el = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(attrs);
    if (el.current === null) {
      return;
    }
    el.current.style.resize = "none";
  }, [attrs]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (el.current !== null) {
      el.current.style.height = "auto";
      el.current.style.height = `${Math.min(Math.max(minHeight, e.target.scrollHeight), maxHeight)}px`;
    }
    if (attrs.onChange) {
      attrs.onChange(e);
    }
  };

  return <textarea ref={el} {...attrs} onChange={handleChange} />;
};

export default AutoResizeTextarea;
