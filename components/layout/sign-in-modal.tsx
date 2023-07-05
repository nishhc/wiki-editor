import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { redirect, useRouter } from "next/navigation";
const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [cookies, setCookie] = useCookies(["gitlab_pat"]);
  const [gitlab_pat, set_gitlab_pat] = useState(
    (cookies.gitlab_pat as string) ?? "",
  );
  const router = useRouter();

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            To authenticate yourself with iGEM Gitlab, you need to generate a
            personal access token.
          </p>
          <ol className="list-decimal px-2 text-left text-sm text-gray-500">
            <li>
              Go to <a href="gitlab.igem.org">gitlab.igem.org</a> and sign in
              with your iGEM account.
            </li>
            <li>
              Click on your profile picture {">"} Preferences {">"} Access
              Tokens{" "}
            </li>
            <li>
              Type in <code className="mx-2 bg-gray-100">Wiki Editor</code> for
              the <em>Token Name</em> and set an experiation date for{" "}
              <strong>AFTER</strong> wiki freeze.
            </li>
            <li>
              Check <strong>all</strong> of the options under{" "}
              <em>Select Scope</em> and click{" "}
              <strong>Create personal access token</strong>
            </li>
            <li>
              Copy your personal access token with the clipboard icon and paste
              it below.
            </li>
          </ol>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <div>
            <span className="my-0 py-0 text-xs font-bold text-gray-400">
              GITLAB PERSONAL ACCESS TOKEN
            </span>
            <input
              value={gitlab_pat}
              onChange={(e) => set_gitlab_pat(e.target.value)}
              placeholder="paste here"
              className="flex h-10 w-full items-center justify-center space-x-3 rounded-md border px-3 text-sm shadow-sm transition-all duration-75 focus:outline-none"
            ></input>
          </div>
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-700 bg-black text-white hover:bg-gray-800"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              setCookie("gitlab_pat", gitlab_pat, { path: "/" });
              console.log("redirecting push");
              router.push("/dashboard");
              // redirect("/");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <p>Continue to dashboard</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
