import React, { useState } from "react";
import { Card, Button } from "antd";
import { motion } from "framer-motion";
import Modal from "../../../components/Modals/Model";
import AddEventForm from "../../../components/forms/AddEvent";
import EditEventForm from "../../../components/forms/EditEvent";
import { useGetEventsQuery, useDeleteEventMutation } from "../../Events/apis";

function EventPage() {
    const { data: events, isLoading, error } = useGetEventsQuery();
    const [isOpenAddEvent, setIsAddEventOpen] = useState(false);
    const [isOpenEditEvent, setIsEditEventOpen] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState({});
    const [deleteEvent] = useDeleteEventMutation();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            await deleteEvent(id);
        }
    };

    const handleEdit=(event)=>{
        setEventToUpdate(event);
        setIsEditEventOpen(event);
    }
    

    // Show loading message while fetching data
    if (isLoading) {
        return <div className="text-center text-lg font-semibold">Loading Events...</div>;
    }

    // Show error message if fetching fails
    if (error) {
        return <div className="text-center text-red-500 font-semibold">Error loading events.</div>;
    }

    return (
        <div>
            {/* Main Content */}
            <div className="flex-1 p-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex justify-between items-center mb-6"
                >
                    <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
                    <button
                        onClick={() => setIsAddEventOpen(true)}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
                    >
                        ➕ Add Event
                    </button>
                </motion.div>

                {/* Events List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events?.length > 0 ? (
                        events.map((event) => (
                            <Card key={event.id} title={event.name} className="shadow-md">
                                <p>{event.date}</p>
                                <div className="mt-4 flex gap-2">
                                    {/* <Button 
                                    onClick={()=>handleEdit(event)}
                                    >
                                    Edit
                                    </Button> */}
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No events available.</div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={isOpenAddEvent} onClose={() => setIsAddEventOpen(false)}>
                <AddEventForm onClose={() => setIsAddEventOpen(false)} />
            </Modal>
            <Modal isOpen={isOpenEditEvent} onClose={() => setIsEditEventOpen(false)}>
                <EditEventForm onClose={() => setIsEditEventOpen(false)} eventData={eventToUpdate}/>
            </Modal>
        </div>
    );
}

export default EventPage;
