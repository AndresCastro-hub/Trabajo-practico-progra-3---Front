import { ComidaCard } from './ComidaCard';
import { IComida } from '../types/calendarioTypes';
import { EmptyComidaCard } from './EmptyComidaCard';

export function ComidasDelDia({ comidasDelDia }: { comidasDelDia: IComida[] }) {
    return(
        <>
            {
                comidasDelDia.map((comida) => {
                    if(comida.titulo){
                        return (<ComidaCard key={comida.titulo} receta={comida} />)
                    }
                    else {
                        return (<EmptyComidaCard key={comida.tipoComida} tipoComida={comida.tipoComida} />)
                    }                
                })
            }
        </>
    )
}