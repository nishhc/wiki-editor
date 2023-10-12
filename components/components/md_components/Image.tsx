export interface Props {
  src: string;
  caption?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Image(props: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-1">
      <img
        src={props.src}
        alt=""
        className={`mx-2 max-w-${props.size ?? "lg"} rounded-xl`}
      />
      <div className="text-center italic">{props.caption}</div>
    </div>
  );
}
