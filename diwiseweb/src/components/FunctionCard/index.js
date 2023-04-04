import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import "./functioncard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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
    const labels = [func.subtype];
    const color = "blue";

    const options = {
        responsive: true,
        plugins: plugins,
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 30
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: func.waterquality.temperature + " \u2103", // ˚C
                data: [func.waterquality.temperature],
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

export {
    FunctionCard,
    CounterCard,
    PresenceCard,
    LevelCard,
    WaterQualityCard
};
