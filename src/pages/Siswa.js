import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Toast } from "bootstrap";

export default function Siswa() {
    let [siswa, setSiswa] = useState([])
    let [idSiswa, setIdSiswa] = useState("")
    let [nis, setNis] = useState(0)
    let [nama, setNama] = useState("")
    let [kelas, setKelas] = useState("")
    let [poin, setPoin] = useState(0)
    let [image, setImage] = useState(null)
    let [action, setAction] = useState("")
    
    let [modal, setModal] = useState(null)
    let [message, setMessage] = useState("")
    let [upImg, setUpImg] = useState(true)
    
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // ambil data dari backend
    let getData= () => {
        let endpoint = `http://localhost:8080/siswa`

        axios.get(endpoint, authorization)
        .then(response => {
            // simpan ke state siswa
            setSiswa(response.data)
        })
        .catch(error => console.log(error))
    }

    // create function to show toast
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        // perintah untuk mengisi state
        setMessage(message)

        // show Toast
        myToast.show()
    }

    let tambahSiswa = () => {
        // open modal
        modal.show()

        // mengosongkan input-an
        setIdSiswa(0)
        setNis(0)
        setNama("")
        setKelas("")
        setPoin(0)
        setImage(null)
        setAction("insert")
        setUpImg(true)
    }

    let editSiswa = item => {
        // open modal
        modal.show()

        // mengisi inputan sesuai dengan data yang dipilih
        setIdSiswa(item.id_siswa)
        setNis(item.nis)
        setNama(item.nama)
        setKelas(item.kelas)
        setPoin(item.poin)
        setAction("edit")
        setImage(null)
        setUpImg(false)
    } 

    let simpanSiswa = ev => {
        ev.preventDefault()

        // close modal
        modal.hide()

        if (action === `insert`) {
            let endpoint = `http://localhost:8080/siswa`
            let request = new FormData()
            request.append(`nis`, nis)
            request.append('nama', nama)
            request.append('kelas', kelas)
            request.append('poin', poin)
            request.append('image', image)

            // sending data
            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        } else if (action === `edit`) { 
            let endpoint = `http://localhost:8080/siswa/${idSiswa}`
            let request = new FormData()
            request.append(`nis`, nis)
            request.append('nama', nama)
            request.append('kelas', kelas)
            request.append('poin', poin)
            request.append('image', image)

            // sending data
            if (upImg === true) {
                request.append(`image`, image)
            }
            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let hapusSiswa = item => {
        if (window.confirm(`Mau dihapus?`)) {
            let endpoint = `http://localhost:8080/siswa/${item.id_siswa}`

            // sending data
            axios.delete(endpoint, authorization)
            .then(response => {
                showToast(response.data.message)

                // refresh data
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let myModal = new Modal(document.getElementById("modal_siswa"))
        setModal(myModal)
        getData()
    }, [])

    return(
        <div className="container-fluid">

            {/** start component toast */}
            <div className="position-fixed top-0 end-0 p-3"
            style={{zIndex: 1}}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header bg-info text-white">
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/** end component toast */}

            <div className="card">
                <div className="card-header" style={{background: `midnightBlue`}}>
                    <h4 className=" fw-bolder text-center text-white">
                        Data Siswa XI RPL 4
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {siswa.map(item => (
                            <li className="list-group-item"
                            key={`key-${item.id_siswa}`}>
                                <div className="row">
                                    {/** buat gambar */}
                                    <div className="col-4">
                                        <img src={`http://localhost:8080/image/${item.image}`} alt="pelaku"
                                        style={{width: `250px`, height: `250px`, borderRadius: `50%`}}/>
                                    </div>
                                    {/** buat desc */}
                                    <div className="col-8">
                                        <small className="fst-italic"
                                        style={{color:`darkslategray`}}>Nama</small>
                                        <h5>{item.nama}</h5>
                                        <small className="fst-talic"
                                        style={{color:`darkslategray`}}>Kelas</small>
                                        <h5>{item.kelas}</h5>
                                        <small className="fst-italic"
                                        style={{color:`darkslategray`}}>Poin</small>
                                        <h5 className="text-danger">{item.poin}</h5>
                                        <small className="fst-italic"
                                        style={{color:`darkslategray`}}>Options</small>
                                        <br/>
                                        <button className="btn btn-warning btn-sm m-2"
                                        onClick={() => editSiswa(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm m-2"
                                        onClick={() => hapusSiswa(item)}>
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/** button tambah data siswa */}
                    <button className="btn btn-success"
                    onClick={() => tambahSiswa()}>
                        <span className="fa fa-plus"></span>Tambah
                    </button>

                    {/** modal form siswa */}
                    <div className="modal" id="modal_siswa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header"
                                style={{background:`slateBlue`}}>
                                    <h4 className="fw-bolder text-white">Form Siswa</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(ev) => simpanSiswa(ev)}>
                                        {/** input u/ nis */}
                                        NIS
                                        <input type="number" className="form-control mb-2"
                                        required
                                        value={nis} onChange={ev => setNis(ev.target.value)}/>
                                        
                                        {/** input u/ nama */}
                                        Nama
                                        <input type="text" className="form-control mb-2"
                                        required
                                        value={nama} onChange={ev => setNama(ev.target.value)}/>
                                        
                                        {/** input u/ kelas */}
                                        Kelas
                                        <input type="text" className="form-control mb-2"
                                        required
                                        value={kelas} onChange={ev => setKelas(ev.target.value)}/>
                                        
                                        {/** input u/ poin */}
                                        Poin
                                        <input type="number" className="form-control mb-2"
                                        required
                                        value={poin} onChange={ev => setPoin(ev.target.value)}/>

                                        {/** input u/ gambar */}
                                        Gambar
                                        <input type="file" 
                                        className = {`form-control mb-2 ${upImg ? ``: `d-none`}`} 
                                        required = {upImg}
                                        accept="image/*"
                                        onChange={ev => setImage(ev.target.files[0])} 
                                        />

                                        <button 
                                        type="button"
                                        className={`btn btn-dark btn-sm ${upImg ? `d-none`: ``}`}
                                        onClick={() => setUpImg(true)}>
                                            Click to re-upload image
                                        </button>

                                        <br/>

                                        {/** button for submit */}
                                        <button type="submit" className="btn btn-success">
                                            <span className="fa fa-check"></span> Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}