import React, { Component } from "react";
import { getAudits, deleteAudit } from "../services/auditService";
import { getDefects } from "../services/defectService";
import { getMachines } from "../services/machineService";
import AuditTable from "./auditTable";
import AuditForm from "./auditForm";
import _ from "lodash";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import DateFilter from "./common/dateFilter";
import queryString from "query-string";
import {
  handleApplyFilter,
  countBasedOnResults,
  countDefects,
  countMachineResults
} from "../services/reportService";
import PieChart from "./common/pieChart";
import BarChartV from "./common/barChartV";
import { toast } from "react-toastify";

class Audits extends Component {
  state = {
    sideBarStatus: "side-bar__hide",
    audits: [],
    defects: [],
    machines:[],
    sortColumn: { path: "auditDate", order: "desc" },
    currentPage: 1,
    dateFilter: {},
    pageSize: 15,
    dateRange: "thisWeek",
    dateRangeLabel: "This Week",
    dateFilter: {},
    dateFrom: "",
    dateTo: "",
    auditId: "new",
    isOpen: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.timer !== this.state.timer) {
      await this.getData();
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    const auditSettingId = window.location.pathname.split("/", 3)[2];
    let { dateFilter, dateRangeLabel } = handleApplyFilter(
      this.state.dateRange,
      this.state.dateFrom,
      this.state.dateTo
    );
    const filterQuery = "?" + queryString.stringify({ ...dateFilter });
    const { data: audits } = await getAudits(auditSettingId + filterQuery);
    const { data: defects } = await getDefects();
    const { data: machines } = await getMachines();

    this.setState({ audits, defects,machines, dateRangeLabel, auditSettingId });
  }
  getPieData = () => {
    const countResults = countBasedOnResults(this.state.audits);
    return { pieChartData: countResults };
  };

  getDefectsBarData = () => {
    const defects = this.state.defects;
    const defectsLabel = [];
    defects.forEach((defect) => defectsLabel.push(defect.name));
    const defectsCount = countDefects(this.state.audits, this.state.defects);
    return { defectsBarChartData: defectsCount, defectsBarChartLables: defectsLabel };
  };

  getMachinesBarData = () => {
    const machines = this.state.machines;
    const machineResultLabels = [];
    machines.forEach((machine) => machineResultLabels.push(machine.name));

    const machineResults = countMachineResults(this.state.audits, this.state.machines);
    return { machinesBarChartData: machineResults, machinesBarChartLables: machineResultLabels };
  };

  handleModalForm = () => {
    this.setState({ isOpen: true });
  };

  handleEditButton = (auditId) => {
    this.setState({ auditId, isOpen: true });
  };

  handleAfterSave = (audit) => {
    let audits = [...this.state.audits];

    if (this.state.auditId === "new") {
      audits.push(audit);
    } else {
      let oldAudit = audits.find((p) => p._id === audit._id);
      const index = audits.indexOf(oldAudit);
      audits[index] = audit;
    }
    this.setState({ audits, dateRange: "thisWeek" });
  };

  handleDelete = async (auditId) => {
    const originalAudits = [...this.state.audits];
    const audits = originalAudits.filter((audit) => audit._id !== auditId);
    this.setState({ audits });
    try {
      await deleteAudit(this.state.auditSettingId, auditId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("This Audit has already been deleted.");
      this.setState({ audits: originalAudits });
    }

  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDateRange = ({ currentTarget: input }) => {
    this.setState({ dateRange: input.name, timer: Date.now() });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, audits: allAudits } = this.state;
    const sorted = _.orderBy(allAudits, [sortColumn.path], [sortColumn.order]);
    const finalData = paginate(sorted, currentPage, pageSize);
    return { totalCount: allAudits.length, data: finalData, sorted };
  };

  render() {
    const { totalCount, data } = this.getPagedData();
    const { defectsBarChartData, defectsBarChartLables } = this.getDefectsBarData();
    const { machinesBarChartData, machinesBarChartLables } = this.getMachinesBarData();
    const { pieChartData } = this.getPieData();
    const {
      sideBarStatus,
      pageSize,
      dateRangeLabel,
      currentPage,
      dateFrom,
      dateTo,
      auditId,
      auditSettingId,
    } = this.state;

    return (
      <div className="container-main">
        <div className="layout">
          <div className="side-bar">
            <button
              onClick={() => this.setState({ sideBarStatus: "side-bar__open" })}
              className="side-bar__toggler"
            >
              <i className="fas fa-chart-bar"></i>
            </button>
            <div className={`side-bar__panel ${sideBarStatus}`}>
              <div className="side-bar__header">
                {dateRangeLabel}
                <button
                  onClick={() =>
                    this.setState({ sideBarStatus: "side-bar__hide" })
                  }
                  className="side-bar__close"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="side-bar__body">
                <PieChart
                  data={pieChartData}
                  label="Audits"
                  labels={["Pass", "Fail"]}
                />
                <BarChartV
                  data={machinesBarChartData}
                  dataLabel="Yields"
                  title="Machine Yields"
                  labels={machinesBarChartLables}
                  color="rgba(70, 60, 180, 0.6)"
                  hover="rgba(70, 60, 180, 0.8)"
                />
                <BarChartV
                  data={defectsBarChartData}
                  dataLabel="Defects"
                  title="Defects"
                  labels={defectsBarChartLables}
                  render='inTotal'
                  color="rgba(220, 20, 60, 0.6)"
                  hover="rgba(220, 20, 60, 0.8)"
                  className = 'defects-bar-chart'
                />
              </div>
            </div>
          </div>
          <div className="work-area">
            <div className="work-area__header">
              <button
                className="button button__green"
                onClick={this.handleModalForm}
              >
                Audit Form
              </button>
              <DateFilter
                onChangeTo={(e) => this.setState({ dateTo: e.target.value })}
                onChangeFrom={(e) =>
                  this.setState({ dateFrom: e.target.value })
                }
                onItemClick={this.handleDateRange}
                selectedFrom={dateFrom}
                selectedTo={dateTo}
              />
            </div>

            <AuditTable
              audits={data}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
              onEdit={this.handleEditButton}
              onDelete={this.handleDelete}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        {this.state.isOpen && (
          <AuditForm
            closeModal={() => this.setState({ isOpen: false, auditId: "new" })}
            auditId={auditId}
            onSave={this.handleAfterSave}
            auditSettingId={auditSettingId}
          />
        )}
      </div>
    );
  }
}

export default Audits;
