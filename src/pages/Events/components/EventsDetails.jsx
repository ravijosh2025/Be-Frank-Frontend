import ImageGallery from "../../../components/ImageGallery";
import Feedback from "./Feedback";

const EventDetails = ({ event }) => {
  if (!event) {
    return <h2 className="text-center text-xl mt-10">Event not found!</h2>;
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto min-w-full p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold mt-4 text-gray-900">{event.name}</h1>
        <p className="text-gray-600 text-lg mt-2">{event.date}</p>

        {/* Detailed Description */}
        <p className="text-gray-700 mt-4 leading-relaxed">
          {event.description}
        </p>

        {/* Organizer Details */}
        <h3 className="text-2xl font-semibold mt-6">Organized By</h3>
        <p className="text-gray-700">
          {event.user.first_name} {event.user.last_name} ({event.user.role})
        </p>

        {/* School/Institute */}
        <h3 className="text-2xl font-semibold mt-6">School</h3>
        <p className="text-gray-700">
          {event.school.name}, {event.school.city}, {event.school.state}
        </p>

        {/* Image Gallery */}
        <ImageGallery images={event.image_urls} />

        {/* Video Stack */}
        <h3 className="text-2xl font-semibold mt-6">Event Videos</h3>
        <div className="space-y-3 mt-2">
          {event.video_urls.map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Watch Video {index + 1}
            </a>
          ))}
        </div>

        {/* Feedback Section */}
        <h3 className="text-2xl font-semibold mt-6">Feedbacks</h3>
        <Feedback feedbacks={event.feedbacks} eventId={event.id} />
      </div>
    </div>
  );
};

export default EventDetails;
