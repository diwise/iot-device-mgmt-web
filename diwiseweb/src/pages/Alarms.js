import AlarmListCard from "../components/AlarmListCard";

const AlarmListViewContainer = ({ children }) => {
    return (
        <div className="alarms-page">
            {children}
        </div>
    );
}

const Alarms = ({ alarms }) => {
    return (
        <AlarmListViewContainer>
            {alarms.map((a) => {
                return (
                    <AlarmListCard key={a.id} alarm={a} />
                );
            })}
        </AlarmListViewContainer>
    );
}

export default Alarms;