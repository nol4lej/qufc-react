import { getPagosFromCadete } from "@services/cadetes";
import { Pago } from "@src/types/pagos";
import { Cadete } from "@src/types/club/cadete";
import { useEffect, useState } from "react";

const useSituacionFinanciera = (cadeteId: Cadete["id"]) => {

    const [ pagos, setPagos ] = useState<Pago[]>([])

    useEffect(() => {
        const fetchPagos = async () => {
            const response = await getPagosFromCadete(cadeteId)
            console.log(response.data);
            setPagos(response.data)
        }
        fetchPagos()
    }, [cadeteId])

    return{
        pagos
    }
}

export default useSituacionFinanciera;