import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useAvailableYears,
  useYearlySubscriptionData,
} from "@/hooks/subscription";

function ChartPage() {
  const availableYears = useAvailableYears();
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || new Date().getFullYear(),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const yearlyData = useYearlySubscriptionData(selectedYear);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsDropdownOpen(false);
  };

  if (availableYears.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">구독 데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">구독 통계</h2>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm transition-colors hover:bg-slate-50"
          >
            <span className="font-medium text-slate-700">{selectedYear}년</span>
            <svg
              className={`h-4 w-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div className="absolute right-0 z-20 mt-2 w-32 rounded-lg border border-slate-200 bg-white shadow-lg">
                <div className="py-1">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      className={`w-full px-4 py-2 text-left transition-colors hover:bg-slate-50 ${
                        year === selectedYear
                          ? "bg-blue-50 font-medium text-blue-700"
                          : "text-slate-700"
                      }`}
                    >
                      {year}년
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <section>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">
            {selectedYear}년 월별 구독 비용 추이
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => `${value.toLocaleString()}원`}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "cost") {
                    return [`${value.toLocaleString()}원`, "총 비용"];
                  }
                  return [value, name];
                }}
                labelFormatter={(label: string, payload: any) => {
                  if (payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return (
                      <div>
                        <div className="font-medium">{label}</div>
                        <div className="text-md mt-1">
                          구독 개수: {data.activeCount}개
                        </div>
                      </div>
                    );
                  }
                  return label;
                }}
                labelStyle={{ color: "#333" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default ChartPage;
