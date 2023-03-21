import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { variables } from '../Variable';
import { useNavigate, useLocation } from "react-router-dom";



function Products(props) {
    const [DepartmentArr, setDepartmentArr] = useState([{}]);
    const [ProdId, setProdId] = useState(0);
    const [ProdName, setProdName] = useState("");
    const [ProdPrice, setProdPrice] = useState(0);
    const [UnitsInStock, setUnitsInStock] = useState(0);
    const [DepartmentId, setDepartmentId] = useState(0);
    const [DepartmentName, setDepartmentName] = useState("");
    const modelName = 'Product';
    const navigate = useNavigate();
    const location = useLocation();


    const getDepartmentData = async () => {
        await axios
            .get(variables.API_URL + 'Department')
            .then((res) => {
                console.log(res);
                setDepartmentArr(res?.data);
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const getDepartment = async (depId) => {
        //debugger
        await axios
            .get(variables.API_URL + 'Department/' + depId)
            .then((res) => {
                console.log(res);
                debugger
                setDepartmentName(res?.data[0].Name);
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const getProductData = async () => {
        //debugger
        //console.log(variables.API_URL + modelName + '/' + location.state.Id);
        await axios
            .get(variables.API_URL + modelName + '/' + location.state.Id)
            .then((res) => {
                console.log(res);
                setProdId(res?.data[0].Id);
                setProdName(res?.data[0].Name)
                setProdPrice(res?.data[0].Price)
                setUnitsInStock(res?.data[0].InStock)
                setDepartmentId(res?.data[0].DepartmentId);
                debugger
                getDepartment(res?.data[0].DepartmentId);
                //debugger
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const createProduct = async () => {
        let ProdObj = { Name: ProdName, Price: ProdPrice, InStock: UnitsInStock, DepartmentId: DepartmentId };
        await axios
            .post(variables.API_URL + modelName, ProdObj)
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
    const updateProduct = async () => {
        let ProdObj = { Id: ProdId, Name: ProdName, Price: ProdPrice, InStock: UnitsInStock, DepartmentId: DepartmentId };
        await axios
            .put(variables.API_URL + modelName + '/' + ProdId, ProdObj)
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

    useEffect(() => {
        getDepartmentData();
        //debugger
        if (location.state != null) {

            console.log(location.state.Id);

            if (location.state.Id != 0) {
                setProdId(location.state.Id);
                getProductData();
            }
        }
        //Runs only on the first render
        //get Department details:



    }, []);
    return (
        <div className="App">
            <div className="modal-body">
                <div className="input-group mb-3">
                    <span className="input-group-text">Product Name</span>
                    <input type="text" className="form-control" value={ProdName} onChange={(e) => { setProdName(e.target.value); }}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Product Price</span>
                    <input type="money" className="form-control" value={ProdPrice} onChange={(e) => { setProdPrice(e.target.value) }}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">UnitsInStock</span>
                    <input type="number" className="form-control" value={UnitsInStock} onChange={(e) => { setUnitsInStock(e.target.value) }}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Department</span>
                    <select className="form-select" value={DepartmentName} onChange={(e) => {
                        setDepartmentId(e.target.selectedOptions[0].value);
                        setDepartmentName(e.target.value);
                    }} >
                        {DepartmentArr.map(dep => {
                            return (<option value={dep.Id} key={dep.Id}>{dep.Name}</option>
                            )
                        })}
                    </select>
                </div>
                {ProdId == 0 ?
                    <button className="btn btn-primary float-start"
                        onClick={() => createProduct()}
                    >Create</button>
                    : null}
                {ProdId != 0 ?
                    <button className="btn btn-primary float-start"
                        onClick={() => updateProduct()}
                    >Update</button>
                    : null}
            </div>
        </div>
    );
}

export default Products;
