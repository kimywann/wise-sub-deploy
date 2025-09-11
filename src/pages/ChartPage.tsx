import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { useEffect } from "react";

import {
  useMonthlyData,
  useGenerateMonthlyData,
} from "@/stores/subscription-store";

function ChartPage() {
  const monthlyData = useMonthlyData();
  const generateMonthlyData = useGenerateMonthlyData();

  useEffect(() => {
    // 컴포넌트 마운트 시에만 데이터 생성
    generateMonthlyData(12);
  }, [generateMonthlyData]);

  if (monthlyData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">차트 데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* 월별 구독 비용 추이 - 라인 차트 */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          최근 1년 월별 구독 비용 추이
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#666"
              tickFormatter={(value) => `${value.toLocaleString()}원`}
            />
            <Tooltip
              formatter={(value: number) => [
                `${value.toLocaleString()}원`,
                "총 비용",
              ]}
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

      {/* 월별 구독 서비스 개수 - 바 차트 */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          최근 1년 월별 구독 서비스 개수
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
            <YAxis tick={{ fontSize: 12 }} stroke="#666" />
            <Tooltip
              formatter={(value: number) => [`${value}개`, "구독 개수"]}
              labelStyle={{ color: "#333" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartPage;
