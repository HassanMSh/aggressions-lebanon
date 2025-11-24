import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import EventList from "./components/EventList";
import { loadEvents } from "./utils/loadEvents";
import { getPageNumbers } from "./utils/paginationHelper";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

export default function App() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [years, setYears] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [showFooter, setShowFooter] = useState(true);

  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const visibleEvents = filtered.slice(start, end);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  const downloadEventsJson = () => {
    const data = JSON.stringify(events, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "events.json";
    a.click();

    URL.revokeObjectURL(url);
    showToast("📥 تم تنزيل قاعدة البيانات");
  };

  // Load DB
  useEffect(() => {
    loadEvents().then((data) => {
      const valid = data.filter((e) => /^\d{4}\/\d{2}\/\d{2}$/.test(e.date));
      const ys = [...new Set(valid.map((e) => e.date.slice(0, 4)))].sort();
      setYears(ys);
      setEvents(valid);
      setFiltered(valid);
      setLoading(false);
    });
  }, []);

  // Footer hide on scroll (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      const currY = window.scrollY;
      setShowFooter(currY < lastY);
      lastY = currY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search logic
  const handleSearch = ({
    fromDate,
    toDate,
    keyword,
    year,
    month,
    exactDate,
  }) => {
    const key = keyword?.trim().toLowerCase() || "";

    let result = events.filter((e) => {
      const [y, m] = e.date.split("/");

      if (exactDate && e.date !== exactDate) return false;
      if (year && y !== year) return false;
      if (month && m !== month) return false;

      if (fromDate && e.date < fromDate) return false;
      if (toDate && e.date > toDate) return false;

      if (key && !e.text.toLowerCase().includes(key)) return false;

      return true;
    });

    result.sort((a, b) =>
      sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

    setFiltered(result);
    setPage(1);
  };

  // Sort toggle
  const toggleSort = () => {
    const next = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(next);

    setFiltered((prev) =>
      [...prev].sort((a, b) =>
        next === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-[9999]">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-semibold text-lg">
            جاري التحميل...
          </p>
        </div>
      )}
      {/* HEADER */}
      <div
        className={`
        transition-all duration-300 ease-out
        ${open ? "md:mr-80" : "md:mr-[70px]"}
      `}
      >
        <PageHeader />
      </div>

      {/* MOBILE FLOATING SEARCH BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
          md:hidden
          fixed bottom-6 left-1/2 -translate-x-1/2
          bg-indigo-600 text-white
          px-8 py-4 rounded-full shadow-xl
          text-lg font-bold
          hover:bg-indigo-700
          z-50
        "
        >
          🔍 البحث
        </button>
      )}

      <div className="relative flex">
        {/* MAIN CONTENT */}
        <div
          className={`
          flex-1 p-2 md:p-6 pb-32
          transition-all duration-300 ease-out
          ${open ? "md:mr-80" : "md:mr-[70px]"}
        `}
        >
          {/* sorting + download */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={toggleSort}
              className="px-4 py-2 bg-white border rounded shadow hover:bg-gray-100"
            >
              {sortOrder === "asc" ? "🔼 الأقدم أولاً" : "🔽 الأحدث أولاً"}
            </button>

            <button
              onClick={downloadEventsJson}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow text-sm"
            >
              📥 تحميل قاعدة البيانات (JSON)
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            عدد الأحداث: {filtered.length}
          </p>

          <EventList events={visibleEvents} showToast={showToast} />
          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="mt-6 pb-0 md:pb-32">
              <div className="flex justify-center gap-2 flex-wrap">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-white border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  السابق
                </button>
                {getPageNumbers(page, totalPages).map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`dots-${i}`}
                      className="px-3 py-1 text-gray-500 select-none"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${p}-${i}`}
                      onClick={() => setPage(Number(p))}
                      className={`px-3 py-1 border rounded ${
                        page === p
                          ? "bg-indigo-600 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-white border rounded disabled:opacity-50 hover:bg-gray-100"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT BORDER (desktop only) */}
        <div className="hidden md:block fixed top-0 right-0 h-full w-[70px] border-l border-gray-400"></div>

        {/* SIDEBAR OVERLAY (full screen mobile, narrow on desktop) */}
        <div
          className={`
          fixed top-0 right-0 h-full 
          bg-white border-l border-gray-300 shadow-xl
          overflow-y-auto transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
          w-full md:w-80
          z-40
        `}
        >
          <div className="p-4 pb-32 md:pb-24 flex flex-col min-h-screen relative">
            {/* MOBILE CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="
              absolute top-4 right-4
              bg-red-500 text-white w-10 h-10
              flex items-center justify-center
              rounded-full shadow-md
              hover:bg-red-600
              z-50
              md:hidden
            "
            >
              ✖
            </button>

            <SearchBar
              onSearch={handleSearch}
              years={years}
              onClose={() => setOpen(false)}
            />

            {/* MOBILE FOOTER INSIDE SIDEBAR */}
            <div className="block md:hidden mt-10">
              <Footer />
            </div>
          </div>
        </div>

        {/* DESKTOP SIDEBAR TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="
          hidden md:block
          fixed top-4 right-[16px]
          bg-indigo-600 text-white px-4 py-2 rounded-l-lg shadow-lg
          hover:bg-indigo-700 text-sm font-bold
          z-50
        "
        >
          {open ? "✖" : "🔍"}
        </button>
      </div>

      {/* FOOTER — desktop only */}
      <div className="hidden md:block">
        <footer
          className={`
          fixed bottom-0 left-0 right-0 z-20
          transition-all duration-300 ease-out
          ${open ? "mr-80" : "mr-[70px]"}
          ${
            showFooter
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
        >
          <Footer />
        </footer>
      </div>

      <Toast message={toast} />
    </div>
  );
}
