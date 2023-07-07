"use client";
import { saveMarkdown } from "@/lib/actions";
import { decode } from "js-base64";
import { Suspense, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";

import MDEditor, { commands } from "@uiw/react-md-editor";
import Wip from "../components/md_components/Wip";
import { useDebouncedCallback } from "use-debounce";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((mod) => mod.MDXRemote),
  { ssr: false },
);

export default function Editor() {
  // return (
  // <MDXRemote
  //   compiledSource={mdxSource}
  //   scope={undefined}
  //   frontmatter={undefined}
  // />
  // );
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const [markdown, setMarkdown] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cookies, setCookie] = useCookies(["gitlab_pat"]);

  const getMarkdown = () => {
    const request = fetch(
      `https://gitlab.igem.org/api/v4/projects/1866/repository/files/src%2Fpages%2F${slug}.mdx?ref=main`,
      {
        headers: {
          "PRIVATE-TOKEN": cookies.gitlab_pat,
        },
      },
    ).then((res) => {
      return res.json().then((json) => {
        console.log(json);
        const markdown = decode(json.content);
        setMarkdown(markdown);
        setDataLoaded(true);
        console.log("markdown", markdown);
      });
    });
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    console.log("use effect");
    getMarkdown();
    setMounted(true);
  }, []);

  console.log("hello");
  const [mdxSource, setMdxSource] = useState(`
  /*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsxDEV: _jsxDEV} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  return _jsxDEV(_Fragment, {}, undefined, false, {
    fileName: "<source.js>",
    lineNumber: 1,
    columnNumber: 1
  }, this);
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);
  return MDXLayout ? _jsxDEV(MDXLayout, Object.assign({}, props, {
    children: _jsxDEV(_createMdxContent, props, undefined, false, {
      fileName: "<source.js>"
    }, this)
  }), undefined, false, {
    fileName: "<source.js>"
  }, this) : _createMdxContent(props);
}
return {
  default: MDXContent
};
`);

  const components = { Wip };

  const serializeUpdatedSource = () => {
    const tempMdxSource = serialize(markdown, {
      mdxOptions: {
        development: process.env.NODE_ENV === "development",
      },
    }).then((res) => {
      setMdxSource(res.compiledSource);
    });
  };

  const debouncedSerializeUpdatedSource = useDebouncedCallback(
    // function
    () => {
      serializeUpdatedSource();
    },
    // delay in ms
    500,
  );

  useEffect(() => {
    console.log("use effects");
    debouncedSerializeUpdatedSource();
  }, [markdown]);

  if (!mounted) {
    return null; // return this null to avoid hydration errors
  }
  console.log("1");

  const codePreview = {
    name: "preview",
    keyCommand: "preview",
    value: "preview",
    icon: <div></div>,
  };

  return (
    <>
      <div className="h-full w-full px-10 ">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{slug}</h1>
          <button
            onClick={() => {
              console.log(markdown);
              saveMarkdown(markdown, slug, cookies.gitlab_pat).then((res) => {
                alert(res);
              });
            }}
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Save
          </button>
        </div>
        <div className="m-0 my-6 flex h-screen " data-color-mode="light">
          <MDEditor
            value={markdown}
            onChange={(md) => {
              setMarkdown(md ?? "");
            }}
            className="m-0 h-full w-1/2"
            preview="edit"
            extraCommands={[codePreview, commands.fullscreen]}
            height="500vh"
          />
          <div className=" mx-2 w-1/2 px-6">
            <div className="prose">
              <MDXRemote
                compiledSource={mdxSource}
                components={components}
                scope={undefined}
                frontmatter={undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
