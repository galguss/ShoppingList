import React, { useState } from 'react'

function FormCategories({handleRefres,handleClose, method, type, value, ID}) {
    const [Categories, setCategories] = useState('');

   async function handleSubmit(){
       const res = await fetch(`http://localhost:5555/categories/${type}`, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Category: Categories,
                ID:ID
            })
        });
   }

  return (
    <div class="form_M">
        <form>
            <label htmlFor="categories">קטגוריה חדשה</label>
            <input name='categories' type='text' value={value} onChange={(e) => setCategories(e.target.value)}/>
            <button className='btn_D' onClick={(e) => { e.preventDefault(); handleSubmit(); handleRefres(); handleClose();}}>שלח</button>
        </form>
    </div>
  )
}

export default FormCategories