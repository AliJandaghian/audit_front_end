import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveDepartment, getDepartment } from "../services/departmentService";
import { getUsers } from "../services/userService";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

class AuditSettingForm extends Form {
  state = {
    data: { name: "", managerId: "" },
    errors: {},
    managers: [],
  };
  schema = {
    _id: Joi.string().empty(""),
    name: Joi.string().min(3).required().label("Audit Name"),
    managerId: Joi.string().empty(""),
  };

  async componentDidMount() {
    await this.populateDepartment();
    await this.populateManagers();
  }

  populateDepartment = async () => {
    const { departmentId } = this.props;
    if (departmentId === "") return;

    let data = this.state.data;
    const { data: department } = await getDepartment(departmentId);
    data._id = departmentId;
    data.name = department.name;
    data.managerId = department.manager._id;
    this.setState({ data });
  };

  populateManagers = async () => {
    const { data: allUsers } = await getUsers();
    let managers = [];
    let filteredUsers = allUsers.filter((user) => user.isManager);
    filteredUsers.forEach((element) => {
      managers.push({
        _id: element._id,
        name: `${element.name}  (${element.email}) - ${element.department?.name}`,
      });
    });
    this.setState({ managers });
  };

  newForm() {
    let data = { ...this.state.data };
    data.name = "";
    data.managerId = "";
    return this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { data: department } = await saveDepartment(this.state.data);
      toast.success("Successfully Saved");
      this.props.departmentId ? this.props.closeModal() : this.newForm();
      this.props.onSave(department);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {
          errors[name] = ex.response.data;
        } else errors.managerId = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Modal show={true} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} className="form">
            {this.renderInput(
              "name",
              "Department Name",
              "text",
              'e.g. "Coating"',
              "false"
            )}
            {this.renderSelect("managerId", "Manager", this.state.managers)}
            <button className="button button__purple" type="submit">
              {(this.props.auditSettingId === "new" && "Create") || "Save"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuditSettingForm;
