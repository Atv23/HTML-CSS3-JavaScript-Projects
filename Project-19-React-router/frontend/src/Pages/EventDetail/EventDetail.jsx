import { useRouteLoaderData } from "react-router-dom";
import EventItem from "../../components/EventItem";

function EventDetail() {
  const eventDetail = useRouteLoaderData("event-detail");

  return <EventItem event={eventDetail.event} />;
}

export default EventDetail;
