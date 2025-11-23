import React, { useState } from "react";

export default function SearchBar({ onSearch, years, onClose }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [exactDate, setExactDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ fromDate, toDate, keyword, year, month, exactDate });

    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const months = [
    { value: "01", label: "يناير" },
    { value: "02", label: "فبراير" },
    { value: "03", label: "مارس" },
    { value: "04", label: "أبريل" },
    { value: "05", label: "مايو" },
    { value: "06", label: "يونيو" },
    { value: "07", label: "يوليو" },
    { value: "08", label: "أغسطس" },
    { value: "09", label: "سبتمبر" },
    { value: "10", label: "أكتوبر" },
    { value: "11", label: "نوفمبر" },
    { value: "12", label: "ديسمبر" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-6"
    >
      <div className="relative pb-3">
        <h2 className="text-lg font-bold text-center">البحث</h2>

        {/* Underline */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-indigo-600 rounded-t-full"></div>
      </div>
      {/* Keyword */}
      <div>
        <label className="block text-sm font-medium mb-1">
          الكلمة المفتاحية
        </label>
        <input
          type="text"
          placeholder="مثل: يارون، جيش، اعتداء..."
          className="w-full border rounded-lg p-2.5 focus:ring focus:ring-indigo-300"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">نطاق التاريخ</p>

        <div>
          <label className="block text-sm mb-1">من تاريخ</label>
          <input
            type="date"
            min="1949-01-01"
            max="1985-12-31"
            className="w-full border rounded-lg p-2.5"
            value={fromDate ? fromDate.replaceAll("/", "-") : ""}
            onChange={(e) => setFromDate(e.target.value.replaceAll("-", "/"))}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">إلى تاريخ</label>
          <input
            type="date"
            min="1949-01-01"
            max="1985-12-31"
            className="w-full border rounded-lg p-2.5"
            value={toDate ? toDate.replaceAll("/", "-") : ""}
            onChange={(e) => setToDate(e.target.value.replaceAll("-", "/"))}
          />
        </div>
      </div>

      {/* Year + Month */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">
          تصفية حسب السنة والشهر
        </p>

        {/* Year */}
        <div className="relative">
          <label className="block text-sm mb-1">السنة</label>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-right appearance-none pr-10"
          >
            <option value="">كل السنوات</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            ▼
          </span>
        </div>

        {/* Month */}
        <div className="relative">
          <label className="block text-sm mb-1">الشهر</label>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full border rounded-lg p-2.5 text-right appearance-none pr-10"
          >
            <option value="">كل الشهور</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      {/* Exact Date */}
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-700">تاريخ محدد</p>

        <input
          type="date"
          min="1949-01-01"
          max="1985-12-31"
          className="w-full border rounded-lg p-2.5"
          value={exactDate ? exactDate.replaceAll("/", "-") : ""}
          onChange={(e) =>
            setExactDate(
              e.target.value ? e.target.value.replaceAll("-", "/") : ""
            )
          }
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-indigo-600 text-white w-full py-2.5 rounded-lg hover:bg-indigo-700 font-semibold text-sm"
      >
        بحث
      </button>
    </form>
  );
}
