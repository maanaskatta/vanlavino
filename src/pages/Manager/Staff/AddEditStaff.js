import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomStyledSelect from "../../../components/CustomStyledSelect";
import Loading from "../../../components/Loading";
import getData from "../RouteControllers/getData";
import insertData from "../RouteControllers/insertData";
import updateData from "../RouteControllers/updateData";

const customStyles = {
  content: {
    maxHeight: "80%",
  },
};

export default function AddEditStaff({
  isModalOpen,
  setIsModalOpen,
  staff,
  setStaffToBeEdited,
}) {
  const [mutationInProgress, setMutationInProgress] = useState(false);
  const [departments, setDepartments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData("getDepartments")
      .then((data) => {
        setDepartments(
          data.map((item) => {
            return {
              label: item.DepartmentName,
              value: item.DepartmentID,
            };
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load departments data!...");
      });
  }, []);

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
      name: "phoneNumber",
      placeholder: "Enter the phone number...",
      label: "Phone Number",
    },
    {
      name: "DepartmentName",
      placeholder: "Select the department...",
      label: "Department",
      type: "select",
      options: departments,
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

  const addNewStaff = async (data) => {
    let res = await insertData("addStaff", data);
    if (res) {
      toast.success("Staff added successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to add new Staff!...");
      setMutationInProgress(false);
    }
    console.log(res);
  };

  const updateStaff = async (data) => {
    let res = await updateData("updateStaff", data);
    if (res) {
      toast.success("Staff updated successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to update Staff!...");
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
          setStaffToBeEdited(null);
        }}
        htmlOpenClassName="overflow-hidden"
        style={customStyles}
        bodyOpenClassName="overflow-hidden"
        className="inset-y-auto inset-x-auto bg-white rounded-md w-1/2 absolute top-0 mt-10 focus:outline-none overflow-auto"
        overlayClassName="transition-all ease-in-out duration-300 flex justify-center items-center bg-opacity-75 bg-black inset-0 fixed p-8"
      >
        <div>
          <header className="rounded-t-md bg-black w-full py-5 px-12 text-white flex items-center justify-between">
            <div className="text-white">{staff ? "Edit" : "Add"} Staff</div>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setStaffToBeEdited(null);
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
                  [cur.name]: staff && staff[cur.name] ? staff[cur.name] : "",
                };
              }, {})}
              validationSchema={schema}
              onSubmit={(values, r) => {
                console.log(values);
                setMutationInProgress(true);
                if (staff) {
                  updateStaff({
                    StaffID: staff.StaffID,
                    ...values,
                  });
                } else {
                  addNewStaff(values);
                  r.resetForm();
                }
              }}
            >
              {({ values }) => {
                if (!isLoading) {
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
                            setStaffToBeEdited(null);
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
                }
                return <Loading />;
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
}
