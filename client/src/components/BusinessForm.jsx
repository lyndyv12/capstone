import { useState, useEffect } from 'react'

const BusinessForm = ({ mode='create' })=> {
  const [name_full, setName_Full] = useState('');
  const [error, setError] = useState('');

  const businessFormAction = async (details, mode) => {
    const response = await fetch(`/api/businesses/${mode}`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);
};

  const submit = async(ev) => {
    ev.preventDefault();
    try {  
      await businessFormAction({ name_full }, mode);
    }
    catch(ex){
      setError(ex.error);
      console.log(error)
    }
  }
  return (
    <form onSubmit={ submit }>
      { !!error && <div className='error'>{ error }</div> }
      <input value={ name_full } placeholder='business name' onChange={ ev=> setName_Full(ev.target.value)}/>
      <button>{ mode }</button>
    </form>
  );
}

export default BusinessForm;