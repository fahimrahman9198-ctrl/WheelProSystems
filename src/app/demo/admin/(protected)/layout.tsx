import { redirect } from "next/navigation";

export default function AdminProtectedRedirectLayout() {
  redirect("/ai");
}
