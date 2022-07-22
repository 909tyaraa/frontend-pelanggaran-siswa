import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
// axios = digunakan untuk proses transfer data dari frotend ke backend

export default function Login(){
    // define state to store username and password
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let loginProcess = ev => {
        ev.preventDefault() //mencegah reload halaman
        // akses ke backend untuk proses login
        /** method: POST 
         *  endpoint: http://localhost:8000/user/auth
         *  request: username and password
         *  response: logged and token
         */
        let request = {
            username: username,
            password: password
        }

        let endpoint = `http://localhost:8080/user/auth`

        // sending data
        axios.post(endpoint, request)
        .then(response => {
            if (response.data.logged == true) {
                let token = response.data.token
                // penempatan token ke Local Storage Browser
                localStorage.setItem(`token-pelanggaran`, token)
                let dataUser =JSON.stringify(response.data.dataUser)
                localStorage.setItem(`user-pelanggaran`, dataUser)
                alert(`Welcome !`)
            } else {
                alert(response.data.message)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
  
    return(

        <div className='container' >
            <div className="col-lg-5 mx-auto my-5">
            <div className="card" >
                <div className="card-header" style={{background: `powderBlue`}}>
                    <h4 className="fw-bolder text-center"
                    style={{color:`yellow`}}>
                        ⛅ Sign In ⛅
                    </h4>
                </div>
                <div className="card-body" style={{background: `lightSteelBlue`}}>
                    <form onSubmit={ev => loginProcess(ev)}>
                        <h6 className='fw-bolder'
                        style={{color:`yellow`}}> ☁  Username</h6>
                        <input type={`text`} className="form-control mb-2" required
                        value={username} onChange={(ev) => setUsername(ev.target.value)}/>

                        <h6 className='fw-bolder'
                        style={{color:`yellow`}}> ☁  Password</h6>
                        <input type={`password`} className="form-control mb-2" required
                        value={password} onChange={(ev) => setPassword(ev.target.value)}/>

                        <button type="submit" className="btn btn-warning">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>  
        </div>     
    )
}