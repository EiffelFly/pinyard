import { getSession } from "../supabase-server";
import AuthUI from "./AuthUI";

import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
        <AuthUI />
      </div>
    </div>
  );
}
