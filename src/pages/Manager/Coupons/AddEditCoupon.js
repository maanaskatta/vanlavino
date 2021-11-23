import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomStyledSelect from "../../../components/CustomStyledSelect";
import insertData from "../RouteControllers/insertData";
import updateData from "../RouteControllers/updateData";

const customStyles = {
  content: {
    maxHeight: "80%",
  },
};

export default function AddEditCoupon({
  isModalOpen,
  setIsModalOpen,
  coupon,
  setIsUpdated,
}) {
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const itemFieldKeys = [
    {
      name: "couponName",
      placeholder: "Enter the coupon name...",
      label: "Coupon Name",
    },
    {
      name: "discount",
      placeholder: "Enter the discount...",
      label: "Discount",
    },
    {
      name: "validityFrom",
      placeholder: "Select the valid from...",
      label: "Valid From",
    },
    {
      name: "validityTo",
      placeholder: "Select the valid to...",
      label: "Valid To",
    },
  ];

  const schema = Yup.object().shape(
    itemFieldKeys.reduce((prev, cur) => {
      return {
        ...prev,
        [cur.name]: Yup.string().nullable().required("Required"),
      };
    }, {})
  );

  const addNewCoupon = async (data) => {
    let res = await insertData("addCoupon", data);
    if (res) {
      toast.success("Coupon added successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to add new Coupon!...");
      setMutationInProgress(false);
    }
    console.log(res);
  };

  const updateCoupon = async (data) => {
    let res = await updateData("updateCoupon", data);
    if (res) {
      toast.success("Coupon updated successfully...");
      setIsUpdated(Math.random());
      setMutationInProgress(false);
    } else {
      toast.error("Failed to update Coupon!...");
      setMutationInProgress(false);
    }
    console.log(res);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        htmlOpenClassName="overflow-hidden"
        style={customStyles}
        bodyOpenClassName="overflow-hidden"
        className="inset-y-auto inset-x-auto bg-white rounded-md w-1/2 absolute top-0 mt-10 focus:outline-none overflow-auto"
        overlayClassName="transition-all ease-in-out duration-300 flex justify-center items-center bg-opacity-75 bg-black inset-0 fixed p-8"
      >
        <div>
          <header className="rounded-t-md bg-black w-full py-5 px-12 text-white flex items-center justify-between">
            <div className="text-white">{coupon ? "Edit" : "Add"} Coupon</div>
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <MdClose className="w-6 h-6 text-white" />
            </button>
          </header>

          <div className="p-3 flex flex-col gap-3">
            <Formik
              initialValues={itemFieldKeys.reduce((prev, cur) => {
                return {
                  ...prev,
                  [cur.name]:
                    coupon && coupon[cur.name] ? coupon[cur.name] : "",
                };
              }, {})}
              validationSchema={schema}
              onSubmit={(values, r) => {
                console.log(values);
                setMutationInProgress(true);
                if (coupon) {
                  updateCoupon({
                    CouponID: coupon.CouponID,
                    ...values,
                  });
                } else {
                  addNewCoupon(values);
                  r.resetForm();
                }
              }}
            >
              {({ values }) => {
                return (
                  <Form className="flex flex-col p-8 gap-5">
                    {itemFieldKeys.map((fine, index) => {
                      if (fine.type !== "select") {
                        return (
                          <div>
                            <p>
                              {fine.label}
                              <span className="text-red-600">*</span>
                            </p>
                            <Field
                              name={fine.name}
                              placeholder={fine.placeholder}
                              className="bg-gray-100 px-3 py-2 rounded-lg w-full placeholder-black-444"
                            />
                            <ErrorMessage
                              name={fine.name}
                              render={(msg) => (
                                <div className="text-red-600 text-sm">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <p>
                              {fine.label}
                              <span className="text-red-600">*</span>
                            </p>
                            <Field
                              name={fine.name}
                              options={fine.options}
                              component={(props) => (
                                <CustomStyledSelect
                                  {...props}
                                  isClearable
                                  isSearchable
                                />
                              )}
                            />
                            <ErrorMessage
                              name={fine.name}
                              render={(msg) => (
                                <div className="text-red-600 text-sm">
                                  {msg}
                                </div>
                              )}
                            />
                          </div>
                        );
                      }
                    })}

                    <div className="flex justify-end gap-5 my-5">
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        type="reset"
                        className="px-3 py-2 bg-red-600 text-white rounded-lg focus:outline-none"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg focus:outline-none"
                      >
                        {mutationInProgress ? (
                          <div className="flex gap-3">
                            <div className="spinner-grow w-6 h-6 mr-3"></div>
                            <div>{"Please wait..."}</div>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
}
