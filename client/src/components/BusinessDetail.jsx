import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BusinessDetail() {
    const [businessDetails, setBusinessDetails] = useState({});  
    const id = useParams().id; 

    useEffect(() => {  
        console.log("Fetched business ID:", id);

        const getBusinessDetails = async () => {
            try {
                const response = await fetch(`/api/businesses/${id}`);
                const data = await response.json();
                console.log("Fetched business data:", data);
                setBusinessDetails(data);
            } catch (error) {
                console.error("Error fetching business:", error);
            }
        };

        if (id) {
            getBusinessDetails(); 
        }
    }, [id]); 


 

    return (
      <div>
        <h3>Business Name: {businessDetails?.name_full || 'Loading...'}</h3>
        <p>Description: {businessDetails?.business_type}</p>
        <p>Address: {businessDetails?.street_address}</p>
      </div>
    );
}

export default BusinessDetail;
