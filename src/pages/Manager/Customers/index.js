import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { MdAddCircleOutline } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import Loading from "../../../components/Loading";
import AddEditCustomers from "./AddEditCustomers";
import getData from "../RouteControllers/getData";

const Customers = ({ label }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerToBeEdited, setCustomerToBeEdited] = useState(null);
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getData("getCustomers")
      .then((data) => {
        setCustomers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen]);

  const edit = (customer) => {
    setCustomerToBeEdited(customer);
    setIsModalOpen(true);
  };

  const data = React.useMemo(
    () =>
      customers && customers.length > 0
        ? customers.map((customer) => {
            return {
              ...customer,
              edit: (
                <button
                  onClick={() => edit(customer)}
                  className="flex justify-center items-center w-full cursor-pointer"
                >
                  <BsPencil />
                </button>
              ),
            };
          })
        : [],
    [customers]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Email ID",
        accessor: "email",
      },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Edit",
        accessor: "edit",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  console.log(data);
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
          <p>Add new customer</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : customers && customers.length > 0 ? (
        <table {...getTableProps()} style={{ border: "solid 1px red" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: "solid 3px",
                      backgroundColor: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="flex justify-center text-xl">No customers found!..</p>
      )}

      {isModalOpen ? (
        <AddEditCustomers
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          customer={customerToBeEdited ? customerToBeEdited : null}
          setCustomerToBeEdited={setCustomerToBeEdited}
        />
      ) : null}
    </div>
  );
};

export default Customers;
