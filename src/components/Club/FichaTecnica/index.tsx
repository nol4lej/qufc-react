import { BoxComponent } from "@components/common/";
import FichaTecnicaModalForm from "./FichaTecnicaModalForm";
import FichasTecnicasTable from "./FichasTecnicasTable";
import { Cadete, FichaTecnica } from "@src/types/club/cadete";

interface FichasTecnicaComponentProps {
    cadeteId: Cadete["id"];
    fichasTecnicas: FichaTecnica[];
}

const FichasTecnicasComponent = ({ cadeteId, fichasTecnicas }: FichasTecnicaComponentProps ) => {
    return (
        <BoxComponent title="Ficha Técnica">
            <div className="grid grid-cols-1 gap-2">
                <FichaTecnicaModalForm cadeteId={cadeteId} />
                <FichasTecnicasTable fichasTecnicas={fichasTecnicas}/>
            </div>
        </BoxComponent>
    )
}

export default FichasTecnicasComponent;