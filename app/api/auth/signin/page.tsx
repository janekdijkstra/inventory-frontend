import {getServerSession} from "next-auth/next";
import {authOptions} from "../[...nextauth]/authOptions";
import {redirect} from "next/navigation";
import {Login} from "@/components/auth/login";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  } else {
    return <Login />;
  }
}
