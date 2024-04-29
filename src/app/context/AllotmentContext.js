"use client";

import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import api from "@/lib/api";

const AllotmentContext = createContext();

export const AllotmentProvider = ({ children }) => {
  const [allotmentSet, setLatestAllotmentSet] = useState(null);
  const [allotmentsetId, setAllotmentsetId] = useState(null);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    const fetchAllotmentSet = async () => {
      const response = await api.get("/allotmentset");
      if (response.status === 200 && response.data.success == true) {
        console.log(response.data.latestAllotmentSet.allotments);
        setLatestAllotmentSet(response.data.latestAllotmentSet.allotments);
      } else {
        console.log("Failed to fetch allotment id");
        return;
      }
    };

    if (isAuthenticated) {
      fetchAllotmentSet();
    }
  }, [isAuthenticated == true]);

  const setAllotmentSetId = (id) => {
    setAllotmentsetId(id);
  };

  const setAllotmentSet = (allotmentSet) => {
    setLatestAllotmentSet(allotmentSet);
  };

  return (
    <AllotmentContext.Provider
      value={{
        allotmentsetId,
        setAllotmentSetId,
        allotmentSet,
        setAllotmentSet,
      }}
    >
      {children}
    </AllotmentContext.Provider>
  );
};

export const useAllotmentContext = () => {
  const context = useContext(AllotmentContext);
  if (!context) {
    throw new Error(
      "useAllotmentContext must be used within an AllotmentProvider"
    );
  }
  return context;
};