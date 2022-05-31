import http from "./httpService";

const apiEndpoint = "/auditsettings";

function auditSettingUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getAuditSetting(auditSettingId) {
  return await http.get(auditSettingUrl(auditSettingId));
}

export async function getAuditSettings() {
  return await http.get(apiEndpoint);
}

export async function saveDefect(auditSetting) {
  const auditSettingId = auditSetting._id;
  if (auditSettingId) {
    const body = { ...auditSetting };
    delete body._id;
    return http.put(auditSettingUrl(auditSettingId), body);
  }
  return await http.post(apiEndpoint, auditSetting);
}

export async function deleteAuditSetting(auditSettingId) {
  return await http.delete(auditSettingUrl(auditSettingId));
}
