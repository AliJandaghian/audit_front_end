import React, { Component } from "react";
import MachineTable from "./machineTable";
import MachineForm from "./machineForm";
import { getMachines, deleteMachine } from "../services/machineService";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Machines extends Component {
  state = {
    machines: [],
    machineId: "",
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: allMachines } = await getMachines();
    const { user } = this.props;
    const machines = allMachines.filter(
      (machine) => machine.location._id === user.department._id
    );
    this.setState({ machines });
  }

  handleModalForm = () => {
    this.setState({ isOpen: true });
  };

  handleEditButton = (machineId) => {
    this.setState({ machineId, isOpen: true });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleAfterSave = (machine) => {
    let machines = [...this.state.machines];
    if (this.state.machineId === "") {
      machines.push(machine);
    } else {
      let oldMachine = machines.find((p) => p._id === machine._id);
      const index = machines.indexOf(oldMachine);
      machines[index] = machine;
    }
    this.setState({ machines });
  };

  handleDelete = async (machineId) => {
    const originalMachines = [...this.state.machines];
    const machines = originalMachines.filter(
      (machine) => machine._id !== machineId
    );
    this.setState({ machines });
    try {
      await deleteMachine(machineId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("This Machine has already been deleted.");
      this.setState({ machines: originalMachines });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      machines: allMachines,
    } = this.state;
    const sorted = _.orderBy(
      allMachines,
      [sortColumn.path],
      [sortColumn.order]
    );
    const finalData = paginate(sorted, currentPage, pageSize);
    return { totalCount: allMachines.length, data: finalData, sorted };
  };

  render() {
    const { sortColumn, pageSize, currentPage, machineId } = this.state;
    const { totalCount, data } = this.getPagedData();
    const { user } = this.props;
    return (
      <div className="work-area main-page">
        <div className="work-area__heading">
          <h3>Machines</h3>
        </div>
        <div className="work-area__header">
          {user?.isManager && (
            <button
              className="button button__purple"
              onClick={this.handleModalForm}
            >
              Add a Machine
            </button>
          )}
        </div>
        <MachineTable
          machines={data}
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
          <MachineForm
            closeModal={() => this.setState({ isOpen: false, machineId: "" })}
            machineId={machineId}
            onSave={this.handleAfterSave}
            user={user}
          />
        )}
      </div>
    );
  }
}

export default Machines;
