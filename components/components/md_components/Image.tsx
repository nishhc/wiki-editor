import clsx from "clsx";
export interface Props {
  src: string;
  caption?: string;
  size?: string;
}

function getMaxWidthClass(size?: string) {
  switch (size) {
    case "xs":
      return "max-w-xs";
    case "sm":
      return "max-w-sm";
    case "md":
      return "max-w-md";
    case "lg":
      return "max-w-lg";
    case "xl":
      return "max-w-xl";
    default:
      return "max-w-lg"; // Return an empty string or handle other sizes as needed
  }
}

export default function Image(props: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-1">
      <img
        src={props.src}
        alt=""
        className={clsx(`mx-2 w-full rounded-xl`, getMaxWidthClass(props.size))}
      />
      <div className="text-center italic">{props.caption}</div>
    </div>
  );
}
