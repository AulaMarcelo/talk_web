import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";




export default  async function Home() {

  const session = await getServerSession(authOptions);
  if(session){
    return redirect("/note")
  }
  return (
    <div className="mt-3">
     <h1>Home</h1>
    </div>
  );
}
