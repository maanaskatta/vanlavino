import React, { useEffect, useState } from "react";
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
import getData from "../RouteControllers/getData";
import deleteData from "../RouteControllers/deleteData";
import { toast } from "react-toastify";

const Coupon = ({ coupon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const deleteCoupon = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteCoupon", data);
    if (res) {
      toast.success("Coupon deleted successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to delete Coupon!...");
      setMutationInProgress(false);
    }
  };

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
          onClick={() => {
            deleteCoupon({
              CouponID: coupon.CouponID,
            });
          }}
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
  const [coupons, setCoupons] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getData("getCoupons")
      .then((data) => {
        setCoupons(data);
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
