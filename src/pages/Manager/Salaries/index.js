import React from "react";
import { useState } from "react";
import ManagerSalaries from "./Manager";
import StaffSalaries from "./Staff";

export default function Salaries({ label }) {
  const [currentRole, setCurrentRole] = useState("manager");
  return (
    <div>
      <div className="grid grid-cols-9 gap-3 p-4">
        <button
          onClick={() => setCurrentRole("manager")}
          className={`text-white px-3 py-2 ${
            currentRole === "manager" ? "bg-blue-600" : "bg-blue-900"
          }`}
        >
          Manager
        </button>
        <button
          onClick={() => setCurrentRole("staff")}
          className={`text-white px-3 py-2 ${
            currentRole === "staff" ? "bg-blue-600" : "bg-blue-900"
          }`}
        >
          Staff
        </button>
      </div>

      <div>
        {currentRole === "manager" ? <ManagerSalaries /> : <StaffSalaries />}
      </div>
    </div>
  );
}
