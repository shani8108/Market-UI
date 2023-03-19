import { useState } from "react";
import axios from "axios";
import { variables } from '../Variable';

function Department(props) {
    const [DepartmentId, setDepartmentId] = useState(0);
    const [DepartmentName, setDepartmentName] = useState("");
    const [DepartmentDesc, setDepartmentDesc] = useState("");
    const modelName = 'Department';

    const createDepartment = async () => {
        let depObj = { Name: DepartmentName, Description: DepartmentDesc };
        await axios
            .post(variables.API_URL + modelName, depObj)
            .then((response) => {
                console.log(response?.data);
                alert(response?.data);
                //if (response) navigate('/Details');
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const updateDepartment = async () => {
        let depObj = { Id: DepartmentId, Name: DepartmentName, Description: DepartmentDesc };
        await axios
            .put(variables.API_URL + modelName, depObj)
            .then((response) => {
                console.log(response?.data);
                alert(response?.data);
                //if (response) navigate('/Details');
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };

    return (
        <div className="App">
            <div className="modal-body">
                <div className="input-group mb-3">
                    <span className="input-group-text">Department Name</span>
                    <input type="text" className="form-control" value={DepartmentName} onChange={(e) => { setDepartmentName(e.target.value) }}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Department Discription</span>
                    <input type="text" className="form-control" value={DepartmentDesc} onChange={(e) => { setDepartmentDesc(e.target.value) }}></input>
                </div>
                {DepartmentId == 0 ?
                    <button className="btn btn-primary float-start"
                        onClick={() => createDepartment()}
                    >Create</button>
                    : null}
                {DepartmentId != 0 ?
                    <button className="btn btn-primary float-start"
                        onClick={() => updateDepartment()}
                    >Update</button>
                    : null}
            </div>

        </div>
    );
}

export default Department;
