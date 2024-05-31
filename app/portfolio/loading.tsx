"use client";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center items-center -mt-16">
      <ClipLoader color="#10131A" size={100} />
    </div>
  );
}
