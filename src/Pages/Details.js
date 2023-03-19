import { useState, useEffect } from "react";
import axios from "axios";
import { variables } from '../Variable';
function Details() {
    const [DepartmentArr, setDepartmentArr] = useState([{}]);
    const [prodArr, setProdArr] = useState([{}]);

    const getDepartmentData = async () => {
        await axios
            .get(variables.API_URL + 'Department')
            .then((res) => {
                console.log(res);
                setDepartmentArr(res?.data);

            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getProductData = async () => {
        await axios
            .get(variables.API_URL + 'Product')
            .then((response) => {
                console.log(response);
                setProdArr(response?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const deleteClickDep = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios
                .delete(variables.API_URL + 'Department/' + id)
                .then((res) => {
                    console.log(res);
                    alert(res?.data);
                    getDepartmentData();

                })
                .catch((err) => {
                    console.log(err);
                });

        }
    }
    const deleteClickProd = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios
                .delete(variables.API_URL + 'Product/' + id)
                .then((res) => {
                    console.log(res);
                    alert(res?.data);
                    getProductData();

                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    useEffect(() => {
        //Runs only on the first render
        //get Department details:
        getDepartmentData();
        //get Product details:
        getProductData();


    }, []);
    return (
        <div className="App">
            <h4>details of Department:</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Department description</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {DepartmentArr.map((i) => {
                        return (
                            <tr key={i?.Id}>
                                <td>{i?.Id}</td>
                                <td>{i?.Name}</td>
                                <td>{i?.Description}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    &nbsp;
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => deleteClickDep(i.Id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4>details of Products:</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Units in Stock</th>
                        <th>Product Department Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {prodArr.map((i) => {
                        return (
                            <tr key={i?.Id}>
                                <td>{i?.Id}</td>
                                <td>{i?.Name}</td>
                                <td>{i?.Price}</td>
                                <td>{i?.InStock}</td>
                                <td>{i?.DepartmentId}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    &nbsp;
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => deleteClickProd(i.Id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Details;
