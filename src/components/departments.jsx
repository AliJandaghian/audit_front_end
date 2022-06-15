import React, { Component } from "react";
import DepartmentTable from "./departmentTable";
import DepartmentForm from "./departmentForm";
import {
  getDepartments,
  deleteDepartment,
} from "../services/departmentService";
import Pagination from "./common/pagination";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Departments extends Component {
  state = {
    departments: [],
    departmentId: "",
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: departments } = await getDepartments();
    this.setState({ departments });
  }

  handleModalForm = () => {
    this.setState({ isOpen: true });
  };

  handleEditButton = (departmentId) => {
    this.setState({ departmentId, isOpen: true });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleAfterSave = (department) => {
    let departments = [...this.state.departments];
    if (this.state.departmentId === "") {
      departments.push(department);
    } else {
      let oldDepartment = departments.find((p) => p._id === department._id);
      const index = departments.indexOf(oldDepartment);
      departments[index] = department;
    }
    this.setState({ departments });
  };

  handleDelete = async (departmentId) => {
    const originalDepartments = [...this.state.departments];
    const departments = originalDepartments.filter(
      (department) => department._id !== departmentId
    );
    this.setState({ departments });
    try {
      await deleteDepartment(departmentId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("This Department has already been deleted.");
      this.setState({ defects: originalDepartments });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      departments: allDepartments,
    } = this.state;
    const sorted = _.orderBy(
      allDepartments,
      [sortColumn.path],
      [sortColumn.order]
    );
    const finalData = paginate(sorted, currentPage, pageSize);
    return { totalCount: allDepartments.length, data: finalData, sorted };
  };

  render() {
    const { sortColumn, pageSize, currentPage, departmentId } = this.state;
    const { totalCount, data } = this.getPagedData();
    const { user } = this.props;
    return (
      <div className="work-area main-page">
        <div className="work-area__heading">
          <h3>Departments</h3>
        </div>
        <div className="work-area__header">
          {user?.isAdmin && (
            <button
              className="button button__purple"
              onClick={this.handleModalForm}
            >
              Add Department
            </button>
          )}
        </div>
        <DepartmentTable
          departments={data}
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
          <DepartmentForm
            closeModal={() =>
              this.setState({ isOpen: false, departmentId: "" })
            }
            departmentId={departmentId}
            onSave={this.handleAfterSave}
          />
        )}
      </div>
    );
  }
}

export default Departments;
