"use client";
import { saveMarkdown } from "@/lib/actions";
import { JsxComponentDescriptor, MDXEditor } from "@mdxeditor/editor";
import { decode } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "@mdxeditor/editor/style.css";

//components
import Wip from "../md_components/Wip";

export default function Editor({ params }: { params: { slug: string } }) {
  const [markdown, setMarkdown] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["gitlab_pat"]);

  const getMarkdown = async () => {
    const request = await fetch(
      `https://gitlab.igem.org/api/v4/projects/1866/repository/files/src%2Fpages%2F${params.slug}.mdx?ref=main`,
      {
        headers: {
          "PRIVATE-TOKEN": cookies.gitlab_pat,
        },
      },
    );
    const json = await request.json();
    const markdown = decode(json.content);
    setMarkdown(markdown);
    setDataLoaded(true);
    console.log("markdown", markdown);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log("use effect");
    setMounted(true);
    getMarkdown();
  }, []);

  if (!mounted) {
    return null; // return this null to avoid hydration errors
  }

  const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
      name: "Wip",
      kind: "text",
      props: [],
      source: "../md_components/Wip",
    },
  ];

  return (
    <>
      <div className="h-full w-full px-10 ">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{params.slug}</h1>
          {/* save button */}
          <button
            onClick={() => {
              console.log(markdown);
              saveMarkdown(markdown, params.slug, cookies.gitlab_pat);
            }}
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Save
          </button>
        </div>
        {dataLoaded && (
          <div className="relative">
            <MDXEditor
              className="prose"
              markdown={markdown}
              onChange={(markdown) => {
                setMarkdown(markdown);
              }}
              jsxComponentDescriptors={jsxComponentDescriptors}
            />
          </div>
        )}
      </div>
    </>
  );
}
