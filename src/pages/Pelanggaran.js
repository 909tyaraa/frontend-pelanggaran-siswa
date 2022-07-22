import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function Pelanggaran() {
    let [pelanggaran, setPelanggaran] = useState([])
    let [message, setMessage] = useState("")
    
    let [idPelanggaran, setIdPelanggaran] = useState(0)
    let [namaPelanggaran, setNamaPelanggaran] = useState("")
    let [poin, setPoin] = useState(0)
    let [action, setAction] = useState("")

    let [modal, setModal] = useState(null)

    // proses get token from local storage
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
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

    // create function to get data pelanggaran from backend
    let getData = () => {
        /**
         * proses inisiasi data pelanggaran
         * endpoint = http://localhost:8000/pelanggaran
         * method = get
         * request = NONE
         * response = array data pelanggaran
         * authorization = Bearer Token
         */
        let endpoint = `http://localhost:8080/pelanggaran`

        // sending data
        axios.get(endpoint, authorization)
            .then(response => {
                // simpan di state pelanggaran
                setPelanggaran(response.data)

                /**call showToast */
                // showToast(`Data pelanggaran berhasil dimuat`)
            })
            .catch(error => console.log(error))
    }

    let addData = () => {
        /** Show Modal */
        modal.show()

        /**mengosongkan inputan form */
        setIdPelanggaran(0)
        setNamaPelanggaran("")
        setPoin(0)
        setAction('insert')
    }

    let editData = item => {
        /** show modal */
        modal.show()

        /** isi form sesuai data yang dipilih */
        setIdPelanggaran(item.id_pelanggaran)
        setNamaPelanggaran(item.nama_pelanggaran)
        setPoin(item.poin)
        setAction('edit')
    }

    let simpanData = event => {
        event.preventDefault()

        // close modal
        modal.hide()
        
        if (action === 'insert') {
            let endpoint = `http://localhost:8000/pelanggaran`
            let request = {
                nama_pelanggaran : namaPelanggaran,
                poin : poin
            }

            /** send data */
            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                // refresh data pelanggaran
                getData()
            })
            .catch(error => console.log(error))
        } else if (action === 'edit') {
            let endpoint = `http://localhost:8000/pelanggaran/${idPelanggaran}`
            let request = {
                nama_pelanggaran: namaPelanggaran,
                poin : poin
            }

            /** sending data untuk update data pelanggaran */
            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data */
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let deleteData = item => {
        if (window.confirm(`Are you sure want to delete?`)) {
            let endpoint = `http://localhost:8080/pelanggaran/${item.id_pelanggaran}`

            // sending data
            axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data */
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let modal = new Modal(document.getElementById(`modal_pelanggaran`))
        setModal(modal)
        getData()
    }, [])

    return (
        <div className="container-fluid">

            {/* Start Toast Comp */}
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
                <div className="card-header" style={{ background: `black` }}>
                    <h3 className="fw-bolder text-center" style={{ color: `yellow` }}>
                    ☣ Daftar Jenis Pelanggaran ☣
                    </h3>
                </div>
                <div className="card-body" style={{ background: `lightSlateGray` }}>
                    <ul className="list-group">
                        {pelanggaran.map(item => (
                            <li className="list-group-item">
                                <div className="row" >
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `pale` }}>
                                            ID Pelanggaran
                                        </small>
                                        <h5>{item.id_pelanggaran}</h5>
                                    </div>
                                    <div className="col-lg-6">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Nama Pelanggaran
                                        </small>
                                        <h5>{item.nama_pelanggaran}</h5>
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="fst-italic" style={{ color: `teal` }}>
                                            Poin
                                        </small>
                                        <h5>
                                            <span class="badge text-danger" style={{ background: `lightblue` }}>
                                                {item.poin}
                                            </span>
                                        </h5>
                                    </div>
                                    <div className="col-lg-2">  
                                            <small className="fst-italic text-center" style={{ color: `teal` }}>
                                                Option
                                            </small>
                                            <br/>
                                            <button className="btn btn-sm btn-info mx-1"
                                            onClick={() => editData(item)}>
                                                <span className="fa fa-edit"></span> Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger mx-1"
                                            onClick={() => deleteData(item)}>
                                                <span className="fa fa-trash"></span> Delete
                                            </button>  
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* button add data */}
                    <button className="btn btn-sm btn-warning my-3"
                    onClick={() => addData()}>
                        <span className="fa fa-plus"></span> 
                        Add Data
                    </button>

                    {/* create modal yg isinya form tambah data pelanggaran */}
                    <div className="modal" id="modal_pelanggaran">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header" style={{background: `slateBlue`}}>
                                    <h4 style={{color: `mistyRose`}}>
                                        Add Pelanggaran
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => simpanData(ev)}>
                                        Jenis Pelanggaran
                                        <input type="text" className="form-control mb-2" required 
                                        onChange={e => setNamaPelanggaran(e.target.value)}
                                        value={namaPelanggaran}/>
                                        Poin
                                        <input type="number" className="form-control mb-2" required 
                                        onChange={e => setPoin(e.target.value)}
                                        value={poin}/>

                                        <button className="btn btn-success text-white mx-1" type="submit">
                                            <span className="fa fa-check mx-1"></span> Submit
                                        </button>
                                        <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">
                                            <span className="fa fa-times"></span> Cancel
                                        </button>
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