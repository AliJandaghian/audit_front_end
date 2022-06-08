import React, { Component } from "react";
import {
  getAuditSettings,
  deleteAuditSetting,
} from "../services/auditSettingService";
import AuditSettingTable from "../components/auditSettingTable";
import AuditSettingForm from "../components/auditSettingForm";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";

class AuditSetting extends Component {
  state = {
    auditSettings: [],
    sortColumn: { path: "name", order: "desc" },
    pageSize: 10,
    currentPage: 1,
    auditSettingId: "new",
    user: {},
  };

  async componentDidMount() {
    const { data } = await getAuditSettings();
    const { user } = this.props;
    const auditSettings = data.filter(
      (a) => a.department === user.department._id
    );
    this.setState({ auditSettings });
  }

  handleAfterSave = (auditSetting) => {
    let auditSettings = [...this.state.auditSettings];
    if (this.state.auditSettingId === "new") {
      auditSettings.push(auditSetting);
    } else {
      let oldAuditSetting = auditSettings.find(
        (p) => p._id === auditSetting._id
      );
      const index = auditSettings.indexOf(oldAuditSetting);
      auditSettings[index] = auditSetting;
    }
    this.setState({ auditSettings });
  };

  handleModalForm = () => {
    this.setState({ isOpen: true });
  };

  handleEditButton = (auditSettingId) => {
    this.setState({ auditSettingId, isOpen: true });
  };

  handleDelete = async (auditSettingId) => {
    const originalAuditSettings = [...this.state.auditSettings];
    const auditSettings = originalAuditSettings.filter(
      (auditSetting) => auditSetting._id !== auditSettingId
    );
    this.setState({ auditSettings });
    try {
      await deleteAuditSetting(auditSettingId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("This Audit Setting has already been deleted.");
      this.setState({ auditSettings: originalAuditSettings });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      auditSettings: allAuditSttings,
    } = this.state;
    const sorted = _.orderBy(
      allAuditSttings,
      [sortColumn.path],
      [sortColumn.order]
    );
    const finalData = paginate(sorted, currentPage, pageSize);
    return { totalCount: allAuditSttings.length, data: finalData, sorted };
  };

  render() {
    const { sortColumn, pageSize, currentPage, auditSettingId } = this.state;
    const { totalCount, data } = this.getPagedData();
    const {user} = this.props;
    return (
      <div className="work-area main-page">
        <div className="work-area__heading">
          <h3>Audit Forms</h3>
        </div>
        <div className="work-area__header">
          {user?.isManager && (
            <button
              className="button button__purple"
              onClick={this.handleModalForm}
            >
              Design new Audit
            </button>
          )}
        </div>
        <AuditSettingTable
          auditSettings={data}
          onSort={this.handleSort}
          sortColumn={sortColumn}
          onEdit={this.handleEditButton}
          onDelete={this.handleDelete}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
        {this.state.isOpen && (
          <AuditSettingForm
            closeModal={() =>
              this.setState({ isOpen: false, auditSettingId: "new" })
            }
            auditSettingId={auditSettingId}
            onSave={this.handleAfterSave}
          />
        )}
      </div>
    );
  }
}

export default AuditSetting;
