export default function Footer() {
  return (
    <div className="bg-white border-t border-gray-300 py-4 px-6 text-sm text-gray-700">
      {/* DESKTOP */}
      <div className="hidden md:flex w-full">
        {/* COLUMN 1 — Links */}
        <div className="flex flex-col items-start gap-2 w-1/3 justify-center">
          <a
            href="https://alfurat.com/books/31171"
            target="_blank"
            className="text-indigo-600 hover:underline flex items-center gap-1"
          >
            📘 رابط الكتاب الأصلي
          </a>

          <a
            href=""
            target="_blank"
            className="text-indigo-600 hover:underline flex items-center gap-1"
          >
            💻 GitHub
          </a>

          <a
            href="mailto:hassan.m.shamseddine@gmail.com"
            className="text-indigo-600 hover:underline flex items-center gap-1"
          >
            🛠️ تواصل معي
          </a>
        </div>

        {/* SEPARATOR */}
        <div className="w-px bg-gray-300 mx-6" />

        {/* COLUMN 2 */}
        <div className="w-1/3 flex items-center justify-center text-center">
          <p>جميع الحقوق محفوظة لأصحاب الكتاب الأصليين.</p>
        </div>

        {/* SEPARATOR */}
        <div className="w-px bg-gray-300 mx-6" />

        {/* COLUMN 3 */}
        <div className="w-1/3 flex items-center justify-center text-right leading-relaxed">
          <p>
            هذا مشروع مفتوح المصدر يهدف إلى رقمنة وتسهيل الوصول إلى المعلومات
            الواردة في كتاب{" "}
            <span className="font-semibold text-indigo-700">
              “لبنان 1949–1985: الاعتداءات الإسرائيلية”
            </span>
            .
          </p>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col items-center text-center gap-3 pt-3 border-t border-gray-200">
        <a
          href="https://alfurat.com/books/31171"
          target="_blank"
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          📘 رابط الكتاب الأصلي
        </a>

        <a
          href="https://github.com/HassanMSh/aggressions-lebanon"
          target="_blank"
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          💻 GitHub
        </a>

        <a
          href="mailto:hassan.m.shamseddine@gmail.com"
          className="text-indigo-600 hover:underline flex items-center gap-1"
        >
          🛠️ تواصل معي
        </a>

        <p className="text-gray-600 text-xs leading-relaxed mt-2 max-w-sm">
          هذا مشروع مفتوح المصدر يهدف إلى رقمنة وتسهيل الوصول إلى المعلومات
          الواردة في كتاب{" "}
          <span className="font-semibold text-indigo-700">
            “لبنان 1949–1985: الاعتداءات الإسرائيلية”
          </span>
          . جميع الحقوق محفوظة لأصحاب الكتاب الأصليين.
        </p>
      </div>
    </div>
  );
}
