import React, { Component } from "react";
import Table from "./common/table";

class AuditTable extends Component {
  formatDate = (auditDate, dateOptions) => {
    return (
      <p>
        {new Date(Date.parse(auditDate)).toLocaleString("en-US", dateOptions)}
      </p>
    );
  };
  columns = [
    {
      path: "auditDate",
      label: "Date",
      content: (audit) => {
        return this.formatDate(audit.auditDate, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      key: "auditTime",
      label: "Time",
      content: (audit) => {
        return this.formatDate(audit.auditDate, {
          hour: "numeric",
          minute: "numeric",
        });
      },
    },
    { path: "auditor.name", label: "Auditor" },
    { path: "machine.name", label: "Machine" },
    {
      path: "defects",
      label: "Defects",
      content: (audit) => {
        return (
          <div>
            {audit.defects.map((def) => (
              <span
                key={audit._id + def._id}
                className="span-badge span-badge__red"
              >
                {def.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      key: "edit",
      label: "Edit",
      content: (item) => {
        return (
          (this.props.user?._id === item.auditor._id ||
            this.props.user?.isManager) && (
            <button
              className="button round-button edit-button"
              onClick={() => this.props.onEdit(item._id)}
            >
              <i className="fas fa-pen"></i>
            </button>
          )
        );
      },
    },
    {
      key: "delete",
      label: "Delete",
      content: (item) => {
        return (
          (this.props.user?._id === item.auditor._id ||
            this.props.user?.isManager) && (
            <button
              className="button round-button delete-button"
              onClick={() => {
                if (window.confirm("Deleting the item?")) {
                  this.props.onDelete(item._id);
                }
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          )
        );
      },
    },
  ];

  render() {
    const { audits, onSort, sortColumn } = this.props;
    return (
      <Table
        data={audits}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default AuditTable;
