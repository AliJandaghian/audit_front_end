import http from "./userService";

const apiEndpoint = "/audits";

function auditsUrl(auditSettingId) {
  return `${apiEndpoint}/${auditSettingId}`;
}
function auditUrl(auditSettingId, auditId) {
  return `${apiEndpoint}/${auditSettingId}/${auditId}}`;
}

export async function getAudits(auditSettingId) {
  return await http.get(auditsUrl(auditSettingId));
}

export async function getAudit(auditSettingId, auditId) {
  return await http.get(auditUrl(auditSettingId, auditId));
}

export async function postAudit(audit) {
  return await http.post(auditUrl(apiEndpoint), audit);
}
export async function putAudit(audit, auditSettingId, auditId) {
  const body = { ...audit };
  delete body._id;
  return await http.put(auditUrl(auditSettingId, auditId), body);
}

export async function deleteAudit(auditSettingId, auditId) {
  return await http.delete(auditUrl(auditSettingId, auditId));
}
