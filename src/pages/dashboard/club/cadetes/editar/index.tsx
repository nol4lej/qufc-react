import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCadeteById } from "@services/cadetes";
import { Cadete } from "@src/types/club/cadete";

import { SectionComponent } from "@components/common/SectionComponent";
import CadeteForm from "@components/Club/Cadetes/CadeteForm";
import ApoderadosComponent from "@components/Club/Apoderados";
import FichasTecnicasComponent from "@components/Club/FichaTecnica";
import SituacionFinancieraComponent from "@components/Club/SituacionFinanciera";

export default function EditarCadete() {

    const { id } = useParams();

    const [cadete, setCadete] = useState<Cadete | null>(null);

    useEffect(() => {
        const fetchCadete = async () => {
            if (!id) return
            try {
                const response = await getCadeteById(id);

                // VERSION DE TEST
                const cadete = response.data.filter((cadete: Cadete) => cadete.id === id);
                setCadete(cadete[0])
                console.log(cadete[0]);

            } catch (error) {
                console.error(error);
            }
        };

        fetchCadete();
    }, [id]);

    return (
        <SectionComponent title="Perfil de Cadete">
            {
                cadete &&
                <div className="grid gap-6 grid-cols-1">
                    <CadeteForm cadete={cadete} />
                    <ApoderadosComponent cadeteId={cadete.id} apoderados={cadete.apoderados} />
                    <FichasTecnicasComponent cadeteId={cadete.id} fichasTecnicas={cadete.fichas_tecnicas}/>
                    <SituacionFinancieraComponent cadeteId={cadete.id}/>
                </div>
            }
        </SectionComponent>
    );
}