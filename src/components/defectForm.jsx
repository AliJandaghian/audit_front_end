import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveDefect, getDefect } from "../services/defectService";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

class DefectForm extends Form {
  state = {
    data: { name: "", description: "" },
    errors: {},
    defectId: "",
  };
  schema = {
    _id: Joi.string().empty(""),
    name: Joi.string().min(2).max(2).required().label("Audit Name"),
    description: Joi.string().max(25).required(),
  };

  async componentDidMount() {
    await this.populateDefect();
  }

  populateDefect = async () => {
    let { defectId } = this.props;
    if (defectId === "") return;

    let data = this.state.data;
    const { data: defect } = await getDefect(defectId);
    data._id = defectId;
    data.name = defect.name;
    data.description = defect.description;

    this.setState({ data });
  };

  newForm() {
    let data = { ...this.state.data };
    data.name = "";
    data.description = "";
    return this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { data: defect } = await saveDefect(this.state.data);
      toast.success("Successfully Saved");
      this.props.defectId ? this.props.closeModal() : this.newForm();
      this.props.onSave(defect);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {
          errors[name] = ex.response.data;
        } else errors.description = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Modal show={true} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Defect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} className="form">
            {this.renderInput(
              "name",
              "Defect Name Tag",
              "text",
              "Only TWO characters",
              "false"
            )}
            {this.renderInput(
              "description",
              "Description",
              "text",
              "Definition of defect",
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

export default DefectForm;
