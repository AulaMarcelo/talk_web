"use client"
import { Mail, Save, Tag, Trash, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { convertDataHoraParaPtBr } from "@/utils/convertDate";





interface CardNoteProps{
    talk:ITalk
}
function CardNoteExemple({talk}:CardNoteProps) {

 

    return (
        <>
               <Card className="flex-1 mb-4 w-[300px] md:w-1/2 ">
               <CardHeader className="text-end text-xs  p-3">
                       <p className="text-red-200">{talk.updatedAt ? convertDataHoraParaPtBr(talk.updatedAt):'Sem data'}</p>
                </CardHeader>
                <CardHeader className="text-center p-2">
                       <p>{talk.title}</p>
                </CardHeader>
                <CardContent className="text-center text-sm whitespace-normal break-words">
                   {talk.text}
                </CardContent>
                
                <CardFooter className="flex justify-between ">
                    
                    <div className="flex border p-2 rounded hover:animate-pulse gap-2">
                        <Tag size={20}/>
                        <p className="text-sm">{talk.tag}</p>
                    </div>

                    <div className=" gap-3">
                    
                    <Button size="icon" variant="outline" className="border-none"><Upload size={20}/></Button>
                    <Button size="icon" variant="outline" className="border-none"> <Mail size={20}/></Button>
                    <Button size="icon" variant="outline" className="border-none" > <Trash size={20}/></Button>
                    </div>
                    
                </CardFooter>
               
              
            </Card>
            </>
      );
}

export default CardNoteExemple;