"use client";
import Balancer from "react-wrap-balancer";
import { Timer } from "lucide-react";
import Link from "next/link";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useCookies } from "react-cookie";
import { useState } from "react";
import NoSSR from "@/components/editor/react-no-ssr";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HomeComponent() {
  // days until october 1st 2023
  const daysTilWikiFreeze = Math.floor(
    (new Date("2023-10-01").getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [cookies, setCookie] = useCookies(["gitlab_pat"]);
  const [rain, setRain] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  // const transform = useMotionTemplate`translate(${x.get()}px, ${y.get()}px)`;

  return (
    <>
      <SignInModal />
      <div>
        <div className="z-10 w-full max-w-xl px-5 xl:px-0">
          <span
            className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 rounded-full bg-blue-100 px-7 py-2  hover:bg-blue-200"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <Timer className="days h-5 w-5 text-[#1d9bf0]" />
            <p className="text-sm font-semibold text-[#1d9bf0]">
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
                <div>
                  <Link
                    href="/dashboard"
                    className="flex max-w-fit items-center justify-center space-x-2 rounded-full border bg-black px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-gray-800 hover:bg-white hover:text-black"
                  >
                    Continue to Dashboard
                  </Link>
                </div>
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
      </div>
    </>
  );
}
