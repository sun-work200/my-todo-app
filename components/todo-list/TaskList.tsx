import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

interface TaskListProps {
  tasks: Task[];
  setTasks: (value: Task[]) => void;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem taskItem={item} tasks={tasks} setTasks={setTasks} />
      )}
    />
  );
}
