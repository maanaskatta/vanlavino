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

export default function AddEditManager({
  isModalOpen,
  setIsModalOpen,
  manager,
  setManagerToBeEdited,
}) {
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const fieldKeys = [
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
      name: "shiftPeriod",
      placeholder: "Enter the shift period...",
      label: "Shift Period",
    },
    {
      name: "phoneNumber",
      placeholder: "Enter the phone number...",
      label: "Phone Number",
    },
    {
      name: "email",
      placeholder: "Enter the emailID...",
      label: "Email ID",
    },
  ];

  const schema = Yup.object().shape(
    fieldKeys.reduce((prev, cur) => {
      return {
        ...prev,
        [cur.name]: Yup.string().nullable().required("Required"),
      };
    }, {})
  );

  const addNewManager = async (data) => {
    let res = await insertData("addManager", data);
    if (res) {
      toast.success("Manager added successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to add new Manager!...");
      setMutationInProgress(false);
    }
    console.log(res);
  };

  const updateEvent = async (data) => {
    let res = await updateData("updateManager", data);
    if (res) {
      toast.success("Manager updated successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to update Manager!...");
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
          setManagerToBeEdited(null);
        }}
        htmlOpenClassName="overflow-hidden"
        style={customStyles}
        bodyOpenClassName="overflow-hidden"
        className="inset-y-auto inset-x-auto bg-white rounded-md w-1/2 absolute top-0 mt-10 focus:outline-none overflow-auto"
        overlayClassName="transition-all ease-in-out duration-300 flex justify-center items-center bg-opacity-75 bg-black inset-0 fixed p-8"
      >
        <div>
          <header className="rounded-t-md bg-black w-full py-5 px-12 text-white flex items-center justify-between">
            <div className="text-white">{manager ? "Edit" : "Add"} Manager</div>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setManagerToBeEdited(null);
              }}
            >
              <MdClose className="w-6 h-6 text-white" />
            </button>
          </header>

          <div className="p-3 flex flex-col gap-3">
            <Formik
              initialValues={fieldKeys.reduce((prev, cur) => {
                return {
                  ...prev,
                  [cur.name]:
                    manager && manager[cur.name] ? manager[cur.name] : "",
                };
              }, {})}
              validationSchema={schema}
              onSubmit={(values, r) => {
                console.log(values);
                setMutationInProgress(true);
                if (manager) {
                  updateEvent({
                    ManagerID: manager.ManagerID,
                    ...values,
                  });
                } else {
                  addNewManager(values);
                  r.resetForm();
                }
              }}
            >
              {({ values }) => {
                return (
                  <Form className="flex flex-col p-8 gap-5">
                    {fieldKeys.map((item, index) => {
                      if (item.type !== "select") {
                        return (
                          <div>
                            <p>
                              {item.label}
                              <span className="text-red-600">*</span>
                            </p>
                            <Field
                              name={item.name}
                              placeholder={item.placeholder}
                              className="bg-gray-100 px-3 py-2 rounded-lg w-full placeholder-black-444"
                            />
                            <ErrorMessage
                              name={item.name}
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
                              {item.label}
                              <span className="text-red-600">*</span>
                            </p>
                            <Field
                              name={item.name}
                              options={item.options}
                              component={(props) => (
                                <CustomStyledSelect
                                  {...props}
                                  isClearable
                                  isSearchable
                                />
                              )}
                            />
                            <ErrorMessage
                              name={item.name}
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
                          setManagerToBeEdited(null);
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
