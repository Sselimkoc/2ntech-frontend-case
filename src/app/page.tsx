import { redirect } from "next/navigation";

export default function Home() {
  redirect("/users/1");
  
}
