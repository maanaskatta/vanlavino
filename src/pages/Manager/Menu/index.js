import React, { useEffect, useState } from "react";
import { BiCategory, BiDish } from "react-icons/bi";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import Loading from "../../../components/Loading";
import NoDataText from "../../../components/NoDataText";
import AddEditItem from "./AddEditItem";
import { IoMdPricetag } from "react-icons/io";
import getData from "../RouteControllers/getData";
import deleteData from "../RouteControllers/deleteData";
import { toast } from "react-toastify";

const fakeMenu = [
  {
    itemName: "Chicken Biriyani",
    CuisineName: "Indian",
    Price: 12.5,
  },
  {
    itemName: "Shrimp Linguine",
    CuisineName: "Italian",
    Price: 14.26,
  },
];

const Items = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const deleteItem = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteItem", data);
    if (res) {
      toast.success("Item deleted successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to delete Item!...");
      setMutationInProgress(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 border bg-blue-200 rounded shadow-md">
      <div className="flex items-center gap-1">
        <BiDish className="text-xl" />
        <p className="text-xl">{item.itemName}</p>
      </div>

      <div className="flex items-center gap-1">
        <BiCategory className="text-xl" />
        <p className="text-lg">{item.CuisineName}</p>
      </div>

      <div className="flex items-center gap-1">
        <IoMdPricetag className="text-xl" />
        <p className="text-base">{item.Price}</p>
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
            deleteItem({
              ItemID: item.ItemID,
            });
          }}
          className={`text-red-600 text-xl cursor-pointer ${
            mutationInProgress ? " animate-spin" : ""
          }`}
        />
      </div>

      {isModalOpen ? (
        <AddEditItem
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          item={item}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default function Menu({ label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(fakeMenu);

  useEffect(() => {
    setIsLoading(true);
    getData("getItems")
      .then((data) => {
        setMenu(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
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
          <p>Add new item</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : menu && menu.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {menu.map((item) => (
            <Items item={item} />
          ))}
        </div>
      ) : (
        <NoDataText message={"No items found!..."} />
      )}

      {isModalOpen ? (
        <AddEditItem
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          item={null}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
