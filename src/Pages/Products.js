import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import axios from 'axios';
import { variables } from '../Variable';


function Products(props) {
    const [DepartmentArr, setDepartmentArr] = useState([{}]);
    const [ProdId, setProdId] = useState(0);
    const [ProdName, setProdName] = useState("");
    const [ProdPrice, setProdPrice] = useState(0);
    const [UnitsInStock, setUnitsInStock] = useState(0);
    const [DepartmentId, setDepartmentId] = useState(0);
    const [Department, setDepartment] = useState(0);
    const modelName = 'Product';

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
    const getDepartment = async () => {
        await axios
            .get(variables.API_URL + 'Department/' + DepartmentId)
            .then((res) => {
                console.log(res);
                setDepartment(res?.data.Name);
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const getProductData = async () => {
        await axios
            .get(variables.API_URL + modelName + '/' + ProdId)
            .then((res) => {
                console.log(res);
                setProdId(res?.data.Id);
                setProdName(res?.data.Name)
                setProdPrice(res?.data.Price)
                setUnitsInStock(res?.data.InStock)
                setDepartmentId(res?.data.DepartmentId);
                getDepartment();
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
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };
    const updateProduct = async () => {
        let ProdObj = { Name: ProdName, Price: ProdPrice, InStock: UnitsInStock, DepartmentId: DepartmentId };
        await axios
            .put(variables.API_URL + modelName, ProdObj)
            .then((response) => {
                console.log(response?.data);
                alert(response?.data);
            })
            .catch((err) => {
                console.log(err);
                alert('Failed')
            });
    };

    useEffect(() => {
        setProdId({ props });
        //Runs only on the first render
        //get Department details:
        getDepartmentData();
        if ({ ProdId } != 0) {
            getProductData();
        }

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
                    <select className="form-select" value={Department} onChange={(e) => {
                        setDepartmentId(e.target.selectedOptions[0].value)
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
