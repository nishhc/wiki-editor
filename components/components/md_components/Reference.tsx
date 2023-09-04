export interface Props {
  children: React.ReactNode;
}

export default function Reference(props: Props) {
  return <p className="pl-6 -indent-6">{props.children}</p>;
}
