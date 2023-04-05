import React from "react";
import { useCollapse } from "@collapsed/react";
import UserService from "../../services/UserService";
import "./alarmListCard.css";

const AlarmListCard = ({ defaultExpanded, collapsedHeight, alarm }) => {
  const config = {
    defaultExpanded: defaultExpanded || false,
    collapsedHeight: collapsedHeight || 0,
  };

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);

  let statusClass = "";
  switch (alarm.severity) {
    case 1: statusClass = "low"; break;
    case 2: statusClass = "medium"; break;
    case 3: statusClass = "high"; break;
    default: statusClass = "low"; break;
  }

  if (!alarm.active) {
    statusClass = "closed";
  }

  let observedAt = new Date(alarm.observedAt).toISOString();

  const closeAlarm = async (alarmID) => {
    const res = await fetch(`/api/v0/alarms/${alarmID}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${UserService.getToken()}`
      }
    });

    return res.ok;
  };

  return (
    <div className={`alarmWrapper ${statusClass}`}>
      <div className="alarmContainer">
        <div className="grid alarm" {...getToggleProps()}>
          <AlarmIdentifier alarm={alarm} />
          <strong>{alarm.type}</strong>
          <strong></strong>
          <strong>{observedAt}</strong>
        </div>
        <div className="contentWrapper" {...getCollapseProps()}>
          <div className="content">
            <div>{alarm.description}</div>
            <button className="mainButton" onClick={async (e) => await closeAlarm(alarm.id)}>Stäng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlarmIdentifier = ({ alarm }) => {

  let alarmID = "";

  if (alarm.refID.deviceID !== undefined) {
    alarmID = alarm.refID.deviceID;
  } else if (alarm.refID.functionID !== undefined) {
    alarmID = alarm.refID.functionID;
  }

  return (
    <strong>{alarmID}</strong>
  );
}

export default AlarmListCard;

