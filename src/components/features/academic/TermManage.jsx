import React, { useEffect, useState } from "react";
import TermApi from "../../../api/TermApi";

const TermManage = () => {
  const [terms, setTerms] = useState([]);
  const [form, setForm] = useState({
    year: "",
    semester: "",
    registrationStart: "",
    registrationEnd: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAdd = () => {
    if (!form.year || !form.semester) return;

    addTerm(form);

    reloadTerm();

    setForm({
      year: "",
      semester: "",
      registrationStart: "",
      registrationEnd: "",
    });
  };

  const addTerm = (term) => {
    console.log("입력 : ", term);
    TermApi.config.funcs.writeOne(term).then((result) => {
      alert("데이터를 추가했습니다.", result, JSON.stringify(result.data));
      reloadTerm();
    });
  };

  const reloadTerm = () => {
    console.log("갱신");
    TermApi.config.funcs.readAll().then((result) => {
      console.log(result);
      setTerms(result);
    });
  };

  useEffect(() => {
    reloadTerm();
  }, []);

  // 수정할 예정
  //   const handleAdd = () => {
  //   if (!form.year || !form.semester) return;

  //   TermApi.config.funcs.writeOne(form)
  //     .then((res) => {
  //       if (res?.success) {
  //         alert("학기가 등록되었습니다.");
  //         reloadTerm();
  //         resetForm();
  //       } else {
  //         alert(res?.message || "데이터가 이상합니다.");
  //       }
  //     })
  //     .catch(() => {
  //       alert("서버 오류가 발생했습니다.");
  //     });
  // };

  return (
    <div className="space-y-6">
      {/* 입력 영역 */}
      <div className="rounded-xl border p-4 space-y-3">
        <h4 className="font-semibold">학기 생성</h4>

        <div className="flex gap-2">
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="연도 (예: 2025)"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="semester"
            value={form.semester}
            onChange={handleChange}
            placeholder="학기 (예: 1학기)"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="date"
            name="registrationStart"
            value={form.registrationStart}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
          <input
            type="date"
            name="registrationEnd"
            value={form.registrationEnd}
            onChange={handleChange}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <button
          onClick={handleAdd}
          className="rounded bg-slate-800 px-4 py-2 text-white text-sm"
        >
          추가
        </button>
      </div>

      {/* 목록 영역 */}
      <div className="rounded-xl border p-4">
        <h4 className="mb-2 font-semibold">학기 목록</h4>

        {terms.length === 0 ? (
          <p className="text-sm text-slate-400">등록된 학기가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {terms.map((t) => (
              <li
                key={t.id}
                className="flex justify-between rounded bg-slate-50 px-3 py-2 text-sm"
              >
                <span>
                  {t.year}년 {t.semester}
                </span>
                <span className="text-xs text-slate-500">
                  {t.registrationStart} ~ {t.registrationEnd}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TermManage;
