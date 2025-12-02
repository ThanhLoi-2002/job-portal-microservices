"use client";
import { useAppData, user_service } from "@/components/context/AppContext";
import { User } from "@/type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/loading";
import Info from "../components/info";

const UserAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const { loading, setLoading } = useAppData();

  async function fetchUser() {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const { data } = await axios.get(`${user_service}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <>
      {user && (
        <div className="w-[90%] md:w-[60%] m-auto">
          <Info user={user} isYourAccount={true} />
        </div>
      )}
    </>
  );
};

export default UserAccount;
