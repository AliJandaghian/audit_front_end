import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMachine, getMachine } from "../services/machineService";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

class MachineForm extends Form {
  state = {
    data: { name: "", departmentId: "" },
    errors: {},
    defectId: "",
  };

  schema = {
    _id: Joi.string().empty(""),
    name: Joi.string().min(2).max(10).required().label("Machine Name"),
    departmentId: Joi.string().required(),
  };

  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state.data.departmentId = user?.department._id;
  }

  async componentDidMount() {
    await this.populateMachine();
  }

  populateMachine = async () => {
    const { machineId } = this.props;
    if (machineId === "") return;

    let data = this.state.data;
    const { data: machine } = await getMachine(machineId);
    data._id = machineId;
    data.name = machine.name;
    this.setState({ data });
  };

  newForm() {
    let data = { ...this.state.data };
    data.name = "";
    return this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { data: machine } = await saveMachine(this.state.data);
      toast.success("Successfully Saved");
      this.props.machineId ? this.props.closeModal() : this.newForm();
      this.props.onSave(machine);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {
          errors[name] = ex.response.data;
        } else errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Modal show={true} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Machine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} className="form">
            {this.renderInput(
              "name",
              "Machine Name",
              "text",
              'e.g. "CNC1"',
              "false"
            )}
            <button className="button button__purple" type="submit">
              {(this.props.auditSettingId === "new" && "Create") || "Save"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default MachineForm;
