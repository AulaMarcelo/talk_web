import { baseUrl, takeBase } from "@/config/confit";

const GetNotes = async  (skip:number,filter:string) => {
    const url = `${baseUrl}/note/getall?take=${takeBase}&skip=${skip}&filter=${filter}`;	
    const response = await fetch(url)

    if(!response.ok){
        throw new Error("Erro com a conexção")
    }
    
    const notes = await response.json();
    console.log("Notes",notes)
    return notes;
}

const PostNotes = async  (data:ITalk) => {
    const url = `${baseUrl}/note`;
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
 
export  {GetNotes as GET,PostNotes as POST};
