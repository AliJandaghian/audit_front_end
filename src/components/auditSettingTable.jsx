import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";

class AuditSettingTable extends Component {
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
        return new Date(auditSetting.startDate).toLocaleString("en-CA", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
      },
    },
    {
      path: "endDate",
      label: "Expiration Date",
      content: (auditSetting) => {
        return (
          <p className={this.foramtEndDate(auditSetting.endDate)}>
            {new Date(auditSetting.endDate).toISOString().substring(0, 10)}
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
