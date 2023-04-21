import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    PointElement,
    LineElement,
    TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import UserService from '../../services/UserService';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'chartjs-adapter-spacetime'

import "./functioncard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    TimeScale
);

const loadHistory = async (funcID) => {
    const res = await fetch(`/api/functions/${funcID}/history`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${UserService.getToken()}`
        }
    });
    let j = await res.json();
    return j;
};

const FunctionCard = ({ func }) => {
    switch (func.type) {
        case "counter": return <CounterCard func={func} />
        case "presence": return <PresenceCard func={func} />
        case "level": return <LevelCard func={func} />
        case "waterquality": return <WaterQualityCard func={func} />
        case "timer": return <TimerCard func={func} />
        default: return (<div>{func.id}</div>);
    }
};

const CommonFunctionCard = ({ func }) => {
    return (
        <>
            <div><strong>ID:</strong><Link to={func.id}>{func.id}</Link></div>
            <div><strong>Typ:</strong>{func.type}</div>
            <div><strong>Kategori:</strong>{func.subtype}</div>
            <hr />
        </>
    );
};

const PresenceCard = ({ func }) => {
    return (
        <>
            <CommonFunctionCard func={func} />
            <div className='presenceWrapper'>
                <div className={"presence-" + (func.presence.state ? "on" : "off")}>{func.presence.state ? "true" : "false"}</div>
            </div>
        </>
    );
};


const CounterCard = ({ func }) => {
    return (
        <LineCard f={func} titleText="" label={func.counter.count} />
    );
};

const LevelCard = ({ func }) => {
    return (
        <LineCard f={func} titleText={func.level.current} label="" />
    );
};

const WaterQualityCard = ({ func }) => {
    return (
        <LineCard f={func} titleText={func.waterquality.temperature + "\u2103"} label={"\u2103"} />
    );
};

const TimerCard = ({ func }) => {
    return (
        <LineCard f={func} titleText={""} label={""} />
    );
};

const LineCard = ({ f, titleText, label }) => {
    const [history, setHistory] = useState([]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: titleText,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                },
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    };

    useEffect(() => {
        UserService.updateToken(async () => {
            let h = await loadHistory(f.id);
            setHistory(h.history.values);
        });
    }, [f.id]);

    const data = {
        datasets: [
            {
                label: label,
                data: history.map((h) => { return { x: h.ts, y: h.v } }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <>
            <CommonFunctionCard func={f} />
            <Line options={options} data={data} />
        </>
    );
}

export {
    FunctionCard,
    CounterCard,
    PresenceCard,
    LevelCard,
    WaterQualityCard
};