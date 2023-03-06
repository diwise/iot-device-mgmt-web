import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import "./featurecard.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FeatureCard = ({ feature }) => {
    switch (feature.type) {
        case "counter": return <CounterFeatureCard feature={feature} />
        case "presence": return <PresenceFeatureCard feature={feature} />
        case "level": return <LevelFeatureCard feature={feature} />
        case "waterquality": return <WaterQualityFeatureCard feature={feature} />
        default: return (<div>{feature.id}</div>);
    }
};

const CommonFeatureCard = ({ feature }) => {
    return (
        <>
            <div><strong>ID:</strong>{feature.id}</div>
            <div><strong>Typ:</strong>{feature.type}</div>
            <div><strong>Kategori:</strong>{feature.subtype}</div>
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

const CounterFeatureCard = ({ feature }) => {
    const labels = [feature.subtype];
    const color = feature.counter.state ? "green" : "grey";

    const options = {
        responsive: true,
        plugins: plugins,
    };

    const data = {
        labels,
        datasets: [
            {
                label: feature.counter.count,
                data: [feature.counter.count],
                backgroundColor: color,
            }
        ],
    };

    return (
        <>
            <CommonFeatureCard feature={feature} />
            <Bar options={options} data={data} />
        </>
    );
};

const PresenceFeatureCard = ({ feature }) => {
    return (
        <>
            <CommonFeatureCard feature={feature} />
            <div className='presenceWrapper'>
                <div className={"presence-" + (feature.presence.state ? "on" : "off")}>{feature.presence.state ? "true" : "false"}</div>
            </div>
        </>
    );
};

const LevelFeatureCard = ({ feature }) => {
    const labels = [feature.subtype];
    const color = "grey";

    let d = feature.level.percent !== undefined ? feature.level.percent : feature.level.current;

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
                label: feature.level.current,
                data: [d],
                backgroundColor: color,
            }
        ],
    };

    return (
        <>
            <CommonFeatureCard feature={feature} />
            <Bar options={options} data={data} updateMode="show" />
        </>
    );
};

const WaterQualityFeatureCard = ({ feature }) => {
    const labels = [feature.subtype];
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
                label: feature.waterquality.temperature + " \u2103", // ˚C
                data: [feature.waterquality.temperature],
                backgroundColor: color,
            }
        ],
    };

    return (
        <>
            <CommonFeatureCard feature={feature} />
            <Bar options={options} data={data} />
        </>
    );
};

export {
    FeatureCard,
    CounterFeatureCard,
    PresenceFeatureCard,
    LevelFeatureCard,
    WaterQualityFeatureCard
};
