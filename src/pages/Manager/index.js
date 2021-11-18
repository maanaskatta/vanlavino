import React, { useState } from "react";
import {
  AiOutlineCar,
  AiOutlineHistory,
  AiOutlineReconciliation,
} from "react-icons/ai";
import { BiCategory, BiNotepad } from "react-icons/bi";
import { BsCardList, BsReceipt } from "react-icons/bs";
import { FaCoins, FaTools, FaUsers } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import {
  MdOutlineFeaturedPlayList,
  MdOutlineRestaurantMenu,
} from "react-icons/md";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Logo from "../../images/Logo.png";
import Cuisine from "../Manager/Cuisines";
import Chefs from "./Chefs";
import Coupons from "./Coupons";
import Menu from "./Menu";
import Customers from "./Customers";
import Stewards from "./Stewards";
import Departments from "./Department";
import Managers from "./Managers";
import Events from "./Events";

const managerTiles = [
  {
    label: "Chefs",
    path: "/chefs",
    icon: () => <GiChefToque />,
    render: (label) => <Chefs label={label} />,
  },
  {
    label: "Cuisines",
    path: "/cuisines",
    icon: () => <BiCategory />,
    render: (label) => <Cuisine label={label} />,
  },
  {
    label: "Menu",
    path: "/menu",
    icon: () => <MdOutlineRestaurantMenu />,
    render: (label) => <Menu label={label} />,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: () => <BiNotepad />,
    render: (label) => <p>{label}</p>,
  },
  {
    label: "Events",
    path: "/events",
    icon: () => <AiOutlineHistory />,
    render: (label) => <Events label={label} />,
  },
  {
    label: "Managers",
    path: "/managers",
    icon: () => <FaTools />,
    render: (label) => <Managers label={label} />,
  },

  {
    label: "Department",
    path: "/department",
    icon: () => <BiCategory />,
    render: (label) => <Departments label={label} />,
  },
  {
    label: "Table Reservations",
    path: "/reservations",
    icon: () => <FaCoins />,
    render: (label) => <p>{label}</p>,
  },
  {
    label: "Coupons",
    path: "/coupons",
    icon: () => <AiOutlineReconciliation />,
    render: (label) => <Coupons label={label} />,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: () => <MdOutlineFeaturedPlayList />,
    render: (label) => <Customers label={label} />,
  },
  {
    label: "Daily Report",
    path: "/dailyReport",
    icon: () => <BsCardList />,
    render: (label) => <p>{label}</p>,
  },
  {
    label: "Salaries",
    path: "/salaries",
    icon: () => <IoMdPhotos />,
    render: (label) => <p>{label}</p>,
  },
  {
    label: "Reviews",
    path: "/reviews",
    icon: () => <HiOutlineSpeakerphone />,
    render: (label) => <p>{label}</p>,
  },
  {
    label: "Staff",
    path: "/staff",
    icon: () => <HiOutlineSpeakerphone />,
    render: (label) => <p>{label}</p>,
  },
  {
    label: "Stewards",
    path: "/stewards",
    icon: () => <HiOutlineSpeakerphone />,
    render: (label) => <Stewards label={label} />,
  },
];

const HeaderNav = () => {
  const history = useHistory();
  const [currentTileIndex, setCurrentTileIndex] = useState(0);

  return (
    <div className="flex flex-col w-full gap-2 py-4 mx-4">
      <div className="flex  gap-3 justify-between items-center">
        <div>
          <img src={Logo} alt="" width={150} />
        </div>
        <p className="text-4xl font-bold text-white italic tracking-wide">
          Van Lavino
        </p>
        <div>
          <button
            onClick={() => {
              history.push("/login");
              localStorage.setItem("role", null);
            }}
            className="bg-red-500 text-white px-3 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {managerTiles.map((tile, index) => {
          return (
            <div>
              <Link
                to={`/manager` + tile.path}
                className={`${
                  index === currentTileIndex
                    ? "bg-white text-blue-600"
                    : "text-white"
                } flex justify-center items-center border py-4 font-semibold`}
                onClick={() => {
                  setCurrentTileIndex(index);
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`text-2xl ${
                      index === currentTileIndex
                        ? "text-blue-600"
                        : "text-white"
                    }`}
                  >
                    {tile.icon()}
                  </div>
                  {tile.label}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Manager() {
  return (
    <div className="flex w-full flex-col ">
      <div className="flex w-full bg-blue-600">
        <HeaderNav />
      </div>
      <div className="w-full flex flex-col">
        <Switch>
          {managerTiles.map((tile) => (
            <Route
              path={`/manager` + tile.path}
              component={() => tile.render(tile.label)}
            />
          ))}
        </Switch>
        <Redirect to={`/manager` + managerTiles[0].path} />
      </div>
    </div>
  );
}
