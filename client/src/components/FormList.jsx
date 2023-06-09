import React, { useState } from "react";

function FormList({
  handleRefresh,
  handleClose,
  categories = [],
  method,
  type,
  value,
  ID,
}) {
  const [Item, setItem] = useState(value.item);
  const [Amount, setAmount] = useState(value.Amount);
  const [Category, setCategory] = useState(value.category);
  const [User, setUser] = useState(value.user);

  async function handleSubmit() {
    await fetch(`http://localhost:5555/List/${type}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: Item,
        Amount:Amount,
        Category:Category,
        User:User,
        ID: ID,
      }),
    });
  }

  return (
    <div class="form_M">
      <form>
        <label htmlFor="Item">שם פריט</label>
        <input
          name="Item"
          type="text"
          value={Item}
          onChange={(e) => setItem(e.target.value)}
        />
         <label htmlFor="Amount">כמות</label>
        <input
          name="Amount"
          type="number"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />
         <label htmlFor="List">קטגוריה</label>
        <input
          list="categories"
          name="category"
          type="text"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="categories">
          {categories.map((item, index) => <option key={`item_${index}`}>{item["category"]}</option>)}
        </datalist>
         <label htmlFor="User">שם המבקש</label>
        <input
          name="User"
          type="text"
          value={User}
          onChange={(e) => setUser(e.target.value)}
        />
        <button
          className="btn_D"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            handleRefresh();
            handleClose();
          }}
        >
          שלח
        </button>
      </form>
    </div>
  );
}

export default FormList;
