// TaskList.js
import React,{useState,useCallback,useEffect} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const TaskList = ({ data }) => {
  const [tasks, setTasks] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      const newTasks = [
        { id: tasks.length + 1, title: `Task ${tasks.length + 1}` },
        { id: tasks.length + 2, title: `Task ${tasks.length + 2}` },
      ];
      setTasks((prevTasks) => [...prevTasks, ...newTasks]);
      setHasMore(newTasks.length > 0);
      setLoading(false);
    }, 1000);
  }, [loading, hasMore, tasks.length]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreData();
    }
  }, [inView, hasMore, fetchMoreData]);

  if (!tasks || tasks.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.title} />
        </ListItem>
      ))}
      {loading && (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )}
      <div ref={ref} />
    </List>
  );
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

TaskList.defaultProps = {
  data: [],
};

export default TaskList;
