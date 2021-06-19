// import axios from 'axios';
import { createContext, useState } from 'react';

const baseUrl = '/api/activity';

export const ActivityContext = createContext();

export const ActivityProvider = (props) => {
  const [activity, setActivity] = useState([]);

  const getAllActivity = () => new Promise((resolve, reject) => {
    fetch(`${baseUrl}`).then((res) => res.json())
      .then(setActivity);
  });

  const addActivity = (activityObj) => {
    fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityObj),
    }).then((res) => res.json());
  };
  return (
      <ActivityContext.Provider value= {{
        activity, getAllActivity, addActivity,
      }}>
          {props.children}
          </ActivityContext.Provider>
  );
};
