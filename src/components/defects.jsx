import React, { Component } from "react";
import DefectTable from "./defectTable";
import DefectForm from "./defectForm";
import { getDefects, deleteDefect } from "../services/defectService";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Defects extends Component {
  state = {
    defects: [],
    defectId: "",
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: defects } = await getDefects();
    this.setState({ defects });
  }

  handleModalForm = () => {
    this.setState({ isOpen: true });
  };

  handleEditButton = (defectId) => {
    this.setState({ defectId, isOpen: true });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleAfterSave = (defect) => {
    let defects = [...this.state.defects];
    if (this.state.defectId === "") {
      defects.push(defect);
    } else {
      let oldDefect = defects.find((p) => p._id === defect._id);
      const index = defects.indexOf(oldDefect);
      defects[index] = defect;
    }
    this.setState({ defects });
  };

  handleDelete = async (defectId) => {
    const originalDefects = [...this.state.defects];
    const defects = originalDefects.filter((defect) => defect._id !== defectId);
    this.setState({ defects });
    try {
      await deleteDefect(defectId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("This Defect has already been deleted.");
      this.setState({ defects: originalDefects });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      defects: allDefects,
    } = this.state;
    const sorted = _.orderBy(allDefects, [sortColumn.path], [sortColumn.order]);
    const finalData = paginate(sorted, currentPage, pageSize);
    return { totalCount: allDefects.length, data: finalData, sorted };
  };

  render() {
    const { sortColumn, pageSize, currentPage, defectId } = this.state;
    const { totalCount, data } = this.getPagedData();
    const { user } = this.props;
    return (
      <div className="work-area main-page">
        <div className="work-area__heading">
          <h3>Defects</h3>
        </div>
        <div className="work-area__header">
          {user?.isManager && (
            <button
              className="button button__purple"
              onClick={this.handleModalForm}
            >
              Add Defect
            </button>
          )}
        </div>
        <DefectTable
          defects={data}
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
          <DefectForm
            closeModal={() => this.setState({ isOpen: false, defectId: "" })}
            defectId={defectId}
            onSave={this.handleAfterSave}
          />
        )}
      </div>
    );
  }
}

export default Defects;
