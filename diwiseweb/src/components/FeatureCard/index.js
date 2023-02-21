import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: true,
        },
        title: {
            display: false,
        },
    },
};

const FeatureCard = ({ feature }) => {
    switch (feature.type) {
        case "counter": return <CounterFeatureCard feature={feature} />
        case "presence": return <PresenceFeatureCard feature={feature} />
        case "level": return <LevelFeatureCard feature={feature} />
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

const CounterFeatureCard = ({ feature }) => {
    const labels = [feature.subtype];
    const color = feature.counter.state ? "green" : "grey";

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
            <div>{feature.presence.state ? "true" : "false"}</div>
        </>
    );
};

const LevelFeatureCard = ({ feature }) => {
    const labels = [feature.subtype];
    const color = "grey";

    let d = feature.levels.percent ? feature.levels.percent : feature.levels.current;

    let o = options;
    o.scales = {
        y: {
            suggestedMin: 0,
            suggestedMax: 100
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: d,
                data: [d],
                backgroundColor: color,
            }
        ],
    };

    return (
        <>
            <CommonFeatureCard feature={feature} />
            <Bar options={o} data={data} updateMode="show" />
        </>
    );
};

export {
    FeatureCard,
    CounterFeatureCard,
    PresenceFeatureCard,
    LevelFeatureCard
}