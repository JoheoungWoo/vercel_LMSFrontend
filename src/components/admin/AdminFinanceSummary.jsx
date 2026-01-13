// src/components/admin/AdminFinanceSummary.jsx
import React from "react";

const AdminFinanceSummary = () => {
  const summary = [
    { label: "미납", value: 3 },
    { label: "납부 완료", value: 12 },
    { label: "총액", value: "₩48,000,000" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💰</span>
        <h2 className="font-bold text-gray-800">등록금 현황</h2>
      </div>

      <div className="space-y-2">
        {summary.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200"
          >
            <span className="text-sm font-medium text-gray-700">{s.label}</span>
            <span className="font-bold text-gray-800">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFinanceSummary;
