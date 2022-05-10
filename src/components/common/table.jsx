import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, onSort, sortColumn }) => {
  return (
    <div className="table-responsive">
    <table className="table table-light ">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
    </div>
  );
};

export default Table;
