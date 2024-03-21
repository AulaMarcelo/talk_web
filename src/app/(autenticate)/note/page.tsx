import Talk from "@/components/talk/Talk";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";


export default async function Note() {
  const session = await getServerSession(authOptions);
  return (
    <div className="mt-3">
      {session ?
       <Talk userAuth={session.user!} />
       :
       <h1>Loading ...</h1>
    }
   
    </div>
  );
}
