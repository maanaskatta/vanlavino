import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { MdAddCircleOutline } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import Loading from "../../../components/Loading";
import AddEditOrders from "./AddEditOrders";

const fakeOrders = [
  {
    firstName: "Maanas",
    lastName: "Katta",
    phoneNumber: "9121012244",
    dateAndTime: "24-Jun-2021",
    discount: 0,
    itemName: "Chicken Biriyani",
    Price: 12,
  },
];

const Orders = ({ label }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderToBeEdited, setOrderToBeEdited] = useState(null);
  const [orders, setOrders] = useState(fakeOrders);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     getData("getChefs")
  //       .then((data) => {
  //         setChefs(data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [isModalOpen]);

  const edit = (order) => {
    setOrderToBeEdited(order);
    setIsModalOpen(true);
  };

  const data = React.useMemo(
    () =>
      orders && orders.length > 0
        ? orders.map((order) => {
            return {
              ...order,
              edit: (
                <button
                  onClick={() => edit(order)}
                  className="flex justify-center items-center w-full cursor-pointer"
                >
                  <BsPencil />
                </button>
              ),
            };
          })
        : [],
    [orders]
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
        Header: "Date and Time",
        accessor: "dateAndTime",
      },
      {
        Header: "Item Name",
        accessor: "itemName",
      },
      {
        Header: "Discount",
        accessor: "discount",
      },
      {
        Header: "Bill",
        accessor: "Price",
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
          <p>Add new order</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : orders && orders.length > 0 ? (
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
        <p className="flex justify-center text-xl">No orders found!..</p>
      )}

      {isModalOpen ? (
        <AddEditOrders
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          order={orderToBeEdited ? orderToBeEdited : null}
          setOrderToBeEdited={setOrderToBeEdited}
        />
      ) : null}
    </div>
  );
};

export default Orders;
