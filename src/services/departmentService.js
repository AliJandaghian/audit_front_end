import http from "./httpService";

const apiEndpoint = "/departments";

function departmentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getDepartment(departmentId) {
  return await http.get(departmentUrl(departmentId));
}

export async function getDepartments() {
  return await http.get(apiEndpoint);
}

export async function saveDepartment(department) {
  const departmentId = department._id;
  if (departmentId) {
    const body = { ...department };
    delete body._id;
    return http.put(departmentUrl(departmentId), body);
  }
  return await http.post(apiEndpoint, department);
}

export async function deleteDepartment(departmentId) {
  return await http.delete(departmentUrl(departmentId));
}
