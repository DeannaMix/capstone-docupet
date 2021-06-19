/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';
import { ActivityContext } from '../helpers/data/calander';

const ActivityRow = ({ activity }) => (
    <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-0" type="checkbox" defaultChecked={true} />
            <label className="todo-label" htmlFor="todo-0">
             <ul>
              <li>{activity.name}</li>
              </ul>
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Eat</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </li>
);

export default function Activities(props) {
  const { activity, getAllActivity, addActivity } = useContext(ActivityContext);

  const [name, setName] = useState({
    name: '',
  });

  const handleActivityChange = (e) => {
    const newActivity = { ...name };
    newActivity[e.target.id] = e.target.value;
    setName(newActivity);
  };

  const handleSave = () => {
    if (activity.name === '') {
      // eslint-disable-next-line no-alert
      window.alert('Cannot be left blank');
    } else {
      addActivity({
        name: name.name,
      });
      getAllActivity();
    }
  };

  useEffect(() => {
    getAllActivity();
  }, []);

  return (
    <div className="todoapp stack-large">
      <h1>Puppy Activities List</h1>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What does your puppy need to do daily?
          </label>
        </h2>
        <h6>
          Remember to add times to your activities and also keep in mind that puppies need 16-18 hours of sleep per day.
        </h6>
        <br></br>
        <h6>
          Recommended activities: Training. Play Time. Sleep Time. Socialization.
        </h6>
        <br></br>
        <br></br>
        <input
          type="text"
          id="name"
          onChange={
            handleActivityChange
          }
          className="input input__lg"
          name="text"
          autoComplete="off"
          placeholder="Activity"
        />
        <button type="submit" className="btn btn__primary btn__lg" onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}>
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
         tasks remaining
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
      {activity.map((a) => (
          <ActivityRow key={a.id} activity={a} />
      ))}

    </ul>
  </div>
  );
}
