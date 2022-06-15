
import http from "./httpService";

const apiEndpoint = "/machines";

function machineUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMachine(defectId) {
  return await http.get(machineUrl(defectId));
}

export async function getMachines() {
  return await http.get(apiEndpoint);
}

export async function saveMachine(machine) {
  const machineId = machine._id;
  if (machineId) {
    const body = { ...machine };
    delete body._id;
    return http.put(machineUrl(machineId), body);
  }
  return await http.post(apiEndpoint, machine);
}

export async function deleteMachine(machineId) {
  return await http.delete(machineUrl(machineId));
}
