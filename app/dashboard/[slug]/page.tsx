import dynamic from "next/dynamic";

const Editor = dynamic(
  () =>
    import("../../../components/editor/editor").then(
      (module) => module.default,
    ),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      {/* <Editor params={params} /> */}

      <Editor />
    </>
  );
}
