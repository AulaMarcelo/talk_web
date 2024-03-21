import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export function convertDataHoraParaPtBr(data:Date){

    const dataFormatada = format(data, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    return dataFormatada
  }