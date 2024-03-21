"use client"
import { Mail, Save, Tag, Trash, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { convertDataHoraParaPtBr } from "@/utils/convertDate";
import { useMutation } from "@tanstack/react-query";
import { DELETE } from "@/app/api/talk/route";
import { useToast } from "../ui/use-toast";




interface CardNoteProps{
    refetch:() =>void;
    talk:ITalk
}
function CardNote({talk,refetch}:CardNoteProps) {
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: async (id:string) => {
        
          
          return     DELETE(id)
          .then(response => response)
        },
        onError:(error) => {
          toast({
            title: error.message,
           
          })
          console.log( error.message)
        },
        onSuccess:(data) =>{
    
          if(data.error){
                 toast({
                     variant: "destructive" ,
                      title: data.error,
                  })
                  console.log(data.error)
          }else{
               toast({
              
                 title: "Deletado com sucesso",
               })
              
              
              refetch();
               
          }
        
        }
       })

       const onSubmit = async (id:string) => {

 
        mutation.mutate(id)
      }
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
                    <Button size="icon" variant="outline" className="border-none" onClick={()=> onSubmit(talk.id!)}> <Trash size={20}/></Button>
                    </div>
                    
                </CardFooter>
               
              
            </Card>
            </>
      );
}

export default CardNote;