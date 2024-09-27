import ApoderadosTable from "./ApoderadosTable";
import ApoderadoModalForm from "./ApoderadoModalForm";
import { BoxComponent } from "@components/common";
import { Apoderado, Cadete } from "@src/types/club/cadete";

interface ApoderadosComponentProps {
    cadeteId: Cadete["id"];
    apoderados: Apoderado[];
}

const ApoderadosComponent = ({ cadeteId, apoderados }: ApoderadosComponentProps) => {
    return (
        <BoxComponent title="Apoderados de Cadete">
            <div className="grid grid-cols-1 gap-2">
                <ApoderadoModalForm cadeteId={cadeteId} />
                <ApoderadosTable apoderados={apoderados} />
            </div>
        </BoxComponent>
    );
}

export default ApoderadosComponent;
