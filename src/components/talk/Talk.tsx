"use client"
import { ArrowLeft, ArrowRight,  Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import CardNote from "../cardnote/CardNote";


import { useState } from "react";

import SpeechToText from "../speechtotext/SpeechToText";
import { useQuery } from "@tanstack/react-query";
import { GET } from "@/app/api/talk/route";

import { useToast } from "@/components/ui/use-toast";
import { IUserAuth } from "@/interface/user/interface";


interface TalkProps{
    userAuth: IUserAuth
}
function Talk({userAuth}:TalkProps) {

    const [skip,setSkipped] = useState(0)
    const [filter,setFilter] = useState('')
    const [search,setSearch] = useState('')
    const { toast } = useToast()
  
    const [todo, setTodo] = useState<ITalk[]>([]);
    const addTodo =(talk:ITalk) => {
        console.log("talk",talk)
       setTodo([...todo, talk]);
    }


    const {data,isPending,isError,error,refetch} = useQuery({
        queryKey:['notes',skip,search],
        queryFn:() => GET(userAuth.email!,skip,search),
      })

    const handleSearch = () =>{
        setSearch(filter);
    }
    
    if(isError){
        toast({
            variant: "destructive",
            title: "Erro ao Carregar os dados",
            description: "Não foi possivel carregar os dados",
          })
    }
    if(isPending){
        return (
            <h1 className="text-center">Loading...</h1>
        )
    }
    return (  
        <div className="flex flex-col">
             <div className="text-center mb-3">
              <p className="text-xs text-yellow-100">Para configurar a IA clique no icone no cabeçalho</p>
            </div>
        <div className="flex items-center justify-center w-full">
            <div className="flex border md:w-1/2">
                <Input id="search" name="search" className="border-none focus-visible:outline-none" value={filter} onChange={(e) => setFilter(e.target.value)} />
                <Button size="icon" variant="outline" className="border-none" onClick={handleSearch} ><Search /></Button>
            </div>
          
            <SpeechToText addToDo={addTodo} refetch={refetch} email={userAuth.email!}/>
               
           
        </div>
           
        <div className="flex flex-col p-3 justify-center items-center mt-4">

            {data.map((talk:ITalk)=>(
                <CardNote key={talk.id} talk={talk} refetch={refetch}  />
            ))}
             <div className="
                fixed bottom-4 right-4  bg-gray-900   rounded-full p-3 shadow-lg 
                md:relative md:flex md:justify-center md:mt-10 "
            >
              <div className="flex gap-5 md:gap-60 ">
              <ArrowLeft className="hover:animate-pulse " onClick={() => setSkipped((old) => Math.max(old - 1,0))} fill="none" />
              <ArrowRight  className="hover:animate-pulse" onClick={() =>  setSkipped((old) => ((data.length -1)  >= 0 ) ? old+1 : old)} />
              </div>
            </div>
           
        </div>
   
        </div>
    );
}

export default Talk;