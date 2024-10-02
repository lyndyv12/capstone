import { useState } from 'react';

const BusinessForm = ({ mode = 'create' }) => {
  const [name_full, setName_Full] = useState('');
  const [street_address, setStreet_Address] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [business_type, setBusiness_Type] = useState('');
  const [price_range, setPrice_Range] = useState('$');
  const [hasKidsSeating, setHasKidsSeating] = useState(false);
  const [hasChangingStation, setHasChangingStation] = useState(false);
  const [features, setFeatures] = useState({ kidsSeatingOptions: [], changingStationLocations: [] });
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

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      await businessFormAction({ 
        name_full, 
        street_address, 
        city, 
        state, 
        zip, 
        business_type, 
        price_range, 
        hasKidsSeating, 
        hasChangingStation, 
        features 
      }, mode);
    } catch (ex) {
      setError(ex.error);
      console.log(error);
    }
  };

  return (
    <form onSubmit={submit}>
      { !!error && <div className='error'>{error}</div> }
      <input 
        value={name_full} 
        placeholder='Business Name' 
        onChange={ev => setName_Full(ev.target.value)} 
      />
      <input 
        value={street_address} 
        placeholder='Street Address' 
        onChange={ev => setStreet_Address(ev.target.value)} 
      />
      <input 
        value={city} 
        placeholder='City' 
        onChange={ev => setCity(ev.target.value)} 
      />
      <input 
        value={state} 
        placeholder='State' 
        onChange={ev => setState(ev.target.value)} 
      />
      <input 
        value={zip} 
        placeholder='ZIP Code' 
        onChange={ev => setZip(ev.target.value)} 
      />
      <input 
        value={business_type} 
        placeholder='Business Type' 
        onChange={ev => setBusiness_Type(ev.target.value)} 
      />
      <select value={price_range} onChange={ev => setPrice_Range(ev.target.value)}>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
        <option value="$$$$">$$$$</option>
      </select>
      <label>
        <input 
          type="checkbox" 
          checked={hasKidsSeating} 
          onChange={ev => setHasKidsSeating(ev.target.checked)} 
        />
        Has Kids Seating
      </label>
      <label>
        <input 
          type="checkbox" 
          checked={hasChangingStation} 
          onChange={ev => setHasChangingStation(ev.target.checked)} 
        />
        Has Changing Station
      </label>
      <textarea 
        placeholder='Kids Seating Options (comma-separated)' 
        onChange={ev => 
          setFeatures(prev => ({
            ...prev, 
            kidsSeatingOptions: ev.target.value.split(',').map(option => option.trim())
          }))
        } 
      />
      <textarea 
        placeholder='Changing Station Locations (comma-separated)' 
        onChange={ev => 
          setFeatures(prev => ({
            ...prev, 
            changingStationLocations: ev.target.value.split(',').map(location => location.trim())
          }))
        } 
      />
      <button>{mode === 'create' ? 'Create Business' : 'Update Business'}</button>
    </form>
  );
};

export default BusinessForm;
