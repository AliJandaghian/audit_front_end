import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else sortColumn = { path, order: "asc" };
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (col) => {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path !== col.path || !col.path) return null;
    if (sortColumn.order === "asc") return <i class="fas fa-angle-up"></i>;
    return <i class="fas fa-angle-down"></i>;
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.path || col.key}
              scope = 'col'
              className="clickable"
              onClick={() => this.raiseSort(col.path)}
            >
              <div className="table-header"><p>{col.label}</p>{this.renderSortIcon(col)}</div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
