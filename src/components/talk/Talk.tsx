"use client"
import { Eraser, Flashlight, Mail, Mic, MicOff, Save, Search, Tag, Upload } from "lucide-react";
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

function Talk() {
    const [todo, setTodo] = useState<ITalk[]>([]);
     const addTodo =(talk:ITalk) => {
         console.log("talk",talk)
        setTodo([...todo, talk]);
     }

  
    return (  
        <div className="flex flex-col">
        <div className="flex items-center justify-center w-full">
            <div className="flex border md:w-1/2">
                <Input id="search" name="search" className="border-none focus-visible:outline-none"  />
                <Button size="icon" variant="outline" className="border-none" ><Search /></Button>
            </div>
    
            <SpeechToText addToDo={addTodo}/>
               
           
        </div>

        <div className="flex flex-col p-3 justify-center items-center mt-5">
           
            {todo.map((talk,index)=>(
                <CardNote key={index} talk={talk}  />
            ))}
          
            
            
        </div>
   
        </div>
    );
}

export default Talk;