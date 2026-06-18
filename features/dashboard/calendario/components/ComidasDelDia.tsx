import { ComidaCard } from './ComidaCard';
import { IDia } from '../types/calendario.types';
import { EmptyComidaCard } from './EmptyComidaCard';

export function ComidasDelDia({ comidasDelDia }: { comidasDelDia: IDia }) {
    return (
        <div className="flex flex-col gap-3">
            {comidasDelDia.comidas.map((comida) =>
                comida.titulo
                    ? <ComidaCard key={`${comidasDelDia.fecha}-${comida.tipoComida}`} receta={comida} />
                    : <EmptyComidaCard key={`${comida.tipoComida}-${comidasDelDia.fecha}`} tipoComida={comida.tipoComida} fecha={comidasDelDia.fecha} />
            )}
        </div>
    );
}