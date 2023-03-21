import { useEffect, useState } from "react";
import axios from "axios";
import { variables } from '../Variable';
import { useNavigate, useLocation } from "react-router-dom";


function Department(props) {
    const [DepartmentId, setDepartmentId] = useState(0);
    const [DepartmentName, setDepartmentName] = useState("");
    const [DepartmentDesc, setDepartmentDesc] = useState("");
    const modelName = 'Department';
    const navigate = useNavigate();
    const location = useLocation();

    const createDepartment = async () => {
        let depObj = { Name: DepartmentName, Description: DepartmentDesc };
        await axios
            .post(variables.API_URL + modelName, depObj)
            .then((response) => {
                console.log(response?.data);
                alert(response?.data);
                if (response) navigate('/Details');
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const updateDepartment = async () => {
        let depObj = { Id: DepartmentId, Name: DepartmentName, Description: DepartmentDesc };
        await axios
            .put(variables.API_URL + modelName + '/' + DepartmentId, depObj)
            .then((response) => {
                console.log(response?.data);
                alert(response?.data);
                if (response) navigate('/Details');
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const getDepartment = async () => {
        //debugger
        await axios
            .get(variables.API_URL + 'Department/' + location.state.Id)
            .then((res) => {
                console.log(res?.data[0].Name + ' ' + res?.data.Description);
                setDepartmentId(res?.data[0].Id)
                setDepartmentName(res?.data[0].Name);
                setDepartmentDesc(res?.data[0].Description);
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };

    const setstt = async () => {
        // debugger
        await setDepartmentId(location.state.Id);
    };
    useEffect(() => {
        //debugger
        if (location.state != null) {
            //Runs only on the first render
            console.log('Id:' + location.state.Id);

            if (location.state.Id != 0) {
                setstt();
                //setDepartmentId(location.state.Id);
                console.log('DepartmentId:' + DepartmentId);

                getDepartment();

            }
        }


    }, []);

    return (
        <div className="App">
            <div className="modal-body">
                <div className="input-group mb-3">
                    <span className="input-group-text">Department Name</span>
                    <input type="text" className="form-control" value={DepartmentName} required onChange={(e) => { setDepartmentName(e.target.value) }}></input>
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
