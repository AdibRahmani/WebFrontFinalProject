import TaskItem from "./TaskItem";
import {useEffect, useState} from "react";

const axios = require('axios').default;


const TaskList = ({needReload, setNeedReload}) => {

    const [tasks, setTask] = useState([])
    console.log("reload")

    useEffect(() => {
        console.log("reload")
        axios({
            method: 'get',
            url: 'http://localhost:80/todo/read_all',
        })
            .then(function (response) {
                setTask(response.data.data)
                setNeedReload(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [needReload])

    return (
        <div className="task-list">
            <div className="title-h">
                <h2> Tasks</h2>
            </div>
            <div id="items">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (<TaskItem key={task.id} task={task} setNeedReload={setNeedReload}/>))
                ) : (
                    <pre>You have nothing to do.
                    Go get some sleep.</pre>
                )
                }
            </div>
        </div>
    )
}
export default TaskList
