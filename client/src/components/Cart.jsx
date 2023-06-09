import React from 'react'

function Cart({items = []}) {
  return (
    <main className='cart'>
        <table>
            <thead>
                <tr>
                    <th>מוצר</th>
                    <th>כמות</th>
                    <th>קטגוריה</th>
                    <th>ביקש</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => <tr key={"item" + index}>
                    <td>{item.item}</td>
                    <td>{item.Amount}</td>
                    <td>{item.category}</td>
                    <td>{item.user}</td>
                </tr>)}
            </tbody>
        </table>
    </main>
  )
}

export default Cart