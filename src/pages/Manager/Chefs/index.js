import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { MdAddCircleOutline } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import Loading from "../../../components/Loading";
import AddEditChef from "./AddEditChef";

const fakeChefs = [
  {
    firstName: "Maanas",
    lastName: "Katta",
    CuisineName: "Indian",
    shiftPeriod: "Lunch",
    phoneNumber: "9121012244",
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    CuisineName: "Mexican",
    shiftPeriod: "Dinner",
    phoneNumber: "5419304455",
  },
];

const Chefs = ({ label }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chefToBeEdited, setChefToBeEdited] = useState(null);
  const [chefs, setChefs] = useState(fakeChefs);

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

  const edit = (chef) => {
    setChefToBeEdited(chef);
    setIsModalOpen(true);
  };

  const data = React.useMemo(
    () =>
      chefs && chefs.length > 0
        ? chefs.map((chef) => {
            return {
              ...chef,
              edit: (
                <button
                  onClick={() => edit(chef)}
                  className="flex justify-center items-center w-full cursor-pointer"
                >
                  <BsPencil />
                </button>
              ),
            };
          })
        : [],
    [chefs]
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
        Header: "Cuisine",
        accessor: "CuisineName",
      },
      {
        Header: "Shift Period",
        accessor: "shiftPeriod",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
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
          <p>Add new chef</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : chefs && chefs.length > 0 ? (
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
        <p className="flex justify-center text-xl">No chefs found!..</p>
      )}

      {isModalOpen ? (
        <AddEditChef
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          chef={chefToBeEdited ? chefToBeEdited : null}
          setChefToBeEdited={setChefToBeEdited}
        />
      ) : null}
    </div>
  );
};

export default Chefs;
