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
    //전체조회
    readAll: (userEmail) => {
      // console.log(`${tableName} readAll`);
      return sendAuthRequest("get", `${BASE_URL}/all`, userEmail);
    },
    //단건조회
    readOne: (id, userEmail) => {
      // console.log(`${tableName} readOne`);
      return sendAuthRequest("get", `${BASE_URL}/one/${id}`, userEmail);
    },
    //작성
    writeOne: (dto, userEmail) => {
      // console.log(`${tableName} writeOne`, dto, userEmail);
      return sendAuthRequest("post", `${BASE_URL}/create`, userEmail, dto);
    },
    //수정
    updateOne: (dto, userEmail) => {
      // console.log(`${tableName} updateOne`, dto, userEmail);
      return sendAuthRequest("put", `${BASE_URL}/update`, userEmail, dto);
    },
    //삭제
    deleteOne: (id, userEmail) => {
      // console.log(`${tableName} deleteOne`, id, userEmail);
      return sendAuthRequest("delete", `${BASE_URL}/delete/${id}`, userEmail);
    },
  };
};

export const createExtraApi = (tableName) => {
  return {
    //범용 키워드 검색(이메일 등) (T-3 내 시간표 조회 등에 사용)
    findByKeyword: async (selectKeyword, searchText) => {
      console.log(`${tableName} keyword`);
      // API_SERVER_HOST =>
      return axios
        .get(
          `${API_SERVER_HOST}/api/${tableName}/${selectKeyword}/${searchText}`
        )
        .then((r) => r.data);
    },
    //범용 키워드 검색(이메일 등) (T-3 내 시간표 조회 등에 사용)
    findByKeywordHttp: async (
      selectKeyword, // 함수 이름
      searchText,
      userEmail,
      method = "get",
      data = null
    ) => {
      // searchText가 null이면 URL에서 제외
      const url = searchText
        ? `${API_SERVER_HOST}/api/${tableName}/${selectKeyword}/${searchText}`
        : `${API_SERVER_HOST}/api/${tableName}/${selectKeyword}`;

      return sendAuthRequest(method, url, userEmail, data);
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

    // -------------------------------------------------------------------------
    // [추가] 성적/출결/강의 관리를 위한 공통 함수 4종 세트 (기존 코드 하단에 추가됨)
    // -------------------------------------------------------------------------

    // ① 내 데이터 조회 (Header 방식: 교수 강의 목록, 내 수강신청 내역 등)
    // URL: /api/{tableName}/my
    findMy: async (userEmail) => {
      console.log(`[${tableName}] 내 목록 조회 요청: ${userEmail}`);
      return axios
        .get(`${API_SERVER_HOST}/api/${tableName}/my`, {
          headers: { "X-User-Email": userEmail },
        })
        .then((r) => r.data);
    },

    // ② 특정 강의(Offering) 하위 데이터 조회 (성적, 출결, 과제 등)
    // URL: /api/{tableName}/offering/{offeringId}
    findByOffering: async (offeringId) => {
      console.log(`[${tableName}] 과목별 조회: ${offeringId}`);
      return axios
        .get(`${API_SERVER_HOST}/api/${tableName}/offering/${offeringId}`)
        .then((r) => r.data);
    },

    // ③ 내 데이터 조회 (URL 파라미터 방식: 학생 성적 조회 등)
    // URL: /api/{tableName}/my/{email}
    findMyByEmail: async (email) => {
      console.log(`[${tableName}] 개인별 조회: ${email}`);
      return axios
        .get(`${API_SERVER_HOST}/api/${tableName}/my/${email}`, {
          headers: { "X-User-Email": email }, // 🔥 [추가됨] 이제 이메일 명찰을 달고 갑니다!
        })
        .then((r) => r.data);
    },

    // ④ 커스텀 저장/수정 (POST /save)
    // URL: /api/{tableName}/save
    saveCustom: async (dto, userEmail) => {
      console.log(`[${tableName}] 커스텀 저장:`, dto);
      return axios
        .post(`${API_SERVER_HOST}/api/${tableName}/save`, dto, {
          headers: { "X-User-Email": userEmail },
        })
        .then((r) => r.data);
    },
  };
};

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

  var funcs = {
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
