const links = [
  {
    label: "📘 رابط الكتاب الأصلي",
    href: "https://alfurat.com/books/31171",
    external: true,
  },
  {
    label: "💻 GitHub",
    href: "https://github.com/HassanMSh/aggressions-lebanon",
    external: true,
  },
  {
    label: "🛠️ تواصل معي",
    href: "mailto:hassan.m.shamseddine@gmail.com",
    external: false,
  },
];

function FooterLink({ link }) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="text-indigo-600 hover:underline flex items-center gap-1"
    >
      {link.label}
    </a>
  );
}

export default function Footer() {
  return (
    <div className="bg-white border-t border-gray-300 py-4 px-6 text-sm text-gray-700">
      {/* DESKTOP */}
      <div className="hidden md:flex w-full">
        {/* COLUMN 1 — Links */}
        <div className="flex flex-col items-start gap-2 w-1/3 justify-center">
          {links.map((link) => (
            <FooterLink key={link.href} link={link} />
          ))}
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
        {links.map((link) => (
          <FooterLink key={link.href} link={link} />
        ))}

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
