"use client"
import { ArrowLeft, ArrowRight,  Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";



import { useState } from "react";

import SpeechToTextExemple from "./_speachText/speachToTexteExemple";
import CardNoteExemple from "./_cardNote/CardNoteExemple";


function TalkExemple() {

    const [skip,setSkipped] = useState(0)
    const [filter,setFilter] = useState('')
    const [todoOld,setTodoOld] = useState<ITalk[]>([]);

  
    const [todo, setTodo] = useState<ITalk[]>([]);
    const addTodo =(talk:ITalk) => {
        console.log("talk",talk)
       setTodo([...todo, talk]);
    }


 

    const handleSearch = () =>{
        if(filter === ""){
            setTodo(todoOld)
        }else{
        const talksFilter = todo.filter((e: ITalk) => e.title.toUpperCase().includes(filter.toUpperCase()));
         setTodoOld(todo)
         setTodo(talksFilter)
        }
    }
  
    return (  
        <div className="flex flex-col">
        <div className="flex items-center justify-center w-full">
            <div className="flex border md:w-1/2">
                <Input id="search" name="search" className="border-none focus-visible:outline-none" value={filter} onChange={(e) => setFilter(e.target.value)} />
                <Button size="icon" variant="outline" className="border-none" onClick={handleSearch} ><Search /></Button>
            </div>
    
            <SpeechToTextExemple addToDo={addTodo} />
               
           
        </div>

        <div className="flex flex-col p-3 justify-center items-center mt-5">

            {todo.map((talk:ITalk,index)=>(
                <CardNoteExemple key={index} talk={talk}   />
            ))}
             <div className="
                fixed bottom-4 right-4  bg-gray-900   rounded-full p-3 shadow-lg 
                md:relative md:flex md:justify-center md:mt-10 "
            >
             
            </div>
           
        </div>
   
        </div>
    );
}

export default TalkExemple;