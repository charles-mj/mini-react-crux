import './App.css';
import axios from 'axios'
import {useEffect, useState} from "react";

const CENTERS_URL = 'https://62452acb0e8dd89b543959ae.mockapi.io/cf/centers'
const USERS_URL = 'https://62452acb0e8dd89b543959ae.mockapi.io/cf/users'

const centerConfig = {
    url: CENTERS_URL,
    title: 'Centers List',
    columns: [ {
        header: 'ID',
        accessor: 'id',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Locality',
        accessor: 'locality',
    },
    {
        header: 'City',
        accessor: 'city',
    },
        {
        header: 'Status',
        accessor: 'status',
    },
     {
        header: 'Seller',
        accessor: 'seller',
    },
    ]
}

const userConfig = {
    url: USERS_URL,
    title: 'Users List',
    columns: [ {
        header: 'ID',
        accessor: 'id',
    },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Address',
            accessor: 'address',
        },
        {
            header: 'City',
            accessor: 'city',
        },
    ]
}

function ApiDataTable(props) {
    const {config} = props
    const {url, title, columns} = config
    const [data, setData] =  useState()
    const [loading, setLoading] = useState(false)

    const fetchCenters = () => {
        setLoading(true)
        axios.get(url).then((response) => {
            const {data = []} = response
            setData(data)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchCenters()
    }, [])

    const getRowData = (rows: any[] = []) => {
        const resultElements = rows.map((rowObject) => {
            return (
                <tr>
                    {
                        columns.map((column) => {
                            const {accessor} = column
                            return <td>{String( rowObject[accessor])}</td>
                        })
                    }
                </tr>
            )
        })

        return resultElements
    }

    return (
        <div className="App">
            <h2>{title}</h2>
            {
                loading ? ('Loading...') : (
                    <table>
                        <tr>
                            {
                                columns.map((column) => {
                                    const {header} = column
                                    return <th>{header}</th>
                                })
                            }
                        </tr>
                        {
                            getRowData(data)
                        }
                    </table>
                )
            }
        </div>
    );
}

// function CentersTable(props) {
//     const {url} = props
//
//     const [data, setData] =  useState()
//     const [loading, setLoading] = useState(false)
//
//     const fetchCenters = () => {
//         setLoading(true)
//         axios.get(url).then((response) => {
//             const {data = []} = response
//             setData(data)
//         }).catch((error) => {
//             console.log(error)
//         }).finally(() => {
//             setLoading(false)
//         })
//     }
//
//     useEffect(() => {
//         fetchCenters()
//     }, [])
//
//     const getRowData = (rows: any[] = []) => {
//         const resultElements = rows.map((value) => {
//             const { name, id, locality, city, status, seller} = value
//             return (
//                 <tr>
//                     <td>{Number(id)}</td>
//                     <td>{name}</td>
//                     <td>{locality}</td>
//                     <td>{city}</td>
//                     <td>{status ? 'ACTIVE' : 'INACTIVE'}</td>
//                     <td>{seller}</td>
//                 </tr>
//             )
//         })
//
//         return resultElements
//     }
//
//     return (
//         <div className="App">
//             {
//                 loading ? ('Loading...') : (
//                     <table>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>City</th>
//                             <th>Status</th>
//                             <th>Seller</th>
//                         </tr>
//                         {
//                             getRowData(data)
//                         }
//                     </table>
//                 )
//             }
//         </div>
//     );
// }


// function UsersTable() {
//     const [data, setData] =  useState()
//     const [loading, setLoading] = useState(false)
//
//     const fetchUsers = () => {
//         setLoading(true)
//         axios.get('https://62452acb0e8dd89b543959ae.mockapi.io/cf/users').then((response) => {
//             console.log("GOT SOME DATA HERE", {response})
//             const {data = []} = response
//
//             console.log("GOT SOME DATA HERE TOO", {data})
//
//             setData(data)
//         }).catch((error) => {
//             console.log(error)
//         }).finally(() => {
//             setLoading(false)
//         })
//     }
//
//     useEffect(() => {
//         fetchUsers()
//     }, [])
//
//     const getRowData = (rows: any[] = []) => {
//         const resultElements = rows.map((value) => {
//             const { name, id, address, city} = value
//             return (
//                 <tr>
//                     <td>{id}</td>
//                     <td>{name}</td>
//                     <td>{address}</td>
//                     <td>{city}</td>
//                 </tr>
//             )
//         })
//
//         return resultElements
//     }
//
//     return (
//         <div className="App">
//             {
//                 loading ? ('Loading...') : (
//                     <table>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Address</th>
//                             <th>City</th>
//                         </tr>
//                         {
//                             getRowData(data)
//                         }
//                     </table>
//                 )
//             }
//         </div>
//     );
// }

function App() {
    return <div>
        <ApiDataTable config={centerConfig} />
        <ApiDataTable config={userConfig} />
    </div>
}

export default App;
