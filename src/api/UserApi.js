import axios from "axios";
import { API_SERVER_HOST, sendAuthRequest, typeEnum } from "./commonApi";
import { createTableConfig, excludeColumns } from "./commonApi";
import DepartmentApi from "./DepartmentApi";
import { tableDefinitions } from "./tablesConfig";

const host = `${API_SERVER_HOST}/api/user`;
const tableName = "user";

export const doLogin = async (a) => {
  console.log("login post를 받았다", a);
  const header = { headers: { "Content-Type": "application/json" } };
  // const form = new FormData();
  const { email, password } = a;
  // form.append("email", loginParam.email);
  // form.append("password", loginParam.pw);
  const res = await axios.post(`${host}/login`, { email, password }, header);
  return res.data;
};

export const doRegister = async (a) => {
  console.log("1)여기는 등록이야 : ", a);
  try {
    const res = await axios.post(`${host}/register`, a, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("register error:", err);
    throw err;
  }
};

const findByKeyword = async () => {
  console.log("User findByKeyword");
};

const extraButtons = [];

var tableDefinition = tableDefinitions[tableName];
tableDefinition = {
  ...tableDefinition,
  allColumns: {
    ...tableDefinition.allColumns,
    searchColumns: {
      one: tableDefinition.allColumns.responseColumns,
      role: tableDefinition.allColumns.responseColumns,
    },
  },
};
const config = createTableConfig(tableDefinition, extraButtons);

const changePassword = (password, userEmail) => {
  return sendAuthRequest(
    "post",
    `${API_SERVER_HOST}/api/${tableName}/change`,
    userEmail,
    { email: userEmail, password: password }
  );
};

export default { config, changePassword };
