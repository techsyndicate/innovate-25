"use client";
import { ChangeEvent } from "react";

type InputProps = {
  name: string;
  classes?: string;
  callback?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  required?: boolean;
};

export default function Input(props: InputProps) {
  if (!props.required) {
    <>
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.name}
        className={`h[80vw]6vh6 px-7 bg-[#[2vw]02020] outline-070707 text border-[#FFB84D] border-sm placeholder:font-light placeholder:text-[#8F8F8F] ${props.classes}`}
        onChange={props.callback}
      />
    </>;
  }
  return (
    <>
      <input
        required
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.name}
        className={`w-[60vw] h-[6vh] px-[2vw] bg-[#070707] border-[#FFB84D] border outline-0 text-sm placeholder:font-light placeholder:text-[#8F8F8F] ${props.classes}`}
        onChange={props.callback}
      />
    </>
  );
}
