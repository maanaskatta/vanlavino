import React, { useState } from "react";
import { BiDish } from "react-icons/bi";
import {
  BsFillCalendar2CheckFill,
  BsFillCalendarXFill,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import { IoMdPricetag } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import Loading from "../../../components/Loading";
import NoDataText from "../../../components/NoDataText";
import AddEditCoupon from "./AddEditCoupon";

const fakeCoupons = [
  {
    couponName: "OFF20",
    discount: 2,
    validityFrom: "17-Nov-2021",
    validityTo: "27-Nov-2021",
  },
  {
    couponName: "GET30OFF",
    discount: 3.5,
    validityFrom: "12-Oct-2022",
    validityTo: "21-Dec-2022",
  },
];

const Coupon = ({ coupon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  //   const deleteGate = async (data) => {
  //     setMutationInProgress(true);
  //     let res = await deleteData("deleteAccessGate", data);
  //     if (res) {
  //       toast.success("Access gate deleted successfully...");
  //       setMutationInProgress(false);
  //     } else {
  //       toast.error("Failed to delete access gate!...");
  //       setMutationInProgress(false);
  //     }
  //   };

  return (
    <div className="flex flex-col gap-3 p-3 border bg-blue-200 rounded shadow-md">
      <div className="flex items-center gap-1">
        <BiDish className="text-xl" />
        <p className="text-xl">{coupon.couponName}</p>
      </div>

      <div className="flex items-center gap-1">
        <IoMdPricetag className="text-xl" />
        <p className="text-lg">{coupon.discount}</p>
      </div>

      <div className="flex items-center gap-1">
        <BsFillCalendar2CheckFill className="text-xl" />
        <p className="text-base">{coupon.validityFrom}</p>
      </div>

      <div className="flex items-center gap-1">
        <BsFillCalendarXFill className="text-xl" />
        <p className="text-base">{coupon.validityTo}</p>
      </div>

      <div className="flex justify-end items-center gap-5">
        <BsPencil
          onClick={() => {
            setIsModalOpen(true);
          }}
          className=" text-blue-900 text-xl cursor-pointer"
        />
        <BsTrash
          //   onClick={() => {
          //     deleteGate({
          //       gateID: gate.gateID,
          //     });
          //   }}
          className={`text-red-600 text-xl cursor-pointer ${
            mutationInProgress ? " animate-spin" : ""
          }`}
        />
      </div>

      {isModalOpen ? (
        <AddEditCoupon
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          coupon={coupon}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default function Coupons({ label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState(fakeCoupons);
  //   useEffect(() => {
  //     setIsLoading(true);
  //     getData("getAccessGates")
  //       .then((data) => {
  //         setGates(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [isModalOpen]);

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
          <p>Add new coupon</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : coupons && coupons.length > 0 ? (
        <div className="grid grid-cols-5 gap-3">
          {coupons.map((coupon) => (
            <Coupon coupon={coupon} />
          ))}
        </div>
      ) : (
        <NoDataText message={"No coupons found!..."} />
      )}

      {isModalOpen ? (
        <AddEditCoupon
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          coupon={null}
        />
      ) : (
        <></>
      )}
    </div>
  );
}