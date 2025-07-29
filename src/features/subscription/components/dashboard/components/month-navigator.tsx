import { useMonthNavigator } from "../hooks/useMonthNavigator";

interface MonthNavigatorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const MonthNavigator = ({
  selectedDate,
  onDateChange,
}: MonthNavigatorProps) => {
  const { goToPreviousMonth, goToNextMonth, isCurrentMonth, formatDate } =
    useMonthNavigator(selectedDate, onDateChange);

  return (
    <div className="mt-14 flex flex-col gap-6 p-6">
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:cursor-pointer hover:bg-slate-100"
        >
          ←
        </button>

        <div className="text-center text-3xl font-bold text-indigo-600">
          {formatDate(selectedDate)}
        </div>

        {isCurrentMonth() ? (
          <div className="h-8 w-8"></div>
        ) : (
          <button
            type="button"
            onClick={goToNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:cursor-pointer hover:bg-slate-100"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default MonthNavigator;
