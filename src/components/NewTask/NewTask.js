import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hook/use-http';

const NewTask = (props) => {

  const {isLoading,error,sendRequest: submitTask} = useHttp();

  const dataProcess = (taskText,taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);

  };
 
  const enterTaskHandler = async (taskText) => {
    submitTask({
      url: 'https://hook-e7e3b-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      },
    },dataProcess.bind(null,taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
