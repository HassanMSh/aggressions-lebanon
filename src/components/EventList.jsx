import EventCard from "./EventCard";

export default function EventList({ events, showToast }) {
  return (
    <div className="grid gap-4">
      {events.map((e) => (
        <EventCard key={e.id} event={e} showToast={showToast} />
      ))}
    </div>
  );
}
