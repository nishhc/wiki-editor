export interface Props {
  src: string;
  caption?: string;
}

export default function Image(props: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-1">
      <img src={props.src} alt="" className="mx-2 max-w-lg rounded-xl" />
      <div className="text-center">{props.caption}</div>
    </div>
  );
}
