import { useState, useEffect } from "react"
import axios from "axios"
export default function PelanggaranSiswa() {
    let [siswa, setSiswa] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])
    let [selectedSiswa, setSelectedSiswa] = useState("")
    let [selectedDate, setSelectedDate] = useState("")
    let [selectedPelanggaran, setSelectedPelanggaran] = useState([])


    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getSiswa = () => {
        let endpoint = `http://localhost:8080/siswa`
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state siswa
                setSiswa(result.data)
            })
            .catch(error => console.log(error))
    }

    let getPelanggaran = () => {
        let endpoint = `http://localhost:8080/pelanggaran`
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state pelanggaran
                setPelanggaran(result.data)
            })
            .catch(error => console.log(error))
    }

    let addPelanggaran = (id_pelanggaran) => {
        // cek keberadaan id_pelanggaran di dalam
        // selected pelanggaran
        let temp = [...selectedPelanggaran]
        let found = temp.find(
            item => item.id_pelanggaran === id_pelanggaran
        )

        // jika ditemukan data yang sama,  maka dihapus
        //jika tidak ditemukan , maka ditambahkan
        if (found) {
            let index = temp.findIndex(
                item => item.id_pelanggaran === id_pelanggaran
            )
            temp.splice(index, 1)
        } else {
            // memasukkan id pelanggaran yang dipilih
            //ke selectedPelanggaran
            temp.push({
                id_pelanggaran: id_pelanggaran
            })

        }
        setSelectedPelanggaran(temp)
    }

    let simpanPelanggaranSiswa = () => {
        if(window.confirm(`yakin nich?`)){
            let user =JSON.parse(localStorage.getItem(`user-pelanggaran`))
        let id = user.id_user

        let endpoint = `http://localhost:8080/pelanggaran_siswa`
        let request = {
            waktu: selectedDate,
            id_user: id,
            id_siswa: selectedSiswa,
            detail_pelanggaran_siswa: selectedPelanggaran
        }

        /** sending data */
        axios.post(endpoint, request, authorization)
            .then(result => {
                alert(result.data.message)
            })
            .catch(error => console.log(error))
        // ambil dulu id user dari local storage
        
        }
        
    }
    useEffect(() => {
        getSiswa()
        getPelanggaran()
    }, [])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                    style={{ background: 'black' }}>
                    <h4 className=" fw-border text-center"
                    style={{color:`yellow`}}>
                        ☢ Form Pelanggaran Siswa ☢
                    </h4>

                </div>

                <div className="card-body" style={{ background: `lightSlateGray` }}>
                    <div className="row">
                        <div className=" fw-bolder col-2"
                        style={{color:`yellow`}}>
                            💣 Pilih Siswa
                        </div>
                        <div className="col-10">
                            <select className="form-control"
                                onChange={ev => setSelectedSiswa(ev.target.value)}
                                value={selectedSiswa}>
                                <option value="">
                                    --- List Siswa ---
                                </option>
                                {siswa.map(item => (
                                    <option
                                        value={item.id_siswa}
                                        key={`key${item.id_siswa}`}>
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className=" fw-bolder col-2 my-2 "
                        style={{color:`yellow`}}>
                            💣 Tanggal Pelanggaran
                        </div>
                        <div className="col-10 my-2">
                            <input type="date"
                                className="form-control"
                                onChange={ev => setSelectedDate(ev.target.value)}
                                value={selectedDate} />
                        </div>
                        <div className=" fw-bolder col-2 my-2 "
                        style={{color:`yellow`}}>
                            💣 Pilih Pelanggaran
                        </div>
                        <div className="col-10 my-2"
                        style={{color:`yellow`}}>
                            {pelanggaran.map(item => (
                                <div
                                    key={`ppp${item.id_pelanggaran}`}
                                >
                                    <input
                                        className="me-2"
                                        type={"checkbox"}
                                        value={item.id_pelanggaran}
                                        onClick={() => addPelanggaran(item.id_pelanggaran)}
                                    />
                                    {item.nama_pelanggaran}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="btn btn-warning"
                        onClick={() => simpanPelanggaranSiswa()}>
                        <span className="fa fa-check"></span> Simpan
                    </button>

                    {/* isi dari selected Siswa: {selectedSiswa} <br />
                    isi dari selected Date: {selectedDate} <br />
                    isi dari selected Pelanggaran: {selectedPelanggaran.map(item => `${item.id_pelanggaran}`,)} */}
                </div>
            </div>
        </div>
    )
}