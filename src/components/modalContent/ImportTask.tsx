import useTaskContext from "../hooks/useTaskContext";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";
import { Button } from "@mui/material";

interface Props {
  taskListId: string;
  taskListName: string;
  setModalOpen: (arg0: boolean) => void
}

function ImportTask({ taskListId, taskListName, setModalOpen }: Props) {
  const { taskArray } = useTaskContext();
  const unincorporatedTasks = taskArray.getUnincorporatedTasks(taskListId);

  // console.log(unincorporatedTasks);
  const [selectedTasks, setSelectedTasks] = useState<
    {
      taskName: string;
      taskId: string;
    }[]
  >([]);

  const handleChange = (
    _e: React.SyntheticEvent<Element, Event>,
    newValue: {
      taskName: string;
      taskId: string;
    }[]
  ) => {
    console.log(_e, newValue);
    setSelectedTasks(newValue);
  };

  const addTasks = () => {
    selectedTasks.forEach((task) =>
      taskArray.addTaskListInstance(task.taskId, taskListName, taskListId)
    );
    setModalOpen(false)
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <>
      <Autocomplete
        multiple
        id="import-tasks"
        options={unincorporatedTasks}
        disableCloseOnSelect
        getOptionLabel={(option) => option.taskName}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.taskName}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.taskId === value.taskId}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="Tasks" placeholder="Add Tasks" />
        )}
        onChange={handleChange}
        // onInput={(e) => console.log(e)}
      />
      <Button
        variant="contained"
        style={{ height: "min-content" }}
        onClick={addTasks}
      >
        Ok
      </Button>
    </>
  );
}

export default ImportTask;
