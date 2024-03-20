"use client"
import { ArrowLeft, ArrowRight,  Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import CardNote from "../cardnote/CardNote";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import SpeechToText from "../speechtotext/SpeechToText";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET } from "@/app/api/talk/route";

import { useToast } from "@/components/ui/use-toast";



function Talk() {

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
        queryFn:() => GET(skip,search),
      })

    
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
        <div className="flex items-center justify-center w-full">
            <div className="flex border md:w-1/2">
                <Input id="search" name="search" className="border-none focus-visible:outline-none"  />
                <Button size="icon" variant="outline" className="border-none" ><Search /></Button>
            </div>
    
            <SpeechToText addToDo={addTodo} refetch={refetch}/>
               
           
        </div>

        <div className="flex flex-col p-3 justify-center items-center mt-5">

            {data.map((talk:ITalk)=>(
                <CardNote key={talk.id} talk={talk}  />
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