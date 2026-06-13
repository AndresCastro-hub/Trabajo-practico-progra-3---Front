import { ComidaCard } from './ComidaCard';
import { IDia } from '../types/calendario.types';
import { EmptyComidaCard } from './EmptyComidaCard';

export function ComidasDelDia({ comidasDelDia }: { comidasDelDia: IDia }) {
    return(
        <>
            {
                comidasDelDia.comidas.map((comida) => {
                    if(comida.titulo){
                        return (<ComidaCard key={comida.titulo} receta={comida} />)
                    }
                    else {
                        return (<EmptyComidaCard key={comida.tipoComida} tipoComida={comida.tipoComida} fecha={comidasDelDia.fecha} />)
                    }                
                })
            }
        </>
    )
}