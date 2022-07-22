import { Link } from "react-router-dom";
import { Dropdown} from "bootstrap";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm bg-secondary navbar-dark m-3">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/Login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/pelanggaran">Pelanggaran</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/user">User</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/siswa">Siswa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/pelanggaran-siswa">AddDataPelanggaran</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/list-pelanggaran-siswa">ListDataPelanggaran</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}