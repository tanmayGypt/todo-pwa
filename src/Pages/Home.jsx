import React, { useEffect } from "react";
import ListOfTodos from "../Page_Compoents/Home/ListOfTodos";

function Home() {
  useEffect(() => {
    if (!navigator.onLine) {
      alert("Your inte");
    }
  });
  return (
    <div>
      <ListOfTodos />
    </div>
  );
}

export default Home;
