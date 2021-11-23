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

export default function AddEditItem({
  isModalOpen,
  setIsModalOpen,
  item,
  setIsUpdated,
}) {
  const [mutationInProgress, setMutationInProgress] = useState(false);
  const [cuisines, setCuisines] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData("getCuisines")
      .then((data) => {
        setCuisines(
          data.map((item) => {
            return {
              label: item.CuisineName,
              value: item.CuisineID,
            };
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load cuisines!...");
      });
  }, []);

  const itemFieldKeys = [
    {
      name: "itemName",
      placeholder: "Enter the item name...",
      label: "Item Name",
    },
    {
      name: "CuisineID",
      placeholder: "Select the cuisine...",
      label: "Cuisine",
      type: "select",
      options: cuisines,
    },
    {
      name: "Price",
      placeholder: "Enter the price...",
      label: "Price",
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

  const addNewItem = async (data) => {
    let res = await insertData("addItem", data);
    if (res) {
      toast.success("Item added successfully...");
      setMutationInProgress(false);
    } else {
      toast.error("Failed to add new Item!...");
      setMutationInProgress(false);
    }
    console.log(res);
  };

  const updateItem = async (data) => {
    let res = await updateData("updateItem", data);
    if (res) {
      toast.success("Item updated successfully...");
      setIsUpdated(Math.random());
      setMutationInProgress(false);
    } else {
      toast.error("Failed to update Item!...");
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
            <div className="text-white">{item ? "Edit" : "Add"} Item</div>
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
                  [cur.name]: item && item[cur.name] ? item[cur.name] : "",
                };
              }, {})}
              validationSchema={schema}
              onSubmit={(values, r) => {
                console.log(values);
                setMutationInProgress(true);
                if (item) {
                  updateItem({
                    ItemID: item.ItemID,
                    ...values,
                  });
                } else {
                  addNewItem(values);
                  r.resetForm();
                }
              }}
            >
              {({ values }) => {
                if (!isLoading) {
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
