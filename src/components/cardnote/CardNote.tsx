"use client"
import { Mail, Save, Tag, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";




interface CardNoteProps{
  
    talk:ITalk
}
function CardNote({talk}:CardNoteProps) {
  
    return (
        <>
         <Card className="flex-1 mb-4 w-[300px] md:w-1/2 ">
                <CardHeader className="text-center">
                       <p>{talk.title}</p>
                </CardHeader>
                <CardContent className="text-center text-sm whitespace-normal break-words">
                   {talk.text}
                </CardContent>
                <CardFooter className="flex justify-between">
                    
                    <div className="flex border p-2 rounded hover:animate-pulse gap-2">
                        <Tag size={20}/>
                        <p className="text-sm">{talk.tag}</p>
                    </div>

                    <div className=" gap-3">
                    <Button size="icon" variant="outline" className="border-none"><Save size={20} /></Button>
                    <Button size="icon" variant="outline" className="border-none"><Upload size={20}/></Button>
                    <Button size="icon" variant="outline" className="border-none"> <Mail size={20}/></Button>
                    </div>
                    
                </CardFooter>
              
            </Card>
            </>
      );
}

export default CardNote;