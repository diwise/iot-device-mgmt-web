import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const Funcs = () => {
    const { functionID } = useParams();
    const { func, setFunction } = useState({});

    useEffect(() => {
        const fetchFunction = async () => {
            let res = await fetch(`/api/functions/${functionID}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${UserService.getToken()}`
                }
            });
            if (res.ok) {
                let json = await res.json();
                setFunction(json);
            }
        };
        UserService.updateToken(async () => {
            await fetchFunction();
        });
    });

    return (
        <>
            <div>{functionID}</div>
        </>
    );
};

export default Funcs