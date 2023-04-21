import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FunctionCard } from "../components/FunctionCard";
import AlarmListCard from "../components/AlarmListCard";
import UserService from "../services/UserService";

const FunctionContainer = ({ children }) => {
    return (
        <div className="function-page">
            {children}
        </div>
    );
}

const Funcs = ({ functions }) => {
    const { functionID } = useParams();
    let f = functions.find((x) => x.id === functionID);

    return (
        <FunctionContainer>
            <div>
                <FunctionCard func={f} />
            </div>
            <div>
                <Alarms func={f} />
            </div>
        </FunctionContainer>
    );
};

const loadAlarms = async (deviceID) => {
    const res = await fetch(`/api/v0/alarms?refID=${deviceID}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${UserService.getToken()}`
        }
    });
    let result = [];

    if (res.ok) {
        result = await res.json();
    }

    return result;
}

const Alarms = ({ func }) => {
    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        UserService.updateToken(async () => {
            let alarms = await loadAlarms(func.id);
            setAlarms(alarms);

        });
    }, [func.id]);

    return (
        <>
            {alarms.map((a) => {
                return (
                    <div key={a.id}>
                        <AlarmListCard alarm={a} />
                    </div>
                );
            })}
        </>
    )
};

export default Funcs