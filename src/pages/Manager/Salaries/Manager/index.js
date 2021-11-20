import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { useTable } from "react-table";
import Loading from "../../../../components/Loading";
import AddEditManagerSalaries from "./AddEditManagerSalaries";
import getData from "../../RouteControllers/getData";

const ManagerSalaries = ({ label }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [salaryToBeEdited, setSalaryToBeEdited] = useState(null);
  const [salaries, setSalaries] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getData("getManagerSalaries")
      .then((data) => {
        setSalaries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModalOpen]);

  const edit = (salary) => {
    setSalaryToBeEdited(salary);
    setIsModalOpen(true);
  };

  const data = React.useMemo(
    () =>
      salaries && salaries.length > 0
        ? salaries.map((salary) => {
            return {
              ...salary,
              edit: (
                <button
                  onClick={() => edit(salary)}
                  className="flex justify-center items-center w-full cursor-pointer"
                >
                  <BsPencil />
                </button>
              ),
            };
          })
        : [],
    [salaries]
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
        Header: "Salary",
        accessor: "salary",
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
          <p>Add new record</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : salaries && salaries.length > 0 ? (
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
        <p className="flex justify-center text-xl">No salaries found!..</p>
      )}

      {isModalOpen ? (
        <AddEditManagerSalaries
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          salary={salaryToBeEdited ? salaryToBeEdited : null}
          setSalaryToBeEdited={setSalaryToBeEdited}
        />
      ) : null}
    </div>
  );
};

export default ManagerSalaries;
