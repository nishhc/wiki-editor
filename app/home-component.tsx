"use client";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { AlertTriangle, Timer } from "lucide-react";
import Link from "next/link";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import NoSSR from "@/components/editor/react-no-ssr";
import remarkGfm from "remark-gfm";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function HomeComponent() {
  // days until october 1st 2023
  const daysTilWikiFreeze = Math.floor(
    (new Date("2023-10-13").getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [cookies, setCookie, removeCookie] = useCookies(["gitlab_pat"]);
  const [rain, setRain] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  // const transform = useMotionTemplate`translate(${x.get()}px, ${y.get()}px)`;

  return (
    <>
      <SignInModal />
      <div className="flex w-screen flex-col items-center">
        <style>{`
          .containerv {
            height: calc(100vh - 132px);
          }
        `}</style>
        <div className="containerv relative flex w-full flex-col items-center justify-center">
          <div className="z-10 w-full max-w-xl px-5 xl:px-0">
            <span
              className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 rounded-full bg-red-100 px-7 py-2  hover:bg-red-200"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <AlertTriangle className="days h-5 w-5 text-[#F01D1D]" />
              <p className="text-sm font-semibold text-[#F01D1D]">
                Wiki Freeze in {daysTilWikiFreeze} days
              </p>
            </span>
            <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <Balancer>Lambert iGEM Wiki Editor</Balancer>
            </h1>
            <p
              className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              <Balancer>
                An intuitive, easy to use alternative to wiki freeze stress.
                Brought to you by the wiki committee.
              </Balancer>
            </p>
            <div
              className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <NoSSR>
                {cookies.gitlab_pat != undefined ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex max-w-fit items-center justify-center space-x-2 rounded-full border bg-black px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-gray-800 hover:bg-white hover:text-black"
                    >
                      Continue to Dashboard
                    </Link>
                    <button
                      className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                      onClick={() => {
                        removeCookie("gitlab_pat");
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div>
                    <button
                      className="flex max-w-fit items-center justify-center space-x-2 rounded-full border bg-black px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-gray-800 hover:bg-white hover:text-black"
                      onClick={() => setShowSignInModal(true)}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </NoSSR>
              <motion.button
                onClick={() => {
                  alert(
                    "Congrats! You clicked the button! Now go cry about it.",
                  );
                }}
                onMouseEnter={() => {
                  // get random number in range
                  console.log("hover");
                  if (x !== 0) {
                    setX(0);
                    setY(0);
                  } else {
                    setX(
                      randomNumber(
                        window.innerWidth * -0.3,
                        window.innerWidth * 0.3,
                      ),
                    );
                    setY(
                      randomNumber(
                        window.innerHeight * -0.3,
                        window.innerHeight * 0.3,
                      ),
                    );
                  }
                }}
                // style={{
                //   x,
                //   y,
                // }}
                animate={{ x: x, y: y }}
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
              >
                <span className="hidden sm:inline-block">Cry about it</span>
              </motion.button>
            </div>
          </div>
          <div className="absolute bottom-0 py-4">Scroll down for more</div>
        </div>
        <div className="mx-5 w-full max-w-screen-xl rounded-3xl bg-gray-50 p-8">
          <div className="prose">
            <h1>Instruction Manual</h1>
            <p>
              Welcome to the Lambert iGEM wiki editor. This editor integrates
              with iGEM Gitlab and allows you to directly edit the content of
              writeups without worrying about any code. Each time you press
              save, your edits will save on GitLab on your behalf and the wiki
              will be updated.{" "}
            </p>
            <h2>Editing the wiki</h2>
            <p>
              The contents of the wiki are written using MDX (Markdown X).
              Markdown is an easy to use mark up format used to add basic
              formatting to plain text. MDX is built on top of Markdown X and
              allows for the use of custom components and layouts beyond the
              basic linear flow.{" "}
            </p>
            <h3>Page Layout</h3>
            <p>
              On the top of each markdown file, you will find a section that
              looks some what like this{" "}
            </p>

            <pre lang="jsx">
              <code>
                {`--- 
layout: ../layouts/PageLayout.astro 
title: Attributions
header: website.com/image.jpg
---
import Wip from "../components/md_components/Wip";`}
              </code>
            </pre>
            <p>
              Do NOT edit anything in this section. The lines between the{" "}
              <code>---</code> are properties that change the layout, title, and
              header of the page. In most cases you do not need to edit
              anything. Import statements are helpers for the components that we
              will use later.{" "}
            </p>

            <p>
              After this section comes the page content that is displayed.
              Markdown is very easy to use and read. You can directly start
              typing, or more probably, copy pasting your writeups like any
              other text editor.{" "}
            </p>

            <h3>Basic Markdown Syntax</h3>
            <p>
              Refer to{" "}
              <a href="https://www.markdownguide.org/cheat-sheet/">this page</a>{" "}
              for a cheatsheet on basic markdown syntax.
            </p>
            <h3>Special cases</h3>
            <h4>Images</h4>
            <p>
              Use{" "}
              <a href="https://competition.igem.org/deliverables/team-wiki">
                instructions
              </a>{" "}
              from iGEM HQ to upload pictures and videos through the{" "}
              <a href="https://uploads.igem.org/">upload portal</a> and put the
              link of the image in an <code>Image</code> tag like so:{" "}
            </p>
            <pre>
              <code>
                {
                  "<Image src='https://uploads.igem.org/wiki/2021/team/igem-lambert/attributions/igem-logo.png' caption='Figure 1. blah blah' />"
                }
              </code>
            </pre>

            <h4>References</h4>
            <p>
              We made a special <code>References</code> component to properlly
              format everything with hanging indents. Use it like so:
            </p>
            <pre>
              <code>{"<Reference> Your reference text </Reference>"}</code>
            </pre>

            <h4>Links to other pages</h4>
            <p>
              use special markdown links to link to other pages. You may ONLY
              link to other pages in our wiki. Links to outside websites will
              disqualify us and we will be flagged as cheating. Link to other
              pages like so where anything in the square brackets are the text
              that is displayed and inside the parentheses is the link:
            </p>
            <pre>
              <code>
                {"[see Software](https://2023.igem.wiki/lambert-ga/software/)"}
              </code>
            </pre>

            <h2>Custom Components</h2>
            <p>
              We built a collection of custom components that you can use out of
              the box. To use a custom component, just copy the snippet of the
              component you want to use and change the attributes. If you need a
              layout option that we do not provide or a custom custom component,
              just let anyone on the wiki committee know.{" "}
            </p>

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {`

| Component | Description | Usage |
| --- | --- | --- |
| Wip | Displays a work in progress banner | \`<Wip/>\` |
| Image | Displays an image with a caption | \`<Image src='url.com/image.png' caption='Figure 1. blah blah' />\` |
| Reference | Displays a reference with proper hanging indent | \`<Reference> Your reference text </Reference>\` |


more components coming soon
              `}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
