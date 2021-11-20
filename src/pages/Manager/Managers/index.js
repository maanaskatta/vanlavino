import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { MdAddCircleOutline } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import Loading from "../../../components/Loading";
import AddEditManager from "./AddEditManager";
import getData from "../RouteControllers/getData";

const Managers = ({ label }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [managerToBeEdited, setManagerToBeEdited] = useState(null);
  const [managers, setManagers] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getData("getManagers")
      .then((data) => {
        setManagers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen]);

  const edit = (manager) => {
    setManagerToBeEdited(manager);
    setIsModalOpen(true);
  };

  const data = React.useMemo(
    () =>
      managers && managers.length > 0
        ? managers.map((manager) => {
            return {
              ...manager,
              edit: (
                <button
                  onClick={() => edit(manager)}
                  className="flex justify-center items-center w-full cursor-pointer"
                >
                  <BsPencil />
                </button>
              ),
            };
          })
        : [],
    [managers]
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
        Header: "Shift Period",
        accessor: "shiftPeriod",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Email",
        accessor: "email",
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
          <p>Add new manager</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : managers && managers.length > 0 ? (
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
        <p className="flex justify-center text-xl">No managers found!..</p>
      )}

      {isModalOpen ? (
        <AddEditManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          manager={managerToBeEdited ? managerToBeEdited : null}
          setManagerToBeEdited={setManagerToBeEdited}
        />
      ) : null}
    </div>
  );
};

export default Managers;
