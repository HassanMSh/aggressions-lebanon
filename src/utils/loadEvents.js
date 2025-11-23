export async function loadEvents() {
  const res = await fetch("/events.json");
  return await res.json();
}
