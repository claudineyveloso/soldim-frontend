// components/UsersTable.tsx
import React, { useEffect, useRef, useState } from "react";
import "tabulator-tables/dist/css/tabulator.min.css";

const UsersTable = ({
  data,
  deleteUser,
}: {
  data: any[];
  deleteUser: (id: number) => void;
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tabulatorInstance, setTabulatorInstance] = useState<any>(null);

  const deleteIcon = (
    cell: any,
    formatterParams: any,
    onRendered: () => void,
  ): string => {
    return '<button class="btn-delete">Delete</button>';
  };

  useEffect(() => {
    const initializeTabulator = async () => {
      try {
        const TabulatorModule = await import("tabulator-tables");
        const Tabulator = TabulatorModule.default;

        if (tableRef.current) {
          const instance = new Tabulator(tableRef.current, {
            data,
            layout: "fitColumns",
            columns: [
              { title: "Name", field: "name" },
              { title: "Email", field: "email" },
              {
                title: "Actions",
                field: "actions",
                formatter: deleteIcon,
                width: 100,
                align: "center",
                cellClick: (e: Event, cell: any) => {
                  const userId = cell.getRow().getData().id;
                  deleteUser(userId);
                },
              },
            ],
          });
          setTabulatorInstance(instance);
        }
      } catch (error) {
        console.error("Failed to load Tabulator:", error);
      }
    };

    initializeTabulator();
  }, []);

  useEffect(() => {
    if (tabulatorInstance) {
      tabulatorInstance.replaceData(data);
    }
  }, [data, tabulatorInstance]);

  return <div ref={tableRef} />;
};

export default UsersTable;
