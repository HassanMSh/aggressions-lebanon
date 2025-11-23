import RequestFix from "./RequestFix";

export default function EventCard({ event, showToast }) {
  const copyText = () => {
    navigator.clipboard.writeText(`${event.date} - ${event.text}`);
    showToast("📋 تم النسخ");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* DATE */}
      <p className="font-bold text-gray-900 text-lg">{event.date}</p>

      {/* TEXT */}
      <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
        {event.text}
      </p>

      {/* ACTIONS */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={copyText}
          className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium"
        >
          📋 نسخ
        </button>

        <RequestFix event={event} />
      </div>
    </div>
  );
}
