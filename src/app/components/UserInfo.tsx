"use client";
import { useUserStore } from "@/store/useUserStore";
import React, { ChangeEvent, useEffect, useState } from "react";

interface IUser {
  name: string;
  email: string;
}

function UserInfo() {
  const { setUser, clearUser, user } = useUserStore();
  const [userInfo, setUserInfo] = useState<IUser>({
    name: user?.name || "",
    email: user?.email || "",
  });
  //   const [value, setValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    console.log(userInfo, "userInfo");
    setUser(userInfo);
  };
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name ?? "",
        email: user.email ?? "",
      });
    } else {
      setUserInfo({ name: "", email: "" });
    }
  }, [user]); // Only re-run when `user` changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Welcome {user?.name}</h3>
        <input
          type="text"
          onChange={handleChange}
          value={userInfo?.name}
          name="name"
          placeholder="name"
        />
        <input
          type="email"
          onChange={handleChange}
          value={userInfo?.email}
          name="email"
          placeholder="email"
        />
        {/* <input
          type="email"
          name="email"
          // ✅ Only use userInfo
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Email"
        /> */}
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            setUserInfo({ name: "", email: "" });
            clearUser();
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
