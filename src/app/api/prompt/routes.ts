import { baseUrl, takeBase } from "@/config/confit";
import { IUpdatePrompt } from "@/interface/user/interface";


const UpdatePrompt = async  (data:IUpdatePrompt) => {
    const url = `${baseUrl}/note/promptupdate`;
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const note = await response.json() 
 
    return note ;
}



const GetPrompt = async  (email:string) => {
    const url = `${baseUrl}/note/promptget?email=${email}`;
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
       
    })

    if (!response.ok) {
       throw new Error("Conexão com a rede está com problema")
    }
    const note = await response.json() 
 
    return note ;
}


 
export  {UpdatePrompt as POST,GetPrompt as GET};
