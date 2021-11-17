import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import * as Yup from "yup";
import CustomStyledSelect from "../../../components/CustomStyledSelect";

const customStyles = {
  content: {
    maxHeight: "80%",
  },
};

export default function AddEditChef({
  isModalOpen,
  setIsModalOpen,
  chef,
  setChefToBeEdited,
}) {
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const chefFieldKeys = [
    {
      name: "firstName",
      placeholder: "Enter the first name...",
      label: "First Name",
    },
    {
      name: "lastName",
      placeholder: "Enter the last name...",
      label: "Last Name",
    },
    {
      name: "CuisineID",
      placeholder: "Select the cuisine...",
      label: "Cuisine",
      type: "select",
      options: [
        {
          label: "Indian",
          value: 7856,
        },
        {
          label: "Mexican",
          value: 4521,
        },
      ],
    },
    {
      name: "shiftPeriod",
      placeholder: "Enter the shift period...",
      label: "Shift Period",
    },
    {
      name: "phoneNumber",
      placeholder: "Enter the phone number...",
      label: "Phone Number",
    },
  ];

  const schema = Yup.object().shape(
    chefFieldKeys.reduce((prev, cur) => {
      return {
        ...prev,
        [cur.name]: Yup.string().nullable().required("Required"),
      };
    }, {})
  );

  //   const addNewResident = async (data) => {
  //     let res = await insertData("addResident", data);
  //     if (res) {
  //       toast.success("Resident added successfully...");
  //       setMutationInProgress(false);
  //     } else {
  //       toast.error("Failed to add new resident!...");
  //       setMutationInProgress(false);
  //     }
  //     console.log(res);
  //   };

  //   const updateResident = async (data) => {
  //     let res = await updateData("updateResident", data);
  //     if (res) {
  //       toast.success("Resident updated successfully...");
  //       setMutationInProgress(false);
  //     } else {
  //       toast.error("Failed to update resident!...");
  //       setMutationInProgress(false);
  //     }
  //     console.log(res);
  //   };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setChefToBeEdited(null);
        }}
        htmlOpenClassName="overflow-hidden"
        style={customStyles}
        bodyOpenClassName="overflow-hidden"
        className="inset-y-auto inset-x-auto bg-white rounded-md w-1/2 absolute top-0 mt-10 focus:outline-none overflow-auto"
        overlayClassName="transition-all ease-in-out duration-300 flex justify-center items-center bg-opacity-75 bg-black inset-0 fixed p-8"
      >
        <div>
          <header className="rounded-t-md bg-black w-full py-5 px-12 text-white flex items-center justify-between">
            <div className="text-white">{chef ? "Edit" : "Add"} Chef</div>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setChefToBeEdited(null);
              }}
            >
              <MdClose className="w-6 h-6 text-white" />
            </button>
          </header>

          <div className="p-3 flex flex-col gap-3">
            <Formik
              initialValues={chefFieldKeys.reduce((prev, cur) => {
                return {
                  ...prev,
                  [cur.name]: chef && chef[cur.name] ? chef[cur.name] : "",
                };
              }, {})}
              validationSchema={schema}
              onSubmit={(values, r) => {
                console.log(values);
                // setMutationInProgress(true);
                // if (cuisine) {
                //   updateResident({
                //     ResidentID: resident.ResidentID,
                //     ...values,
                //   });
                // } else {
                //   addNewResident(values);
                //   r.resetForm();
                // }
              }}
            >
              {({ values }) => {
                return (
                  <Form className="flex flex-col p-8 gap-5">
                    {chefFieldKeys.map((chef, index) => {
                      if (chef.type !== "select") {
                        return (
                          <div>
                            <p>
                              {chef.label}
                              <span className="text-red-600">*</span>
                            </p>
                            <Field
                              name={chef.name}
                              placeholder={chef.placeholder}
                              className="bg-gray-100 px-3 py-2 rounded-lg w-full placeholder-black-444"
                            />
                            <ErrorMessage
                              name={chef.name}
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
                              {chef.label}
                              <span className="text-red-600">*</span>
                            </p>
                            <Field
                              name={chef.name}
                              options={chef.options}
                              component={(props) => (
                                <CustomStyledSelect
                                  {...props}
                                  isClearable
                                  isSearchable
                                />
                              )}
                            />
                            <ErrorMessage
                              name={chef.name}
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
                          setChefToBeEdited(null);
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
