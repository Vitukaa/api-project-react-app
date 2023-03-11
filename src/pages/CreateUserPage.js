import React, { useState } from 'react'

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
})


  const formInputHandler = (event) => {
    setFormData(prevState => {
        const newData = {...prevState}
        newData[event.target.name] = event.target.value
        return newData
    })
}

const newUserHandler = () => {
  fetch(`http://localhost:3000/users/`, {
      method: 'POST',
      body: JSON.stringify(
          {...formData}
      ),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
  .then((response) => response.json())
  .then((json) => console.log(json));
}


  return (
    <div>
      <form onSubmit={newUserHandler}>
        <div className='form-control'>
          <label htmlFor='name'>*Full name:</label>
          <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
          <label htmlFor='username'>*Username:</label>
          <input type='text' name='username' value={formData.username} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
          <label htmlFor='description'>*Description:</label>
          <textarea name='description' rows="8" cols="50" value={formData.description} onChange={formInputHandler}></textarea>
        </div>
        <div className='form-control'>
          <label htmlFor='email'>*Email:</label>
          <input type='email' name='email' value={formData.email} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
          <label htmlFor='phone'>Phone:</label>
          <input type='tel' name='phone' value={formData.phone} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
          <label htmlFor='address'>*Address:</label>
          <input type='text' name='address' value={formData.address} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
          <label htmlFor='website'>Website:</label>
          <input type='text' name='website' value={formData.website} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
          <label htmlFor='company'>Company:</label>
          <input type='text' name='company' value={formData.company} onChange={formInputHandler}></input>
        </div>
            
          <input type='submit' value='Create new user'></input>
        </form>
    </div>
  )
}
