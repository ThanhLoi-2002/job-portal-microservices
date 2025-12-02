"use client"
import { useAppData } from "@/components/context/AppContext";
import Loading from "@/components/loading";
import React from "react";

const AccountPage = () => {
  const { isAuth, user, loading } = useAppData();

  if(loading) return <Loading/>
  return <div>AccountPage</div>;
};

export default AccountPage;
