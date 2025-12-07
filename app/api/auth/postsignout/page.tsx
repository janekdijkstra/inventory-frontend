import {redirect} from "next/navigation";
import {auth} from "@/auth";

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/");
  } else {
    return <div>Logout erfolgreich.</div>;
  }
}
