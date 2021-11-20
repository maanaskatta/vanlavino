import React, { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import Loading from "../../../components/Loading";
import NoDataText from "../../../components/NoDataText";
import AddEditCuisine from "./AddEditCuisine";
import getData from "../RouteControllers/getData";
import { toast } from "react-toastify";
import deleteData from "../RouteControllers/deleteData";

const Cuisine = ({ cuisine }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const deleteCuisine = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteCuisine", data);
    if (res) {
      toast.success("Cuisine deleted successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to delete Cuisine!...");
      setMutationInProgress(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 border bg-blue-200 rounded shadow-md">
      <div className="flex items-center gap-1">
        <BiCategory className="text-xl" />
        <p className="text-base">{cuisine.CuisineName}</p>
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
            deleteCuisine({
              CuisineID: cuisine.CuisineID,
            });
          }}
          className={`text-red-600 text-xl cursor-pointer ${
            mutationInProgress ? " animate-spin" : ""
          }`}
        />
      </div>

      {isModalOpen ? (
        <AddEditCuisine
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cuisine={cuisine}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default function Cuisines({ label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cuisines, setCuisines] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getData("getCuisines")
      .then((data) => {
        setCuisines(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load cuisines!...");
      });
  }, [isModalOpen]);

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
          <p>Add new cuisine</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : cuisines && cuisines.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {cuisines.map((cuisine) => (
            <Cuisine cuisine={cuisine} />
          ))}
        </div>
      ) : (
        <NoDataText message={"No cuisines found!..."} />
      )}

      {isModalOpen ? (
        <AddEditCuisine
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cuisine={null}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
