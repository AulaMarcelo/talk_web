import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {  FileTerminal, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  GET, POST } from "@/app/api/prompt/routes";
import { IUserAuth } from "@/interface/user/interface";


const formSchema = z.object({
  prompt:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),


})

type FormData =z.infer<typeof formSchema>;
interface DialogTerminalProps{
  userAuth: IUserAuth
}
function DialogTerminal({userAuth}:DialogTerminalProps) {
    const [open,setOpen] = useState<boolean>(false)
    const { toast } = useToast()
    const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
      mode:"onBlur",
      resolver:zodResolver(formSchema)
     })


     const {data:dataprompt,isPending,isError,error,refetch} = useQuery({
      queryKey:['notes'],
      queryFn:() => GET(userAuth.email!),
    })

    const mutation = useMutation({
      mutationFn: async (data:FormData) => {
          const dataResponse = {
             prompt:data.prompt,
             email:userAuth.email!
          }
        return     POST(dataResponse)
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
            
               title: "Processo cadastrado com sucesso",
             })
            
     
            setOpen(false)
             
        }
      
      }
     })

     const onSubmit = async (data:FormData) => {
      mutation.mutate(data)
    }
    if(isPending){
      return (
        <div className="bg-gray shadow-lg shadow-background/50  pe-3  ">
        <FileTerminal className="text-destructive" />
        </div>
      )
    }
    if(error){
      return ( 
      <div className="bg-gray shadow-lg shadow-background/50  pe-3  ">
       <FileTerminal className="text-destructive" />
      </div>)
    }
    return ( 
      <>
      <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger  className="bg-background shadow-lg shadow-background/50  pe-3  rounded hover:animate-pulse"> <FileTerminal /> </DialogTrigger>
          <DialogContent >
            
              <Card className={`flex flex-wrap justify-center items-center `}>
                  <CardContent className="flex-1">
                    <div className="mt-2 text-center">
                    <p>Prompt Atual</p>
                    <p>{dataprompt.prompt}</p>
                    </div>
                  <form onSubmit={handleSubmit(onSubmit)} >
                  <div>
                      <Input id="prompt" {...register('prompt')} placeholder="Digite o novo prompt" className="mb-3 mt-5 border-none"
                        //  onChange={(e) => setprompt(e.target.value)}
                        //  value={prompt}
                      />
                      {errors.prompt?.message && <p className="text-sm text-red-400">{errors.prompt?.message}</p> }
                    
                     
                 </div>
                 <div className="flex justify-end items-end mt-4 gap-3">
              
                  <Button size="icon" variant="outline" ><Save /></Button> 
                 
                 </div>
                 </form>
                  </CardContent>
              </Card>
          </DialogContent>
          </Dialog>
  </>
     );
}

export default DialogTerminal;