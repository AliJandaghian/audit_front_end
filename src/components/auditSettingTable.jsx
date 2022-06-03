import React, { Component } from "react";
import Table from "./common/table";

class AuditSettingTable extends Component {
  formatDate = (auditDate) => {
    return new Date(auditDate).toISOString().substring(0, 10);
  };

  foramtEndDate = (endDate) => {
    return new Date(endDate) <= Date.now() ? "span-badge__red" : "";
  };

  columns = [
    {
      path: "name",
      label: "Audit Name",
    },
    {
      path: "startDate",
      label: "Start Date",
      content: (auditSetting) => {
        return this.formatDate(auditSetting.startDate);
      },
    },
    {
      path: "endDate",
      label: "Expiration Date",
      content: (auditSetting) => {
        return (
          <p className={this.foramtEndDate(auditSetting.endDate)}>
            {this.formatDate(auditSetting.endDate)}
          </p>
        );
      },
    },
    {
      key: "open",
      label: "Open Audit",
      content: (item) => {
        return (
          <button
            className="button round-button open-button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/audits/${item._id}`;
            }}
          >
            <i class="fas fa-external-link-alt"></i>
          </button>
        );
      },
    },

    {
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
    },
    {
      key: "delete",
      label: "Delete",
      content: (item) => {
        return (
          <button
            className="button round-button delete-button"
            onClick={() => {
              if (window.confirm("Delte the item?")) {
                this.props.onDelete(item._id);
              }
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        );
      },
    },
  ];
  render() {
    const { auditSettings, onSort, sortColumn } = this.props;
    return (
      <Table
        data={auditSettings}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default AuditSettingTable;
