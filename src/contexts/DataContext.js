"use client";
import useFetchData from "@/hooks/useFetchData";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useData() {
  return useContext(AuthContext);
}

export default function DataProvider({ children }) {
  const [adminInfo, setAdminInfo] = useState();
  const [vendors, setVendors] = useState();
  const [users, setUsers] = useState();
  const [approvals, setApprovals] = useState();
  const [userHistory, setUserHistory] = useState();
  const [vendorHistory, setVendorHistory] = useState();
  const [loading, setLoading] = useState(true);
  const [recentApprovalsFilter, setRecentApprovalsFilter] = useState("All");
  const { data, error } = useFetchData("vendors");

  function updateFecentApprovalsFilter(data) {
    setRecentApprovalsFilter(data);
    // console.log("admin", data);
  }

  function updateVendors() {
    // setVendors(data);
  }

  function updateUsers(data) {
    setUsers(data);
    // console.log("users", data);
  }

  const setApprovalsFunc = (data) => {
    setApprovals(data);
  };

  const setUserHistoryFunc = (data) => {
    setUserHistory(data);
  };

  const setVendorHistoryFunc = (data) => {
    setVendorHistory(data);
  };

  useEffect(() => {
    setVendors(data);
  }, [data]);

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   // console.log('user', user)
    setLoading(false);

    // setApprovals([
    //   {
    //     _id: "12ec3",
    //     app: "user_signup",
    //     d: 1,
    //     s: "pending",
    //     da: "27-10-2002",
    //     subR: "user-signup",
    //     status: "Pending",
    //     firstName: "Akwasi",
    //     lastName: "Frimpong",
    //     email: "testfrimps@gmail.com",
    //     phoneNumber: "245412312",
    //     location: "GD-377-4883",
    //     passportPicture:
    //       "https://eliterydestorage.blob.core.windows.net/testfrimpsgmailcom/business%20registration%20document/PHOTO-2023-06-12-21-02-22.jpg",
    //   },
    //   {
    //     _id: "123efefw",
    //     app: "vendor_signup",
    //     d: 1,
    //     s: "pending",
    //     da: "27-10-2002",
    //     subR: "vendor-signup",
    //     status: "Pending",
    //     firstName: "Akwasi",
    //     lastName: "Frimpong",
    //     email: "testfrimps@gmail.com",
    //     phoneNumber: "245412312",
    //     location: "GD-377-4883",
    //     passportPicture:
    //       "https://eliterydestorage.blob.core.windows.net/testfrimpsgmailcom/business%20registration%20document/PHOTO-2023-06-12-21-02-22.jpg",
    //   },
    //   {
    //     _id: "123wlde",
    //     app: "add_car",
    //     d: 1,
    //     s: "pending",
    //     da: "27-10-2002",
    //     subR: "car",
    //     status: "Pending",
    //     firstName: "Akwasi",
    //     lastName: "Frimpong",
    //     email: "testfrimps@gmail.com",
    //     phoneNumber: "245412312",
    //     location: "GD-377-4883",
    //     passportPicture:
    //       "https://eliterydestorage.blob.core.windows.net/testfrimpsgmailcom/business%20registration%20document/PHOTO-2023-06-12-21-02-22.jpg",
    //   },
    //   {
    //     _id: "123qwpl",
    //     app: "book_ride",
    //     d: 1,
    //     s: "pending",
    //     da: "27-10-2002",
    //     subR: "booking",
    //     status: "Pending",
    //     firstName: "Akwasi",
    //     lastName: "Frimpong",
    //     email: "testfrimps@gmail.com",
    //     phoneNumber: "245412312",
    //     location: "GD-377-4883",
    //     passportPicture:
    //       "https://eliterydestorage.blob.core.windows.net/testfrimpsgmailcom/business%20registration%20document/PHOTO-2023-06-12-21-02-22.jpg",
    //   },
    // ]);
    // });

    // return unsubscribe;
  }, []);

  const value = {
    vendors,
    users,
    approvals,
    userHistory,
    vendorHistory,
    recentApprovalsFilter,
    updateVendors,
    updateUsers,
    setApprovalsFunc,
    setUserHistoryFunc,
    setVendorHistoryFunc,
    updateFecentApprovalsFilter,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
