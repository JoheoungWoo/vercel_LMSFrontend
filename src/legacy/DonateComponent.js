import React from "react";

const DonateComponent = () => {
  return (
    <div>
      DonateComponent
      <div
        style={{ border: "1px solid #ccc", padding: "16px", width: "260px" }}
      >
        <div style={{ marginBottom: "8px", fontWeight: "600" }}>후원하기</div>

        <div style={{ marginBottom: "6px" }}>
          <div>이름</div>
          <input type="text" style={{ width: "100%" }} />
        </div>

        <div style={{ marginBottom: "6px" }}>
          <div>금액</div>
          <input type="number" style={{ width: "100%" }} placeholder="₩" />
        </div>

        <div style={{ marginBottom: "6px" }}>
          <div>메시지 (선택)</div>
          <input type="text" style={{ width: "100%" }} />
        </div>

        <button style={{ width: "100%", marginTop: "10px" }}>후원하기</button>
      </div>
    </div>
  );
};

export default DonateComponent;
