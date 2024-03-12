// TableComponent.tsx
import React from "react";

interface TableComponentProps {
  columns: string[];
  data: any[]; // Adjust the type based on the actual structure of your data
}

const Table: React.FC<TableComponentProps> = ({ columns, data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((label: string, index: number) => (
            <th key={index} className="w-32 text-left">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {columns.map((column: string, colIndex: number) => (
              <td key={colIndex} className="w-32 text-left">
                {item[column.toLowerCase()].toString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
