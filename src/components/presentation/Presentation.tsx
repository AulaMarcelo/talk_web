"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import TalkExemple from "../talkexemple/TalkExemple";
import { signIn } from "next-auth/react";


const Presentation = () => {
    return ( 
     <>
        <Card className="flex flex-col justify-center items-center  p-8">
             <h1>Seja bem vindo ao Talk Note</h1>
             <p className="text-center">Entre e grave suas notações com voz de forma simples </p>
            
             <p className="text-center text-xs">Abaixo segue um exemplo de funcionamento mas entra no botão abaixo ou no topo do cabeçalho para registrar suas anotações</p>
             <p className="text-center text-xs text-yellow-100">Ao logar você pode usar da ia atravez de prompts para corrigir ou traduzir e outra atráz do menu no cabeçalho</p>
             <Button variant="outline" className="mt-3 mb-4" onClick={() => signIn()}><DoorOpen color="green"  /></Button>
             
             
        </Card>
        <div className="mt-4">
         <TalkExemple />
        </div>
        </>


     );
}
 
export default Presentation;