import http from "./httpService";

const apiEndpoint = "/defects";

function defectUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getDefect(defectId) {
  return await http.get(defectUrl(defectId));
}

export async function getDefects() {
  return await http.get(apiEndpoint);
}

export async function saveDefect(defect) {
  const defectId = defect._id;
  if (defectId) {
    const body = { ...defect };
    delete body._id;
    return http.put(defectUrl(defectId), body);
  }
  return await http.post(apiEndpoint, defect);
}

export async function deleteDefect(defectId) {
  return await http.delete(defectUrl(defectId));
}
