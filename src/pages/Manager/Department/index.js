import React, { useEffect, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdAddCircleOutline, MdOutlineAccountTree } from "react-icons/md";
import Loading from "../../../components/Loading";
import NoDataText from "../../../components/NoDataText";
import AddEditDepartment from "./AddEditDepartment";
import getData from "../RouteControllers/getData";
import deleteData from "../RouteControllers/deleteData";
import { toast } from "react-toastify";

const Department = ({
  department,
  departments,
  setDepartments,
  setIsUpdated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const deleteGate = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteDepartment", data);
    if (res) {
      toast.success("Department deleted successfully...");
      setDepartments(
        departments.filter(
          (item) => item.DepartmentID !== department.DepartmentID
        )
      );
      setMutationInProgress(false);
    } else {
      toast.error("Failed to delete Department!...");
      setMutationInProgress(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 border bg-blue-200 rounded shadow-md">
      <div className="flex items-center gap-1">
        <MdOutlineAccountTree className="text-xl" />
        <p className="text-xl">{department.DepartmentName}</p>
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
            deleteGate({
              DepartmentID: department.DepartmentID,
            });
          }}
          className={`text-red-600 text-xl cursor-pointer ${
            mutationInProgress ? " animate-spin" : ""
          }`}
        />
      </div>

      {isModalOpen ? (
        <AddEditDepartment
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          department={department}
          setIsUpdated={setIsUpdated}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default function Departments({ label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState(null);
  const [isUpdated, setIsUpdated] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getData("getDepartments")
      .then((data) => {
        setDepartments(data);
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
          <p>Add new department</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : departments && departments.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {departments.map((department) => (
            <Department
              department={department}
              departments={departments}
              setDepartments={setDepartments}
              setIsUpdated={setIsUpdated}
            />
          ))}
        </div>
      ) : (
        <NoDataText message={"No departments found!..."} />
      )}

      {isModalOpen ? (
        <AddEditDepartment
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          department={null}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
