import http from "./httpService";

const apiEndpoint = "/audits";

function auditsUrl(auditSettingId) {
  return `${apiEndpoint}/${auditSettingId}`;
}
function auditUrl(auditSettingId, auditId) {
  return `${apiEndpoint}/${auditSettingId}/${auditId}`;
}

export async function getAudits(query) {
  return await http.get(auditsUrl(query));
}

export async function getAudit(auditSettingId, auditId) {
  return await http.get(auditUrl(auditSettingId, auditId));
}

export async function saveAudit(audit) {
  const auditId = audit._id;
  if (auditId) {
    const body = { ...audit };
    delete body._id;
    return http.put(auditsUrl(auditId), body);
  }
  return await http.post(apiEndpoint, audit);
}

export async function deleteAudit(auditSettingId, auditId) {
  return await http.delete(auditUrl(auditSettingId, auditId));
}
