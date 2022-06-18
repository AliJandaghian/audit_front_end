import React, { Component } from "react";
import { getAudits, deleteAudit } from "../services/auditService";
import { getDefects } from "../services/defectService";
import { getMachines } from "../services/machineService";
import { getAuditSetting } from "../services/auditSettingService";
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
  countMachineResults,
} from "../services/reportService";
import {
  convertToUTC
} from "../services/dateService";
import PieChart from "./common/pieChart";
import BarChartV from "./common/barChartV";
import { toast } from "react-toastify";

class Audits extends Component {
  state = {
    sideBarStatus: "side-bar__hide",
    audits: [],
    defects: [],
    machines: [],
    sortColumn: { path: "auditDate", order: "desc" },
    currentPage: 1,
    dateFilter: {},
    pageSize: 15,
    dateRange: "thisWeek",
    dateRangeLabel: "This Week",
    dateFrom: "",
    dateTo: "",
    auditId: "",
    isOpen: false,
    auditSettingId: "",
    auditSetting: {},
  };

  constructor() {
    super();
    this.state.auditSettingId = window.location.pathname.split("/", 3)[2];
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.timer !== this.state.timer) {
      await this.populateAudits();
    }
  }

  async componentDidMount() {
    await this.populateAuditSetting();
    await this.populateAudits();
    await this.populateDefects();
    await this.populateMachines();
  }

  populateAuditSetting = async () => {
    try {
      const auditSettingId = this.state.auditSettingId;
      const { data: auditSetting } = await getAuditSetting(auditSettingId);
      this.setState({ auditSetting });
    } catch (ex) {
      if (ex.response?.status === 400 || ex.response?.status === 404) {
        console.log(400);
        window.location = "/not-found";
      }
    }
  };

  populateAudits = async () => {
    const auditSettingId = this.state.auditSettingId;
    let { dateFilter, dateRangeLabel } = handleApplyFilter(
      this.state.dateRange,
      this.state.dateFrom,
      this.state.dateTo
    );
    dateFilter.startDate = convertToUTC(dateFilter.startDate)
    dateFilter.endDate = convertToUTC(dateFilter.endDate)
    
    const filterQuery = "?" + queryString.stringify({ ...dateFilter });

    const { data: audits } = await getAudits(auditSettingId + filterQuery);
    this.setState({ audits, dateRangeLabel });
  };

  populateDefects = async () => {
    const { data: defects } = await getDefects();
    this.setState({ defects });
  };

  populateMachines = async () => {
    const { data: allMachines } = await getMachines();
    const machines = allMachines.filter(
      (machine) => machine.location._id === this.props.user?.department?._id
    );
    this.setState({ machines });
  };

  getPieData = () => {
    const countResults = countBasedOnResults(this.state.audits);
    return { pieChartData: countResults };
  };

  getDefectsBarData = () => {
    const defects = this.state.defects;
    const defectsLabel = [];
    defects.forEach((defect) => defectsLabel.push(defect.name));
    const defectsCount = countDefects(this.state.audits, this.state.defects);
    return {
      defectsBarChartData: defectsCount,
      defectsBarChartLables: defectsLabel,
    };
  };

  getMachinesBarData = () => {
    const machines = this.state.machines;
    const machineResultLabels = [];
    machines.forEach((machine) => machineResultLabels.push(machine.name));

    const machineResults = countMachineResults(
      this.state.audits,
      this.state.machines
    );
    return {
      machinesBarChartData: machineResults,
      machinesBarChartLables: machineResultLabels,
    };
  };

  handleModalForm = () => {
    this.setState({ isOpen: true, dateRange: "thisWeek", timer: Date.now() });
  };

  handleEditButton = (auditId) => {
    this.setState({ auditId, isOpen: true });
  };

  handleAfterSave = (audit) => {
    let audits = [...this.state.audits];
    if (this.state.auditId === "") {
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
    const { defectsBarChartData, defectsBarChartLables } =
      this.getDefectsBarData();
    const { machinesBarChartData, machinesBarChartLables } =
      this.getMachinesBarData();
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
      auditSetting,
    } = this.state;
    const { user } = this.props;

    if (!auditSetting._id) {
      return <div />;
    }
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
                {`${dateRangeLabel} (Audits: ${totalCount}) `}
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
                  render="inTotal"
                  color="rgba(220, 20, 60, 0.6)"
                  hover="rgba(220, 20, 60, 0.8)"
                  className="defects-bar-chart"
                />
              </div>
            </div>
          </div>
          <div className="work-area">
            <div className="work-area__heading">
              <h3>{auditSetting?.name}</h3>
            </div>
            <div className="work-area__header">
              {(auditSetting &&
                new Date(auditSetting?.endDate) >= new Date() && (
                  <button
                    className="button button__green"
                    onClick={this.handleModalForm}
                  >
                    Audit Form
                  </button>
                )) || (
                <button className="button button__red">Aduit Expired</button>
              )}

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
              user={user}
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
            closeModal={() => this.setState({ isOpen: false, auditId: "" })}
            auditId={auditId}
            onSave={this.handleAfterSave}
            auditSettingId={auditSettingId}
            user={user}
          />
        )}
      </div>
    );
  }
}

export default Audits;
