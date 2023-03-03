import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const Feature = () => {
    const { featureID } = useParams();
    const { feature, setFeature } = useState({});

    useEffect(() => {
        const fetchFeature = async () => {
            let res = await fetch(`/api/features/${featureID}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${UserService.getToken()}`
                }
            });
            if (res.ok) {
                let json = await res.json();
                setFeature(json);
            }
        };
        UserService.updateToken(async () => { 
            await fetchFeature();
        });        
    });

    return (
        <>
            <div>{featureID}</div>
        </>
    );
};

export default Feature