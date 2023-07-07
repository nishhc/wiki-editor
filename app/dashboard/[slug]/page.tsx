import dynamic from "next/dynamic";
import Editor from "../../../components/editor/editor";
import { MDXRemote } from "next-mdx-remote/rsc";

// const Editor = dynamic(
//   () =>
//     import("../../../components/editor/editor").then(
//       (module) => module.default,
//     ),
//   {
//     ssr: false,
//     loading: () => <div>Loading...</div>,
//   },
// );

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Editor />
    </>
  );
}
