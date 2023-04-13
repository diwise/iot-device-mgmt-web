import styled from "styled-components";

const EventContainer = styled.div`
    overflow-y:scroll;
    min-height: 500px;
    margin: 30px;
    height: 60vh;
    width: "100%";
`;

const Events = ({ events }) => {
    return (
        <EventContainer>
            {events.map((e) => {
                return (
                    <div><strong>{e.name}</strong>{JSON.stringify(e.data)}</div>
                );
            })}
        </EventContainer>
    );
};

export default Events;