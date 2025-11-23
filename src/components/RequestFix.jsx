export default function RequestFix({ event }) {
  const subject = encodeURIComponent(`طلب تعديل حدث #${event.id}`);
  const body = encodeURIComponent(
    `مرحبا،\n\nأرغب بطلب تعديل/تصحيح للحدث التالي:\n\n` +
      `ID: ${event.id}\n` +
      `Date: ${event.date}\n\n` +
      `Text:\n${event.text}\n\n` +
      `التعديل المقترح:\n`
  );

  const mailto = `mailto:hassan.m.shamseddine@gmail.com?subject=${subject}&body=${body}`;

  return (
    <a
      className="text-sm text-red-600 hover:underline mt-3 inline-block"
      href={mailto}
    >
      ✏️ طلب تعديل
    </a>
  );
}
