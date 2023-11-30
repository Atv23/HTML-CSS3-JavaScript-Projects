import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

export default async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const eventData = Object.fromEntries(data.entries());

  const url = `http://localhost:8080/events/${
    method === "PATCH" ? `${params.eventId}` : ""
  }`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}
