import React, { useState, useEffect } from "react";
import FormCategories from "./FormCategories";
// import { Routes, Route } from 'react-router-dom';

function Aside() {
  const [MiniNav, setMiniNav] = useState("List");
  const [Alert, setAlert] = useState(false);
  const [Counter, setCounter] = useState(0);
  const [Method, setMethod] = useState("");
  const [Type, SetType] = useState("");
  const [Value, setValue] = useState("");
  const [Id, setId] = useState("");
  const [DataCategories, setDataCategories] = useState([]);

  async function HandleGetData() {
    const res = await fetch("http://localhost:5555/categories");
    setDataCategories(await res.json());
  }

  useEffect(() => {
    HandleGetData();
  }, []);

  return (
    <aside>
      <button className="btn right" onClick={() => setMiniNav("Catagories")}>
        קטגוריות
      </button>
      <button className="btn left" onClick={() => setMiniNav("List")}>
        רשימה
      </button>
      {MiniNav === "Catagories" ? (
        <div className="container">
          <button
            className="btn_D"
            onClick={() => {
              setAlert(true);
              setMethod("POST");
              SetType("Add");
            }}
          >
            הוסף קטגוריה
          </button>
          {Alert ? (
            <FormCategories
              handleRefres = {() => setCounter(Counter + 1)}
              handleClose={() => setAlert(false)}
              method={Method}
              type={Type}
              value={Value}
              ID={Id}
            />
          ) : null}
          <ul className="show_Data">
            {DataCategories.map((item, index) => (
              <li key={"category_" + index} className="line_data">
                {item.category}
                <button
                  className="btn_M"
                  onClick={() => {
                    setAlert(true);
                    setMethod("PATCH");
                    SetType("Edit");
                    setValue(item.category);
                    setId(item._id);
                  }}
                >
                  ערוך
                </button>
                <button className="btn_M">מחק</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container">
          <button>הוסף פריט +</button>
        </div>
      )}
    </aside>
  );
}

export default Aside;
