import { pages } from "@/lib/constants";
import Link from "next/link";
export default function Dashboard() {
  return (
    <>
      <div className="min-w-[300px] rounded-2xl border border-gray-300">
        <div className="m-0 rounded-t-2xl bg-gray-50 px-6 py-3">
          <h1 className=" pt-2 text-center text-lg font-medium">
            Select a page to edit
          </h1>
          <p className="text-center text-sm text-gray-500">
            Page missing? Contact Ryan.
          </p>
        </div>

        {pages.map((page, index) => (
          <div
            key={index}
            className="border-t-[0.5px] border-gray-300 px-4 py-2 text-center text-gray-600"
          >
            <Link className="hover:text-gray-900" href={`/dashboard/${page}`}>
              {page}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
