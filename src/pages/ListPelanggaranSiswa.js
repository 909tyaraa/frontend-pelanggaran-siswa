import { useState, useEffect } from "react";
import axios from "axios";
export default function ListPelanggaranSiswa() {
    if (!localStorage.getItem(`token-pelanggaran`))
    window.local.href = "/login"
    
    let [list, setList] = useState([])

    let token = localStorage.getItem("token-pelanggaran")
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8080/pelanggaran_siswa`

        /** sending data */
        axios.get(endpoint, authorization)
            .then(result => {
                setList(result.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                    style={{ background: `black` }}>
                    <h4 className=" fw-bolder text-center text-header"
                        style={{ color: `yellow` }}>
                        ⚡ List Pelanggaran Siswa ⚡
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {list.map(item => (
                            <li
                                className="list-group-item"
                                key={`idPS$(item.id_pelanggaran_siswa)`}>
                                <div className="row">
                                    <div className="col-4">
                                        <small>Nama Siswa</small>
                                        <h5>{item.siswa.nama} ({item.siswa.kelas})</h5>
                                    </div>
                                    <div className="col-2">
                                        <small>Poin Siswa</small>
                                        <h5>{item.siswa.poin}</h5>
                                    </div>
                                    <div className="col-4">
                                        <small>Waktu Pelanggaran</small>
                                        <h5>{item.waktu}</h5>
                                    </div>
                                </div>
                                <h4>Detail Pelanggaran</h4>
                                {item.detail_pelanggaran_siswa.map(detail => (
                                    <h6
                                    key= {`idDetail$(detail.id_pelanggaran)`}>
                                        {detail.pelanggaran.nama_pelanggaran}
                                    </h6>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}