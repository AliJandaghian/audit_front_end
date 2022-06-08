import Joi from "joi-browser";
import Form from "./common/form";
import { getDefects } from "../services/defectService";
import { getMachines } from "../services/machineService";
import { saveAudit, getAudit } from "../services/auditService";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

class AuditForm extends Form {
  state = {
    data: { machineId: "", defectIds: [] },
    errors: {},
    machines: [],
    defects: [],
    auditId: "",
  };

  schema = {
    _id: Joi.string().empty(""),
    auditSettingId: Joi.string().required(),
    machineId: Joi.string().required().label("Machine Name"),
    defectIds: Joi.array().items(Joi.string()).label("Defects"),
  };

  async componentDidMount() {
    await this.getDefectsList();
    await this.getMachinesList();
    let data = {};
    let auditId = this.props.auditId === "new" ? "" : this.props.auditId;
    const auditSettingId = this.props.auditSettingId;
    data.auditSettingId = auditSettingId;
    if (auditId !== "") {
      const { data: audit } = await getAudit(auditSettingId, auditId);
      data._id = auditId;
      data.machineId = audit.machine._id;
      data.defectIds = audit.defects.map((defect) => defect._id);
    }

    this.setState({ auditId, data });
  }

  async getMachinesList() {
    const { data: allMachines } = await getMachines();
    const machines = allMachines.filter(machine=>machine.location._id==this.props.user?.department?._id)
    this.setState({ machines });
  }

  async getDefectsList() {
    const { data: defects } = await getDefects();
    let options = [];
    defects.forEach((value) => {
      options.push({
        value: value._id,
        label: `${value.name} (${value.description})`,
      });
    });
    this.setState({ defects: options });
  }

  newForm() {
    let data = { ...this.state.data };
    data.machineId = "";
    data.defectIds = [];
    return this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { data: audit } = await saveAudit(this.state.data);
      toast.success("Successfully Saved");
      (this.state.auditId) ? this.props.closeModal() : this.newForm();
      this.props.onSave(audit);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const name = ex.response.data.split(" ")[0].replace(/['"]+/g, "");
        if (name in this.state.data) {
          errors[name] = ex.response.data;
        } else errors.defectIds = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Modal show={true} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Audit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit} className="form">
            {this.renderSelect("machineId", "Machine", this.state.machines)}
            {this.renderMultiSelect("defectIds", "Defects", this.state.defects)}
            <button className="button button__green" type="submit">
              Save
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuditForm;
