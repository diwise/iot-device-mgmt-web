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
import { Bar, Line } from 'react-chartjs-2';
import UserService from '../../services/UserService';
import { useEffect, useState } from "react";
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

const FunctionCard = ({ func }) => {
    switch (func.type) {
        case "counter": return <CounterCard func={func} />
        case "presence": return <PresenceCard func={func} />
        case "level": return <LevelCard func={func} />
        case "waterquality": return <WaterQualityCard func={func} />
        default: return (<div>{func.id}</div>);
    }
};

const CommonFunctionCard = ({ func }) => {
    return (
        <>
            <div><strong>ID:</strong>{func.id}</div>
            <div><strong>Typ:</strong>{func.type}</div>
            <div><strong>Kategori:</strong>{func.subtype}</div>
            <hr />
        </>
    );
};

const plugins = {
    legend: {
        position: 'top',
        display: true,
    },
    title: {
        display: false,
    },
};

const CounterCard = ({ func }) => {
    const labels = [func.subtype];
    const color = func.counter.state ? "green" : "grey";

    const options = {
        responsive: true,
        plugins: plugins,
    };

    const data = {
        labels,
        datasets: [
            {
                label: func.counter.count,
                data: [func.counter.count],
                backgroundColor: color,
            }
        ],
    };

    return (
        <>
            <CommonFunctionCard func={func} />
            <Bar options={options} data={data} />
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

const LevelCard = ({ func }) => {
    const labels = [func.subtype];
    const color = "grey";

    let d = func.level.percent !== undefined ? func.level.percent : func.level.current;

    const options = {
        responsive: true,
        plugins: plugins,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: func.level.current,
                data: [d],
                backgroundColor: color,
            }
        ],
    };

    return (
        <>
            <CommonFunctionCard func={func} />
            <Bar options={options} data={data} updateMode="show" />
        </>
    );
};

const WaterQualityCard = ({ func }) => {
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
                text: func.waterquality.temperature + "\u2103",
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
                    unit: 'week'
                }
            }
        }
    };

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

    useEffect(() => {
        UserService.updateToken(async () => {
            let h = await loadHistory(func.id);
            setHistory(h.history.values);
        });
    }, [func.id]);

    const data = {
        datasets: [
            {
                label: "\u2103", // ˚C
                data: history.map((h) => { return { x: h.ts, y: h.v } }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <>
            <CommonFunctionCard func={func} />
            <Line options={options} data={data} />
        </>
    );
};

export {
    FunctionCard,
    CounterCard,
    PresenceCard,
    LevelCard,
    WaterQualityCard
};
