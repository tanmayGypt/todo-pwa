import React, { useEffect } from "react";
import ListOfTodos from "../Page_Compoents/Home/ListOfTodos";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  useEffect(() => {
    if (!navigator.onLine) {
      toast.loading("Your Internet Connection is Lost");
    }
  });
  return (
    <div>
      <div>
        <Toaster />
      </div>

      <ListOfTodos />
    </div>
  );
}

export default Home;
