"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Eraser, Mic, MicOff, Save } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { POST } from "@/app/api/talk/route";
import { Button } from "@/components/ui/button";

interface SpeechToTextProps{
  refetch:()=>void;
  addToDo:(talk:ITalk) => void;
  email:string;
}

const formSchema = z.object({
  title:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),

  tag:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),

  text:z.string().refine((val) => val.length >= 1, {
    message: "Tem que ter no minimo 1 caracteres",
  }),

  email:z.string().optional()

})

type FormData =z.infer<typeof formSchema>;


function SpeechToText({addToDo,refetch,email}:SpeechToTextProps) {

  const { toast } = useToast()

  
  const [recognition, setRecognition] = useState<any>(null); // Estado para armazenar o objeto de reconhecimento de fala
  const [status,setStatus] = useState<boolean>(false);

  const { handleSubmit,register,setValue,getValues,formState:{errors}} = useForm<FormData>({
    mode:"onBlur",
    resolver:zodResolver(formSchema)
   })

   const [open, setOpen] = useState(false);
  const handleSpeechRecognition = () => {

      setStatus(true)
    if ('webkitSpeechRecognition' in window) {
       //@ts-ignore
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true; // Permite que a gravação continue mesmo durante períodos de silêncio
     
      
      recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
      
        const textOld = getValues("text")
        setValue("text", result[0].transcript ? textOld + ' ' + result[0].transcript:'',{ shouldValidate: true });
      };
      recognition.start();
      setRecognition(recognition); // Armazena o objeto de reconhecimento de fala no estado
    } else {
      alert('API de reconhecimento de fala não suportada neste navegador.');
    }
  };

  const stopSpeechRecognition = () => {
    if (recognition) {
      setStatus(false)
      recognition.stop();
    }
  };


  
  const handleClearTrascript = () =>{
    setValue("text", '',{ shouldValidate: true });
  }



   const mutation = useMutation({
    mutationFn: async (data:FormData) => {
      let dataResponse = {
        ...data,
        email:email
      };
     
      
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
          
           stopSpeechRecognition()
         // addToDo({tag,title,text:transcript})
         setValue("title", '',{ shouldValidate: true });
         setValue("tag", '',{ shouldValidate: true });
         setValue("text", '',{ shouldValidate: true });
          setOpen(false);
          refetch();
           
      }
    
    }
   })
   const onSubmit = async (data:FormData) => {

 
   mutation.mutate(data)
 }
  return (  
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger  className="bg-red-500 shadow-lg shadow-red-500/50  p-2 ms-3 rounded hover:animate-pulse"> <Mic /> </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                <DialogTitle>Clique para gravar</DialogTitle>
                <DialogDescription className="flex justify-center ">
                     {!status ?  
                        <div className="bg-red-600 p-3 mt-4 rounded-xl" onClick={handleSpeechRecognition}>
                            <Mic className="text-center" color="white" />
                        </div>
                    :
                        <div className="bg-red-600 p-3 mt-4 rounded-xl" onClick={stopSpeechRecognition}>
                            <MicOff className="text-center" color="white" />
                        </div>
                    }

                   

                </DialogDescription>
              

                </DialogHeader>
                <Card className={`flex flex-wrap justify-center items-center `}>
                    <CardContent className="flex-1">
                    <form onSubmit={handleSubmit(onSubmit)} >
                    <div>
                        <Input id="tag" {...register('tag')} placeholder="Digite a tag" className="mb-3 mt-5 border-none"
                          //  onChange={(e) => setTag(e.target.value)}
                          //  value={tag}
                        />
                        {errors.tag?.message && <p className="text-sm text-red-400">{errors.tag?.message}</p> }
                      
                        <Input id="title" {...register('title')} placeholder="Digite o Titulo" className="mb-3 mt-5 border-none"
                        //  onChange={(e) => setTitle(e.target.value)}
                        //  value={title}
                        />
                        {errors.title?.message && <p className="text-sm text-red-400">{errors.title?.message}</p> }
                      
                        <Textarea id="text" {...register('text')} placeholder="Trascreva" className="mb-3 mt-5 " 
                        //  onChange={(e) => setTranscript(e.target.value) } 
                        //  value={transcript}
                        />
                        {errors.text?.message && <p className="text-sm text-red-400">{errors.text?.message}</p> }
                   </div>
                   <div className="flex justify-end items-end mt-4 gap-3">
                
                    <Button size="icon" variant="outline" ><Save /></Button> 
                     <div className="p-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    <Eraser onClick={handleClearTrascript} className="border" />
                    </div>
                   </div>
                   </form>
                    </CardContent>
                </Card>
            </DialogContent>
            </Dialog>
    </>
  );
}

export default SpeechToText;