import React, { useEffect, useState } from "react";
import { BiDish } from "react-icons/bi";
import { BsFillCalendar2CheckFill, BsPencil, BsTrash } from "react-icons/bs";
import { IoMdPricetag } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import Loading from "../../../components/Loading";
import NoDataText from "../../../components/NoDataText";
import AddEditEvent from "./AddEditEvent";
import getData from "../RouteControllers/getData";
import deleteData from "../RouteControllers/deleteData";
import { toast } from "react-toastify";

const fakeEvents = [
  {
    name: "Food Festival",
    description: "Unlimited food and drinks",
    dateAndTime: "17-Nov-2021 2 PM",
  },
];

const Event = ({ event, events, setEvents, setIsUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  console.log(event);

  const deleteEvent = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteEvent", data);
    if (res) {
      toast.success("Event deleted successfully...");
      setEvents(events.filter((item) => item.eventID !== event.eventID));
      setMutationInProgress(false);
    } else {
      toast.error("Failed to delete Event!...");
      setMutationInProgress(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 border bg-blue-200 rounded shadow-md">
      <div className="flex items-center gap-1">
        <BiDish className="text-xl" />
        <p className="text-xl">{event.name}</p>
      </div>

      <div className="flex items-center gap-1">
        <IoMdPricetag className="text-xl" />
        <p className="text-lg">{event.description}</p>
      </div>

      <div className="flex items-center gap-1">
        <BsFillCalendar2CheckFill className="text-xl" />
        <p className="text-base">{event.dateAndTime}</p>
      </div>

      <div className="flex justify-end items-center gap-5">
        <BsPencil
          onClick={() => {
            setIsModalOpen(true);
          }}
          className=" text-blue-900 text-xl cursor-pointer"
        />
        <BsTrash
          onClick={() => {
            deleteEvent({
              eventID: event.eventID,
            });
          }}
          className={`text-red-600 text-xl cursor-pointer ${
            mutationInProgress ? " animate-spin" : ""
          }`}
        />
      </div>

      {isModalOpen ? (
        <AddEditEvent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          event={event}
          setIsUpdated={setIsUpdated}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default function Events({ label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(fakeEvents);
  const [isUpdated, setIsUpdated] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getData("getEvents")
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen, isUpdated]);

  return (
    <div className="flex p-4 flex-col gap-10 w-full">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl font-semibold">{label}</p>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1 px-3 py-2 bg-blue-900 text-white text-base rounded"
        >
          <MdAddCircleOutline />
          <p>Add new event</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : events && events.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {events.map((event) => (
            <Event
              event={event}
              events={events}
              setEvents={setEvents}
              setIsUpdated={setIsUpdated}
            />
          ))}
        </div>
      ) : (
        <NoDataText message={"No events found!..."} />
      )}

      {isModalOpen ? (
        <AddEditEvent
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          event={null}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
