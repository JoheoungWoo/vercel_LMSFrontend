import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import { typeEnum } from "../api/commonApi";
import AdminSelectedContext from "../components/admin/AdminSelectContext";
import { createButton } from "../util/button";

const AdminLayout = ({ config }) => {
  // 데이터 가져오기
  const { key, tableInfo, columns, funcs, formData, type, buttonDataList, extrahButtonDataList, color } = config;
  const { findByKeyword, readAll, readOne, writeOne, deleteOne, updateOne } = funcs;

  // 리덕스
  const { selectedIds, setSelectId } = useContext(AdminSelectedContext);

  const selectId = selectedIds[key]; // 현재 테이블 선택 ID

  const changeSelectId = (id) => {
    setSelectId(key, id); // Context에 전달
  };


  // useState 사용
  const [readData, setReadData] = useState([]);
  const [findReadOne, setFindReadOne] = useState({});
  const [form, setForm] = useState(formData);
  const [isLoading, setLoading] = useState(false);

  const [findData, setFindData] = useState([]);
  const [findColumns, setFindColumns] = useState({});

  const [selectData, setSelectData] = useState({});
  const [selectIndex, setSelectIndex] = useState(0);

  // 갱신용 useState
  const [layoutEnum, setLayoutEnum] = useState(typeEnum.default);
  const [newCurrentLayoutEnum, setNewCurrentLayoutEnum] = useState(null);


  const [selectedColumn, setSelectedColumn] = useState([]);
  const [formColumn, setFormColumn] = useState([]);
  const [targetColumn, setTargetColumn] = useState(null);

  const [buttonList, setButtonList] = useState(buttonDataList);
  const [extrahButtonList, setExtrahButtonList] = useState(extrahButtonDataList);

  // 출력될 버튼 모음
  const [isOpen, setOpen] = useState(false);
  const [isModalOepn, setModalOpen] = useState(false);

  const getTableId = {
    "Attendance": "attendanceId",
    "Board": "boardId",
    "Comment": "commentId",
    "Course": "courseId",
    "CourseOffering": "offeringId",
    "Grade": "gradeId",
    "Notice": "noticeId",
    "Post": "postId",
    "Review": "reviewId",
    "TimeTable": "timetableId",
    "User": "userId",
  }

  const getList = (result) => {
    try {
      const data = result;
      console.log(data);
      setReadData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeEnum = (prev, newEnum) => {
    if (prev === newEnum) return;

    setLayoutEnum(newEnum);
  }

  // 핸들러
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  const onSubmit = (e, action) => {
    e.preventDefault();

    const relatedColumns = extrahButtonList.map(data => data.columns);
    const formData = new FormData(e.target);

    for (const columns of relatedColumns) {
      for (const column of Object.keys(columns)) {
        const searchObject = formData.get(column);

        if (!searchObject || searchObject.trim() === "") {
          alert(`'${column}' 값이 비었습니다. 입력해주세요.`);
          return;
        }
      }
    }

    setLoading(true);
    action(form)
      .then((result) => {
        console.log("입력값 : ", form);
        console.log("결과값 : ", result);
      })
      .catch(err => console.log("에러발생 : ", err))
      .finally(() => {
        setLoading(false);
      })
  }

  const onSearch = (e) => {
    e.preventDefault();

    // form에서 데이터 추출
    const formData = new FormData(e.target);
    const selectKeyword = formData.get('selectKeyword');
    const searchText = formData.get('searchText'); // 추가된 name으로 값 추출

    console.log("선택된 컬럼:", selectKeyword);
    console.log("입력된 검색어:", searchText);

    setLoading(true);
    findByKeyword(selectKeyword, searchText)
      .then((result) => {
        console.log("결과값 : ", result);
        setReadData(result);
      })
      .catch(err => console.log("에러발생 : ", err))
      .finally(() => {
        setLoading(false);
      })
  }

  const selectCheckbox = (id) => {
    setSelectData(findData[id]);

  }

  useEffect(() => {
    if (typeof columns === "object") {
      var columnKey = Object.keys(columns);
      if (columnKey.length > 0) {
        setSelectedColumn(columnKey);
      }
    }

    if (typeof formData === "object") {
      var formColumnKey = Object.keys(formData);
      if (formColumnKey.length > 0) {
        setFormColumn(formColumnKey);
      }
    }

    // 버튼 생성
    if (buttonDataList && buttonDataList.length > 0) {
      if (buttonDataList && buttonDataList.length > 0) {
        setButtonList(buttonDataList);
      }
    }

    // 모달에서 쓰이는 버튼 생성
    if (extrahButtonDataList && extrahButtonDataList.length > 0) {
      if (extrahButtonDataList && extrahButtonDataList.length > 0) {
        setExtrahButtonList(extrahButtonDataList);
      }
    }
  }, []);

  useEffect(() => {
    // console.log(form, "변화");
  }, [form])

  useEffect(() => {
    if (!selectData || Object.keys(selectData).length === 0) return;

    console.log(selectData);
    setForm(prev => ({ ...prev, [targetColumn]: selectData }));
  }, [selectData])

  useEffect(() => {
    changeEnum(layoutEnum, newCurrentLayoutEnum)
  }, [newCurrentLayoutEnum])

  useEffect(() => {
    // 실행 조건
    if (!selectId) return;
    if (layoutEnum !== typeEnum.readOne) return;

    // 데이터가 리스트 형태여서 0번을 가져오기로함. 수정이 필요함
    setLoading(true);
    readOne(selectId)
      .then((item) => {
        if (item && item.length > 0) {
          setFindReadOne(item[0]);
          setForm(item[0]);
        } else {
          setFindReadOne(item);
          setForm(item);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [layoutEnum, selectId]);

  return (
    <div className={`container mx-auto mt-8 px-4 ${color} py-10`}>
      {tableInfo && <>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {tableInfo.tableName}
        </h2>
      </>}

      {/* isOpen가 true혹은 false일 경우 구분 */}
      {isOpen ?
        <>
          {/* 테이블 비활성화 버튼 */}
          <div className="w-full flex justify-center">
            {createButton({
              label: "테이블 닫기",
              style: "bg-green-300 hover:bg-green-700",
              size: "90%",
              onClick: () => {
                setOpen(false);
              }
            })}
          </div>
          {/* 테이블에 쓰이는 버튼 버튼 */}
          <div className="flex flex-wrap mb-6">
            {buttonList.map((btnData, index) => (
              <div key={index} className={`flex justify-center flex-1 basis-1/${buttonList.length}`}>
                {/* Component, index, arr */}
                {createButton({
                  label: btnData.label,
                  style: btnData.style,
                  onClick: () => {
                    setNewCurrentLayoutEnum(btnData.enumType);
                    if (btnData.action) {
                      btnData.action().then(result => {
                        if (btnData.enumType === typeEnum.read) {
                          getList(result);
                        }
                      })
                    }
                  }
                })}
              </div>
            ))}
          </div>
          {/* 테이블 열린 상태 */}
          <div>
            {/* enum값이 read 경우, findAll모드 */}
            {layoutEnum === typeEnum.read && (
              <div>
                {<>
                  <h3
                    className="text-3xl font-bold mb-4 p-4 bg-blue-100 rounded-md shadow-md">
                    {tableInfo.tableName}:{tableInfo.tableEng}</h3>

                  {/* 컬럼 헤더 */}
                  <div className="flex font-semibold border-b pb-1 mb-2">
                    {selectedColumn && selectedColumn.map((key) => (
                      <div key={key} className="flex-1">{key}:{columns[key]}</div>
                    ))}
                  </div>

                  {/* 데이터 목록 */}
                  {typeof readData === "object" && readData.map((data, index) => {
                    var keys = Object.keys(columns);
                    var mainKey = getTableId[tableInfo.tableName];
                    return (<div key={index} className="flex border-b py-1">
                      {keys.map((key) => (
                        <div key={key} className="flex-1"
                        >{data[key]}{
                          }</div>
                      ))}
                      {createButton({
                        label: "한건조회",
                        style: "bg-red-300 hover:bg-red-700",
                        size: "10%",
                        onClick: () => {
                          setNewCurrentLayoutEnum(typeEnum.readOne);
                          changeSelectId(data[mainKey]);
                        }
                      })}</div>)
                  }
                  )}</>}
              </div>
            )}

            {/* enum값이 write 경우, 추가모드 */}
            {layoutEnum === typeEnum.write && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Write 모드</h1>
                {
                  createButton({
                    label: "write 리셋",
                    style: "bg-yellow-400 hover:bg-yellow-500",
                    size: "20%",
                    onClick: () => {
                      setSelectData({});
                      setForm(formData);
                    }
                  })
                }

                {selectedColumn && (
                  <form onSubmit={e => onSubmit(e, writeOne)}
                    className="space-y-4">
                    {formColumn.map((column, index) => {
                      const relatedButtons = extrahButtonList.filter(item => item.tableName === column);

                      return (<div key={index} className="space-y-1">
                        {relatedButtons.length > 0 ?
                          <>
                            {relatedButtons.map(item =>
                              <div>
                                <>
                                  <div className="flex items-center gap-2 mb-1">
                                    <label className="font-medium text-gray-700 block">
                                      {column}
                                    </label>
                                    <button
                                      type="button"
                                      className="p-2 bg-green-300 rounded hover:bg-green-700 text-white flex-1"
                                      onClick={() => {
                                        setModalOpen(true);
                                        setTargetColumn(column); // 어떤 컬럼에 넣을지 저장
                                      }}
                                    >
                                      필요한 데이터 불러오기
                                    </button>
                                  </div>

                                  {/* 선택한 데이터 확인 */}
                                  <div className="container mx-auto mt-8 px-4 py-10 bg-purple-300 rounded-lg shadow-md">
                                    <div className="space-y-6">
                                      {
                                        Object.keys(item.columns).filter(key => key != item.tableName)
                                          .map(key => (
                                            <div key={key} className="bg-white rounded-md shadow p-4">
                                              <label className="block text-sm font-semibold text-gray-700 mb-2">{key}</label>
                                              <input
                                                type="text"
                                                name={key}
                                                value={form[item.tableName][key] ?? ""}
                                                onChange={changeHandler}
                                                readOnly
                                                className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                              />
                                            </div>
                                          ))
                                      }
                                    </div>
                                  </div>
                                </>
                              </div>
                            )}
                          </>
                          :
                          <>
                            <label className="font-medium text-gray-700 block">
                              {column}
                            </label>
                            {/* {typeof extrahButtonList === "object" && JSON.stringify(extrahButtonList)} */}
                            <input
                              type="text"
                              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                              name={column}
                              value={form[column]}
                              onChange={changeHandler}
                              required
                            />
                          </>
                        }
                      </div>)
                    }
                    )}

                    <button type="submit"
                      className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
                      제출
                    </button>

                  </form>
                )}
              </div>
            )}

            {/* enum값이 readone 경우, 하나 읽기 모드 */}
            {layoutEnum === typeEnum.readOne && (
              <div>
                <h3 className="text-3xl font-bold mb-4 p-4 bg-blue-100 rounded-md shadow-md">{tableInfo.tableName}:{tableInfo.tableEng}</h3>
                {findReadOne &&
                  <div>
                    {/* 컬럼 헤더 */}
                    <div className="flex font-semibold border-b pb-1 mb-2">
                      {/* 타이틀 */}
                      {selectedColumn && selectedColumn.map((key) => (
                        <div key={key} className="flex-1">{key}:{columns[key]}</div>
                      ))
                      }
                    </div>
                    {/* 내용 */}
                    <div className="flex border-b py-1 items-center">
                      {selectedColumn.map(key => (
                        <div key={key} className="flex-1">
                          {findReadOne[key]}
                        </div>
                      ))}

                      <div className="flex gap-2 ms-auto">
                        {createButton({
                          label: "수정하기",
                          enumType: typeEnum.update,
                          style: "bg-yellow-400 hover:bg-yellow-500",
                          onClick: () => {
                            setNewCurrentLayoutEnum(typeEnum.update);
                          }
                        })}
                        {createButton({
                          label: "삭제하기",
                          enumType: typeEnum.delete,
                          style: "bg-red-300 hover:bg-red-700",
                          onClick: () => {
                            setNewCurrentLayoutEnum(typeEnum.delete);
                          }
                        })}
                      </div>
                    </div>
                  </div>
                }
              </div>
            )}

            {/* enum값이 search 경우, search모드 */}
            {layoutEnum === typeEnum.search && (
              <div>
                <h1>search모드</h1>
                {selectedColumn && (
                  <form onSubmit={onSearch}>
                    <h1 className="text-xl font-semibold">
                      {tableInfo.tableName}:{tableInfo.tableEng}
                    </h1>
                    <select name="selectKeyword" className="p-2 border rounded" required>
                      <option value="">선택해주세요</option>
                      {selectedColumn.map(column =>
                      (<option
                        key={column}
                        value={column}>
                        {column}
                      </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="searchText"
                      className="flex-grow p-2 border rounded"
                      required
                    />
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                      제출
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* enum값이 delete 경우, 삭제모드 */}
            {layoutEnum === typeEnum.delete && (
              <div>
                <h3>{tableInfo.tableName} : {tableInfo.tableEng} 삭제 모드</h3>
                <div>
                  {findReadOne ?
                    // 삭제할 데이터가 있을 경우
                    (<>
                      <div className="flex font-semibold border-b pb-1 mb-2">
                        {selectedColumn && selectedColumn.map((key) => (
                          <div key={key} className="flex-1">{key} : {columns[key]}</div>
                        ))}
                      </div>
                      <div className="flex border-b py-1 items-center">
                        {selectedColumn.map(key => (
                          <div key={key} className="flex-1">{findReadOne[key]}</div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        {createButton({
                          label: "진짜삭제",
                          enumType: typeEnum.loading,
                          style: "bg-green-300 hover:bg-green-500",
                          onClick: () => {
                            setNewCurrentLayoutEnum(typeEnum.loading);
                            deleteOne(findReadOne[getTableId[tableInfo.tableName]]);
                          }
                        })}
                      </div>

                    </>) :
                    // 삭제할 데이터가 없을 경우
                    <></>}
                </div>
              </div>
            )}

            {/* enum값이 update 경우, 업데이트모드 */}
            {layoutEnum === typeEnum.update && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Update 모드</h1>
                {selectedColumn && findReadOne ?
                  (<form onSubmit={e => onSubmit(e, updateOne)}
                    className="space-y-4">
                    {selectedColumn.map((column, index) => (
                      <div key={column} className="space-y-1">
                        <label className="font-medium text-gray-700 block">
                          {column}
                        </label>
                        <input
                          type="text"
                          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          name={column}
                          value={form[column] || ""}
                          onChange={changeHandler}
                          readOnly={index === 0}
                        />
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    >
                      제출
                    </button>
                  </form>)
                  :
                  (<>
                    <h1>데이터가 없습니다.</h1>
                  </>)
                }
              </div>
            )}
          </div>

          {/* 모달창 */}
          {isModalOepn && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* 흐린 배경 */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={() => setModalOpen(false)}
              ></div>

              {/* 모달 박스 */}
              <div className="relative bg-white rounded-xl p-6 shadow-xl z-50 w-[90%] max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mt-4">
                  <h2 className="text-xl font-bold text-center flex-1">
                    모달창
                  </h2>
                </div>
                <div>
                  <button
                    className="w-[10%] p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {
                      selectCheckbox(selectId);
                      setModalOpen(false);
                    }}
                  >
                    선택하기
                  </button>
                  <button
                    className="w-[10%] p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setFindData([])}
                  >
                    리셋
                  </button>
                  <button
                    className="w-[10%] p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setModalOpen(false)}
                  >
                    닫기
                  </button>
                </div>

                {/* 버튼 리스트 */}
                <div className="flex flex-wrap gap-2 mb-4 justify-end">

                  {extrahButtonList
                    .filter(btnData => btnData.tableName === targetColumn)
                    .map((btnData, index) => (
                      <div key={index} className="flex-1">
                        {createButton({
                          label: btnData.label,
                          style: btnData.style,
                          onClick: () => {
                            if (btnData.action) {
                              btnData.action().then((result) => {
                                var data = [];
                                result.forEach(d => {
                                  var temp = {};
                                  Object.keys(btnData.columns).forEach(key => {
                                    if (key !== null && d[key] !== null)
                                      temp[key] = d[key];
                                  })
                                  if (Object.keys(temp).length > 0) {
                                    data.push(temp);
                                  }
                                });
                                setFindColumns(btnData.columns);
                                setFindData(data.filter(item => item !== null));
                                console.log(result);
                              });
                            }
                          },
                        })}
                      </div>
                    ))
                  }

                </div>

                {/* 데이터가 있을 경우 */}
                {findData && findData.length > 0 && findColumns && (
                  <div>
                    {/* 테이블 제목 */}
                    <h3 className="text-3xl font-bold mb-4 p-4 bg-blue-100 rounded-md shadow-md">
                      {tableInfo.tableName}:{tableInfo.tableEng}
                    </h3>

                    {/* 컬럼 헤더 */}
                    <div className="flex font-semibold border-b pb-1 mb-2">
                      <div className="flex-none px-2">선택</div>
                      {Object.keys(findColumns).map((key) => (
                        <div key={key} className="flex-1">
                          {key}:{findColumns[key]}
                        </div>
                      ))}
                    </div>

                    {/* 데이터 행 */}
                    {findData.map((data, index) => (
                      <div key={index} className="flex border-b py-1 items-center">
                        <div className="flex-none px-2">
                          <input type="checkbox"
                            onChange={() => changeSelectId(index)}
                          />
                        </div>
                        {Object.keys(findColumns).map((key) => (
                          <div key={key} className="flex-1">
                            {data[key]}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

        </>
        :
        <>
          {/* 테이블 비활성화 버튼 */}
          <div className="w-full flex justify-center">
            {createButton({
              label: "테이블 열기",
              style: "bg-green-300 hover:bg-green-700",
              size: "90%",
              onClick: () => {
                setOpen(true);
                setNewCurrentLayoutEnum(type);
              }
            })}
          </div>
        </>}
    </div >
  );
}
export default AdminLayout;
