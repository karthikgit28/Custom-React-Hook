import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hook/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading,error,sendRequest: fetchTasks} = useHttp();

  useEffect(() => {
    const useData = (applyData) => {
      const loadedTasks = [];
        for (const taskKey in applyData) {
          loadedTasks.push({ id: taskKey, text: applyData[taskKey].text });
        }
        setTasks(loadedTasks);
    };

    fetchTasks(
      {url: 'https://hook-e7e3b-default-rtdb.firebaseio.com/tasks.json'},
      useData
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
