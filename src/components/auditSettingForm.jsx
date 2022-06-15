import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  saveAuditSetting,
  getAuditSetting,
} from "../services/auditSettingService";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

class AuditSettingForm extends Form {
  state = {
    data: { name: "", endDate: "", departmentId: "" },
    errors: {},
  };
  schema = {
    _id: Joi.string().empty(""),
    name: Joi.string().min(3).required().label("Audit Name"),
    departmentId: Joi.string().empty(""),
    endDate: Joi.date().required().label("Expiration Date"),
  };

  async componentDidMount() {
    const user = this.props.user;
    let data = this.state.data;
    data.departmentId = user?.department._id;
    const { auditSettingId } = this.props;
    if (auditSettingId !== "") {
      const { data: auditSetting } = await getAuditSetting(auditSettingId);
      data._id = auditSettingId;
      data.name = auditSetting.name;
      data.endDate = new Date(auditSetting.endDate).toISOString().slice(0, 10);
    }
    this.setState({ data });
  }

  newForm() {
    let data = { ...this.state.data };
    data.name = "";
    data.endDate = [];
    return this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { data: auditSetting } = await saveAuditSetting(this.state.data);
      toast.success("Successfully Saved");
      this.props.auditSettingId ? this.props.closeModal() : this.newForm();
      this.props.onSave(auditSetting);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {
          errors[name] = ex.response.data;
        } else errors.endDate = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Modal show={true} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Design Audit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} className="form">
            {this.renderInput(
              "name",
              "Audit Name",
              "text",
              'e.g. "After Polishing"',
              "false"
            )}
            {this.renderInput("endDate", "Expiration date", "date")}
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
