import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CircularProgress, Container } from '@mui/material';

function BusinessDetailCard() {
    const [businessDetails, setBusinessDetails] = useState(null); 
    const { id } = useParams();  

    useEffect(() => {  

        const getBusinessDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/businesses/${id}`);
                const data = await response.json();
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
                        {businessDetails.image_url && (
                            <img 
                                src={businessDetails.image_url} 
                                alt={businessDetails.name_full} 
                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
                            />
                        )}
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

export default BusinessDetailCard