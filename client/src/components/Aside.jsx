import React, { useState, useEffect } from "react";

import FormCategories from "./FormCategories";
import FormList from "./FormList";

function Aside({ handleAddToCart }) {
  const [MiniNav, setMiniNav] = useState("List");
  const [Alert, setAlert] = useState(false);
  const [AlertDelete, setAlertDelete] = useState(false);

  const [Counter, setCounter] = useState(0);
  const [Method, setMethod] = useState("");
  const [Type, SetType] = useState("");
  const [Value, setValue] = useState("");
  const [Id, setId] = useState("");

  const [Data, setData] = useState([]);

  async function HandleGetData() {
    const res = await fetch(`http://localhost:5555/${MiniNav}`);
    setData(await res.json());
  }

  useEffect(() => {
    HandleGetData();
  }, [Counter, MiniNav]);

  async function handleDelete() {
    await fetch(`http://localhost:5555/${MiniNav}/Delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: Id,
      }),
    });
  }

  return (
    <aside>
      {AlertDelete ? (
        <div className="form_M">
          <p className="ChatBox">האם אתה בטוח שאתה רוצה למחוק?</p>
          <button
            className="btn_M margin red hand"
            onClick={() => setAlertDelete(false)}
          >
            ביטול
          </button>
          <button
            className="btn_M margin green hand"
            onClick={() => {
              handleDelete();
              setAlertDelete(false);
              setCounter(Counter + 1);
            }}
          >
            מחק
          </button>
        </div>
      ) : null}
      <button
        className="btn right hand"
        onClick={() => setMiniNav("Categories")}
      >
        קטגוריות
      </button>
      <button className="btn left hand" onClick={() => setMiniNav("List")}>
        רשימה
      </button>
      {MiniNav === "Categories" ? (
        <div className="container">
          <button
            className="btn_D hand"
            onClick={() => {
              setAlert(true);
              setMethod("POST");
              SetType("Add");
              setValue("");
            }}
          >
            הוסף קטגוריה
          </button>
          {Alert ? (
            <FormCategories
              handleRefresh={() => setCounter(Counter + 1)}
              handleClose={() => setAlert(false)}
              method={Method}
              type={Type}
              value={Value}
              ID={Id}
            />
          ) : null}
          <ul className="show_Data">
            {Data.map((item, index) => (
              <li key={"category_" + index} className="line_data">
                <span className="item">{item.category}</span>
                <button
                  className="btn_M hand"
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
                <button
                  className="btn_M hand"
                  onClick={() => {
                    setAlertDelete(true);
                    setId(item._id);
                  }}
                >
                  מחק
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container">
          <button
            className="btn_D hand"
            onClick={() => {
              setAlert(true);
              setMethod("POST");
              SetType("Add");
              setValue("");
            }}
          >
            הוסף פריט
          </button>
          {Alert ? (
            <FormList
              handleRefresh={() => setCounter(Counter + 1)}
              handleClose={() => setAlert(false)}
              categories={Data}
              method={Method}
              type={Type}
              value={Value}
              ID={Id}
            />
          ) : null}
          <ul className="show_Data">
            {Data.map(
              (item, index) =>
                !item.item_purchased && (
                  <li key={"Item" + index} onClick={() => setId(item._id)}>
                    <div className="line_data hand">
                      <span className="item_list">{item.item}</span>
                      <span>X{item.Amount}</span>
                      <span>{item.category}</span>
                      <span>{item.user}</span>
                    </div>
                    {Id === item._id ? (
                      <div className="buttons">
                        <button
                          className="btn_M hand"
                          onClick={() => {
                            setAlert(true);
                            setMethod("PATCH");
                            SetType("Edit");
                            setValue(item);
                            setId(item._id);
                          }}
                        >
                          ערוך
                        </button>
                        <button
                          className="btn_M hand"
                          onClick={() => {
                            setAlertDelete(true);
                            setId(item._id);
                          }}
                        >
                          מחק
                        </button>
                        <button
                          className="btn_M hand"
                          onClick={() => {
                            fetch(
                              `http://localhost:5555/List/Edit/${item._id}`,
                              { method: "PATCH" }
                            );
                            handleAddToCart(item);
                            setCounter(Counter + 1);
                          }}
                        >
                          לעגלה
                        </button>
                      </div>
                    ) : null}
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </aside>
  );
}

export default Aside;
