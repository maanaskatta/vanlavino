import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { useTable } from "react-table";
import Loading from "../../../components/Loading";
import AddEditStaff from "./AddEditStaff";

const fakeStaff = [
  {
    firstName: "Maanas",
    lastName: "Katta",
    phoneNumber: "9121012244",
    DepartmentName: "House Keeping",
  },
];

const Staff = ({ label }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffToBeEdited, setStaffToBeEdited] = useState(null);
  const [staffCrew, setStaff] = useState(fakeStaff);
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

  const edit = (staff) => {
    setStaffToBeEdited(staff);
    setIsModalOpen(true);
  };

  const data = React.useMemo(
    () =>
      staffCrew && staffCrew.length > 0
        ? staffCrew.map((staff) => {
            return {
              ...staff,
              edit: (
                <button
                  onClick={() => edit(staff)}
                  className="flex justify-center items-center w-full cursor-pointer"
                >
                  <BsPencil />
                </button>
              ),
            };
          })
        : [],
    [staffCrew]
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
        Header: "Department",
        accessor: "DepartmentName",
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
          <p>Add new staff</p>
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : staffCrew && staffCrew.length > 0 ? (
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
        <p className="flex justify-center text-xl">No staff found!..</p>
      )}

      {isModalOpen ? (
        <AddEditStaff
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          staff={staffToBeEdited ? staffToBeEdited : null}
          setStaffToBeEdited={setStaffToBeEdited}
        />
      ) : null}
    </div>
  );
};

export default Staff;
