import clsx from "clsx";
export interface Props {
  children: React.ReactElement;
  caption?: string;
}

export default function NiceTable(props: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-1">
      <style>
        ul
        {
          //style
        }
        li
        {
          // style
        }
      </style>
      <table>{props.children}</table>
      <div className="text-center italic">{props.caption}</div>
    </div>
  );
}
