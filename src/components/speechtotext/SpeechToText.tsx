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

interface SpeechToTextProps{
  addToDo:(talk:ITalk) => void
}
function SpeechToText({addToDo}:SpeechToTextProps) {
  const [transcript, setTranscript] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  
  const [recognition, setRecognition] = useState<any>(null); // Estado para armazenar o objeto de reconhecimento de fala
  const [status,setStatus] = useState<boolean>(false);
   
  const handleSpeechRecognition = () => {
      setTranscript('')
      setStatus(true)
    if ('webkitSpeechRecognition' in window) {
       //@ts-ignore
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true; // Permite que a gravação continue mesmo durante períodos de silêncio
     
      
      recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        setTranscript((item) => item + result[0].transcript);
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


  const handleSave =()=>{
    stopSpeechRecognition()
    addToDo({tag,title,text:transcript})
    setTag('')
    setTitle('')
    setTranscript('')

  }
  return (  
    <>
        <Dialog>
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
                    <div>
                        <Input id="tag" name="tag" placeholder="Digite a tag" className="mb-3 mt-5 border-none"
                           onChange={(e) => setTag(e.target.value)}
                           value={tag}
                        />
                        <Input id="title" name="title" placeholder="Digite o Titulo" className="mb-3 mt-5 border-none"
                         onChange={(e) => setTitle(e.target.value)}
                         value={title}
                        />
                        <Textarea id="title" name="title" placeholder="Digite o Titulo" className="mb-3 mt-5 " 
                        onChange={(e) => setTranscript(e.target.value) } 
                        value={transcript}/>
                   </div>
                   <div className="flex justify-end items-end mt-4 gap-3">
                   <DialogClose asChild>
                    <Save onClick={handleSave}/>
                    </DialogClose>
                    <Eraser onClick={()=>setTranscript('')} />
                   </div>
                    </CardContent>
                </Card>
            </DialogContent>
            </Dialog>
    </>
  );
}

export default SpeechToText;