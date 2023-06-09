import React, { useState } from "react";

function FormCategories({
  handleRefresh,
  handleClose,
  method,
  type,
  value,
  ID,
}) {
  const [Categories, setCategories] = useState(value);

  async function handleSubmit() {
    await fetch(`http://localhost:5555/Categories/${type}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Category: Categories,
        ID: ID,
      }),
    });
  }

  return (
    <div class="form_M">
      <form>
        <label htmlFor="categories">קטגוריה חדשה</label>
        <input
          name="categories"
          type="text"
          value={Categories}
          onChange={(e) => setCategories(e.target.value)}
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

export default FormCategories;
