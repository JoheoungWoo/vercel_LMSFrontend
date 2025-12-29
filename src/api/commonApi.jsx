import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

// type정의
// 오타 방지 및 일관성에 도움이 됩니다.
export const typeEnum = {
  default: "default",
  read: "read",
  oneRead: "oneRead",
  search: "search",
  write: "write",
  delete: "delete",
  update: "update",
  loading: "loading",
  modal: "modal",
};

/**
 * @param {string} method - 'get', 'post', 'put', 'delete'
 * @param {string} url - 요청 URL
 * @param {string} userEmail - 인증 헤더용 이메일
 * @param {object} data - 전송할 데이터 (post, put 용)
 */
export const sendAuthRequest = async (method, url, userEmail, data = null) => {
  try {
    const config = {
      method: method,
      url: url,
      headers: {
        "X-User-Email": userEmail,
      },
      data: data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    // 공통 에러 처리 로직
    console.error(`[API Error] ${url}:`, error);

    // 데이터가 있었을 경우 로깅 (디버깅용)
    if (data) {
      console.log("실제 전송 시도 데이터:", JSON.stringify(data, null, 2));
    }

    // 백엔드 응답 에러 로깅
    if (error.response?.data) {
      console.error(
        "백엔드 오류 상세:",
        JSON.stringify(error.response.data, null, 2)
      );
    }

    throw error;
  }
};

//api내부에 주석 처리된 콘솔로그 진행중 오류 발생하면 주석 해제하고 확인하면 댐다

export const createCrudApi = (tableName) => {
  const BASE_URL = `${API_SERVER_HOST}/api/${tableName}`;

  return {
    readAll: (userEmail) => {
      // console.log(`${tableName} readAll`);
      return sendAuthRequest("get", `${BASE_URL}/all`, userEmail);
    },

    readOne: (id, userEmail) => {
      // console.log(`${tableName} readOne`);
      return sendAuthRequest("get", `${BASE_URL}/one/${id}`, userEmail);
    },

    writeOne: (dto, userEmail) => {
      // console.log(`${tableName} writeOne`, dto, userEmail);
      return sendAuthRequest("post", `${BASE_URL}/create`, userEmail, dto);
    },

    updateOne: (dto, userEmail) => {
      // console.log(`${tableName} updateOne`, dto, userEmail);
      return sendAuthRequest("put", `${BASE_URL}/update`, userEmail, dto);
    },

    deleteOne: (id, userEmail) => {
      // console.log(`${tableName} deleteOne`, id, userEmail);
      return sendAuthRequest("delete", `${BASE_URL}/delete/${id}`, userEmail);
    },
  };
};

const createExtraApi = (tableName) => ({
  //범용 키워드 검색(이메일 등) (T-3 내 시간표 조회 등에 사용)
  findByKeyword: async (selectKeyword, searchText) => {
    console.log(`${tableName} keyword`);
    // API_SERVER_HOST =>
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/${selectKeyword}/${searchText}`)
      .then((r) => r.data);
  },
  //특정 offeringId 로 목록 조회하는 경우의 api 사용처(T-2)
  findListByOffering: async (offeringId) => {
    console.log(`${tableName} list by offeringId: ${offeringId}`);
    return axios
      .get(`${API_SERVER_HOST}/api/${tableName}/list/offering/${offeringId}`)
      .then((r) => r.data);
  },

  findMySections: async (userEmail) => {
    return axios
      .get(`${API_SERVER_HOST}/api/class-section/my`, {
        headers: { "X-User-Email": userEmail },
      })
      .then((r) => r.data);
  },
});

// 함수 정의
// export const excludeColumns = (columns, excludeArray) => {
//   return Object.keys(columns)
//     .filter(key => !excludeArray.includes(key))
//     .reduce((acc, key) => {
//       acc[key] = columns[key];
//       return acc
//     }, {});
// }

export const makeDefaultButtonDataList = (overrides = {}) => [
  {
    label: "모두읽기",
    action: null,
    enumType: typeEnum.read,
    style: "bg-red-300 hover:bg-red-700",
    ...overrides.readAll,
  },
  {
    label: "데이터추가",
    action: null,
    enumType: typeEnum.write,
    style: "bg-green-500 hover:bg-green-600",
    ...overrides.writeOne,
  },
  {
    label: "검색",
    action: null, // 기본은 빈 함수; 각 API에서 교체 가능
    enumType: typeEnum.search,
    style: "bg-blue-500 hover:bg-blue-600",
    ...overrides.search,
  },
];

export const createTableConfig = (tabelDef, extraButtons = []) => {
  const {
    key,
    primaryKey,
    tableEng,
    tableName,
    allColumns,
    excludeList,
    color,
    readOnlyList,
    fileList,
  } = tabelDef;

  const funcs = {
    ...createCrudApi(key),
    ...createExtraApi(key),
  };

  return {
    key,
    primaryKey,
    tableInfo: { tableEng, tableName },
    allColumns,
    // excludeList,
    funcs,
    // formData: excludeColumns(columns, excludeList),
    type: typeEnum.read,
    color,
    buttonDataList: makeDefaultButtonDataList({
      readAll: { action: funcs.readAll },
    }),
    extrahButtonDataList: extraButtons,
    readOnlyList,
    fileList,
  };
};
