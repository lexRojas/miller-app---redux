import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function TableEmpleadosView({
  empleados,
}) {
  // Variables del contexto


  // Variables de estado interno


  return (
    <div className="card">
      <DataTable
        selectionMode= "single"
        value={empleados}
        dataKey="id"
        tableStyle={{ minWidth: "20rem" }}
        rows={10}
        paginator
        emptyMessage="No existen empleados"
      >
        <Column field="codigo_empleado" header="Codigo" sortField={true}></Column>
        <Column field="nombre_completo" filter header="Nombre Completo"  sortable     ></Column>
      </DataTable>
    </div>
  );
}
