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
import { IconSolid } from "../../components/Icons"

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

const loadHistory = async (funcID, lastN) => {
    const res = await fetch(`/api/functions/${funcID}/history?lastN=${lastN}`, {
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
        case "building": return <BuildingCard func={func} />
        default: return (<div>{func.id}</div>);
    }
};

const CommonFunctionCard = ({ func }) => {
    return (
        <>
            <div><strong>ID:</strong><Link to={func.id}>{func.id}</Link></div>
            <div><strong>Namn:</strong>{func.name}</div>
            <div><strong>Typ:</strong>{func.type}</div>
            <div><strong>Kategori:</strong>{func.subtype}</div>
            <hr />
        </>
    );
};

const bell = (state) => {
    if (state) {
        return <svg xmlns="http://www.w3.org/2000/svg" height="64px" width="56px" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
    }

    return <svg xmlns="http://www.w3.org/2000/svg" height="64px" width="56px" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
};

const PresenceCard = ({ func }) => {
    return (
        <>
            <CommonFunctionCard func={func} />
            <div className='presenceWrapper'>
                <div className={"presence-" + (func.presence.state ? "on" : "off")}>
                    {bell(func.presence.state)}
                </div>
            </div>
        </>
    );
};

const BuildingCard = ({ func }) => {
    return (
        <LineCard f={func} titleText={func.building.power + "kW"} label={""} lastN="100" />
    );
};

const CounterCard = ({ func }) => {
    return (
        <LineCard f={func} titleText="" label={func.counter.count} lastN="10" />
    );
};

const LevelCard = ({ func }) => {
    let options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: func.level.current,
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
            },
            y: {
                min: 0
            }
        }
    };

    return (
        <LineCard f={func} titleText={func.level.current} label="" lastN="10" opts={options} />
    );
};

const WaterQualityCard = ({ func }) => {
    return (
        <LineCard f={func} titleText={func.waterquality.temperature + "\u2103"} label={"\u2103"} lastN="24" />
    );
};

const TimerCard = ({ func }) => {
    return (
        <LineCard f={func} titleText={""} label={""} lastN="50" />
    );
};

const LineCard = ({ f, titleText, label, lastN, opts }) => {
    const [history, setHistory] = useState([]);

    let options = {
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

    if (opts !== undefined) {
        options = opts
    }

    useEffect(() => {
        UserService.updateToken(async () => {
            let h = await loadHistory(f.id, lastN);
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
    WaterQualityCard,
    BuildingCard
};
