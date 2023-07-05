import { useCookies } from "react-cookie";
import Editor from "../../../components/editor/editor";
import { decode } from "js-base64";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Editor params={params} />
    </>
  );
}
