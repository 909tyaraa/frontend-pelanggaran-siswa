import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
// import { Alert } from "bootstrap";
import { Modal } from "bootstrap";

export default function User() {
    let [user, setUser] = useState([])
    let [modal, setModal] = useState(null)

    let [idUser, setIdUser] = useState(0)
    let [nama, setNama] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [action, setAction] = useState("")
    let [message, setMessage] = useState("")

    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8000/user`

        axios.get(endpoint, authorization)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => console.log(error))
    }

    /** create function to show Toast */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah untuk mengisi state 'message' */
        setMessage(message)
        /** tampilkan toast */
        myToast.show()
    }


    // let showAlert = message => {
    //     let myAlert = new Alert(
    //         document.getElementById(`myAlert`),
    //         {
    //             autohide: true
    //         }
    //     )
    //     setMessage(message)
    //     myAlert.show()
    // }

    let addUser = () => {
        modal.show()
        setIdUser(0)
        setNama("")
        setUsername("")
        setPassword("")
        setAction("insert")
    }

    let editUser = item => {
        modal.show()

        setIdUser(item.id_user)
        setNama(item.nama_user)
        setUsername(item.username)
        setPassword(item.password)
        setAction('edit')
    }

    let saveUser = ev => {
        modal.hide()

        if (action === `insert`) {
            let endpoint = `http://localhost:8000/user`
            let request = {
                nama_user: nama,
                username: username,
                password: password
            }

            axios.post(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    getData()
                })
                .catch(error => console.log(error))
        } else if (action === `edit`) {
            let endpoint = `http://localhost:8000/user/${idUser}`
            let request = {
                nama_user: nama,
                username: username,
                password: password
            }

            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let deleteUser = item => {
        if (window.confirm(`Are you sure ?`)) {
            let endpoint = `http://localhost:8000/user/${item.id_user}`

            axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    // var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    // var alertTrigger = document.getElementById('liveAlertBtn')

    // function alert(message, type) {
    //     var wrapper = document.createElement('div')
    //     wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-coreui-dismiss="alert" aria-label="Close"></button></div>'

    //     alertPlaceholder.append(wrapper)
    // }

    // if (alertTrigger) {
    //     alertTrigger.addEventListener('click', function () {
    //         alert('Nice, you triggered this alert message!', 'success')
    //     })
    // }

    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modal_user")
        )
        setModal(myModal)
        getData()
    }, [])

    return (
        <div className="container-fluid">

            {/* Start Toast Component */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header text-white" style={{ background: `teal` }}>
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* End Toast Component */}

            <div className="card m-3">
                <div className="card-header text-center" style={{ background: `midnightBlue` }}>
                    <h3 className="fw-bolder" style={{ color: `yellow` }}>
                    🌕 Daftar User 🌕
                    </h3>
                </div>
                <div className="card-body" style={{ background: `lightSteelBlue` }}>
                    <ul className="list-group">
                        {user.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `yellow` }}>
                                        ✨ Id User
                                        </small>
                                        <h5>{item.id_user}</h5>
                                    </div>
                                    <div className="col-lg-4">
                                        <small className="fst-italic" style={{ color: `yellow` }}>
                                        ✨ Nama User
                                        </small>
                                        <h5>{item.nama_user}</h5>
                                    </div>
                                    <div className="col-lg-4">
                                        <small className="fst-italic" style={{ color: `yellow` }}>
                                        ✨ Username
                                        </small>
                                        <h5>{item.username}</h5>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `yellow` }}>
                                        ✨ Option
                                        </small>
                                        <br />
                                        <button className="btn btn-sm btn-info mx-1"
                                        onClick={() => editUser(item)}>
                                            <span className="fa fa-edit"></span> Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger mx-1"
                                        onClick={() => deleteUser(item)}>
                                            <span className="fa fa-trash"></span> Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* button add user */}
                    <button className="btn btn-sm btn-success my-3"
                        onClick={() => addUser()}>
                        <span className="fa fa-plus"></span>
                        Add User
                    </button>

                    {/* modal add user */}
                    <div className="modal" id="modal_user">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: `lightcyan`, color: 'teal' }}>
                                    <h4>
                                        Form User
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(ev) => saveUser(ev)}>
                                        Name
                                        <input type="text" className="form-control mb-2" required
                                            value={nama} onChange={ev => setNama(ev.target.value)} />

                                        Username
                                        <input type="text" className="form-control mb-2" required
                                            value={username} onChange={ev => setUsername(ev.target.value)} />

                                        Password
                                        <input type="password" className="form-control mb-2" required
                                            value={password} onChange={ev => setPassword(ev.target.value)} />

                                        <button className="btn btn-success mx-1" type="submit">
                                            <span className="fa fa-check"></span> Save
                                        </button>
                                        <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">
                                            <span className="fa fa-times"></span> Cancel
                                        </button>

                                        {/* <div id="liveAlertPlaceholder"></div>
                                        <button type="button" class="btn btn-primary" id="liveAlertBtn">Show live alert</button> */}
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end of modal */}

                </div>
            </div>
        </div>
    )
}