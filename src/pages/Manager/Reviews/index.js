import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import Loading from "../../../components/Loading";
import NoDataText from "../../../components/NoDataText";
import { AiOutlineStar } from "react-icons/ai";

const fakeReviews = [
  {
    review: "The staff was super friendly and gave great service.",
    rating: 5,
    dateAndTime: "20-Nov-2021",
  },
  {
    review: "Nice ambience but pricy for the quantity of food they give you",
    rating: 4,
    dateAndTime: "15-Nov-2021",
  },
  {
    review:
      "This place is one of the best quality places in town for the price.",
    rating: 5,
    dateAndTime: "18-Nov-2021",
  },
];

const Review = ({ review }) => {
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
        <BiCommentDetail className="text-xl" />
        <p className="text-xl">{review.review}</p>
      </div>

      <div className="flex items-center gap-1">
        <AiOutlineStar className="text-xl" />
        <p className="text-lg">{review.rating}</p>
      </div>

      <div className="flex items-center gap-1">
        <BsFillCalendar2CheckFill className="text-xl" />
        <p className="text-base">{review.dateAndTime}</p>
      </div>
    </div>
  );
};

export default function Reviews({ label }) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState(fakeReviews);
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
      </div>

      {isLoading ? (
        <Loading />
      ) : reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {reviews.map((review) => (
            <Review review={review} />
          ))}
        </div>
      ) : (
        <NoDataText message={"No reviews found!..."} />
      )}
    </div>
  );
}
