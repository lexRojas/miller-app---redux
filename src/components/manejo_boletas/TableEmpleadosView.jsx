import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import {Divider} from 'primereact/divider'


export default function TableEmpleadosView({ empleados,  buttonOptions }) {
  // Variables del contexto

  // Variables de estado interno

  const [selectedEmployee, SetSelectedEmployee] = useState(null);

  return (
    <div className="card">
      <DataTable
        selectionMode="single"
        stripedRows
        selection={selectedEmployee}
        onSelectionChange={(e) => SetSelectedEmployee(e.value)}
        value={empleados}
        dataKey="codigo_empleado"
        tableStyle={{ minWidth: "20rem" }}
        rows={10}
        paginator
        emptyMessage="No existen empleados"
      >
        <Column
          field="codigo_empleado"
          header="Codigo"
          sortField={true}
        ></Column>
        <Column
          field="nombre_completo"
          filter
          header="Nombre Completo"
          sortable
        ></Column>
      </DataTable>
      <Divider />
      <div className="flex justify-content-center align-content-center gap-5">
        <Button
          label={buttonOptions[0].label}
          visible = {buttonOptions[0].visible}
          onClick={e=>buttonOptions[0].action(selectedEmployee)}
          disabled = {selectedEmployee? false:true}
        />
        <Button
          label={buttonOptions[1].label}
          visible = {buttonOptions[1].visible}
          onClick={e=>buttonOptions[1].action(false)}
          autoFocus
        />
      </div>
    </div>
  );
}
