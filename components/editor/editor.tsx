"use client";
import { saveMarkdown } from "@/lib/actions";
import { MDXEditor } from "@mdxeditor/editor";
import { decode } from "js-base64";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "../styles.module.css";

export default function Editor({ params }: { params: { slug: string } }) {
  const [markdown, setMarkdown] = useState("");
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
    console.log("markdown", markdown);
  };
  useEffect(() => {
    console.log("use effect");
    getMarkdown();
  }, []);

  return (
    <>
      <div className="h-full w-full px-10 ">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{params.slug}</h1>
          {/* save button */}
          <button
            onClick={() => {
              saveMarkdown(markdown, params.slug);
            }}
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Save
          </button>
        </div>

        <div>
          <MDXEditor
            markdown={markdown}
            onChange={(markdown) => {
              setMarkdown(markdown);
            }}
          />
        </div>
      </div>
    </>
  );
}
