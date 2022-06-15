import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";

class DefectTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name Tag",
    },
    {
      path: "description",
      label: "Description",
    },
  ];

  editColumn = {
    key: "edit",
    label: "Edit",
    content: (item) => {
      return (
        <button
          className="button round-button edit-button"
          onClick={() => this.props.onEdit(item._id)}
        >
          <i className="fas fa-pen"></i>
        </button>
      );
    },
  };

  deleteColumn = {
    key: "delete",
    label: "Delete",
    content: (item) => {
      return (
        <button
          className="button round-button delete-button"
          onClick={() => {
            if (window.confirm("Delete the item?")) {
              this.props.onDelete(item._id);
            }
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      );
    },
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user?.isManager) {
      this.columns.push(this.editColumn);
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { defects, onSort, sortColumn } = this.props;
    return (
      <Table
        data={defects}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default DefectTable;
