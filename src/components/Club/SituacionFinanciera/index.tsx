import { BoxComponent } from "@components/common";
import useSituacionFinanciera from "@hooks/cadete/useSituacionFinanciera";
import SituacionFinancieratTable from "./SituacionFinancieratTable";
import { Cadete } from "@src/types/club/cadete";

const SituacionFinancieraComponent = ( { cadeteId }: { cadeteId: Cadete["id"] } ) => {

    const { pagos } = useSituacionFinanciera(cadeteId)

    return (
        <BoxComponent title="Situación Financiera">
            <div className="grid grid-cols-1 gap-2">
                <SituacionFinancieratTable pagos={pagos}/>
            </div>
        </BoxComponent>
    )
}

export default SituacionFinancieraComponent;