import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Container } from '@mui/material';

function BusinessDetailCard() {
    const [businessDetails, setBusinessDetails] = useState(null); // Initialize as null to handle loading state
    const { id } = useParams();  

    useEffect(() => {  
        console.log("Fetched business ID:", id);

        const getBusinessDetails = async () => {
            try {
                const response = await fetch(`/api/businesses/${id}`);
                const data = await response.json();
                console.log("Fetched business", data);
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
        <Container>
            {businessDetails ? (
                <Card variant="outlined" style={{ marginTop: '16px' }}>
                    <CardContent>
                        <Typography variant="h4" component="div">
                            {businessDetails.name_full}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Business Type: {businessDetails.business_type}
                        </Typography>
                        <Typography variant="body1">
                            Address: {businessDetails.street_address}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <CircularProgress style={{ marginTop: '16px' }} />
            )}
        </Container>
    );
}

export default BusinessDetailCard;