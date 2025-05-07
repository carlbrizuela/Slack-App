import axios from "axios"
import { useState } from "react"
import { API_URL } from "../constants/Constants"
import { useNavigate } from "react-router"

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSamePassword, setIsSamePassword] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')
  const navigate = useNavigate()


  const handleEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
    setEmailErrorMessage('')
  }

  const handlePassword = (e) => {
    e.preventDefault()
    setConfirmPassword('')
    setConfirmPasswordMessage('')
    setIsSamePassword(false)
    setPassword(e.target.value)
    const tempPassword = e.target.value
    if (tempPassword.length < 6) {
      setPasswordErrorMessage("Password should be minimium 6 characters")
    } else {
      setPasswordErrorMessage('')
    }
  }


  const handleConfirmPassword = (e) => {
    e.preventDefault()
    setConfirmPassword(e.target.value)
    setConfirmPasswordMessage('')
    const tempConfirmPassword = e.target.value
    if (tempConfirmPassword === password) {
      setIsSamePassword(true)
      setConfirmPasswordMessage('Password matches')
    } else {
      setIsSamePassword(false)
      setConfirmPasswordMessage('Password does not match')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const requestBody = {
        email,
        password,
        confirmPassword
      }
      await axios.post(`${API_URL}/auth`, requestBody)
      navigate('/login')
    } catch (error) {
      setEmailErrorMessage(`Email ${error.response.data.errors.email}`)
      setPassword('')
      setConfirmPassword('')
      setConfirmPasswordMessage('')
      setIsSamePassword(false)
    }
  }

  const goBack = () => {
    navigate("/login")
  }
  return (
    <div className="w-100 d-flex flex-column mx-auto align-items-center">
      <div className="input-form">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input className="form-control" placeholder="name@example.com" type="email" onChange={handleEmail} required />
            <label>Email</label>
          </div>
          <div className="mt-1 mb-3 small" style={{ color: "red" }}>{emailErrorMessage}</div>
          <div className="form-floating">
            <input className="form-control" placeholder="Password" type="password" value={password} onChange={handlePassword} required />
            <label>Password</label>
          </div>
          <div className="mt-1 mb-3 small" style={{ color: "red" }}>{passwordErrorMessage}</div>

          <div className="form-floating">
            <input
              className="form-control"
              placeholder="Confirm Password"
              disabled={passwordErrorMessage && (!password || password.length < 6) ? true : false}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
            />
            <label>Confirm Password</label>
          </div>
          <div className="mt-1 mb-3 small" style={{ color: isSamePassword ? "green" : "red" }}>{confirmPasswordMessage}</div>
          <button className="btn btn-primary w-100 mt-1" type="submit" disabled={isSamePassword ? false : true}>Register</button>
        </form>
      </div>
      <div className="mt-3">
        <p className="mt-0">
          Already have an account?
          <span id="register-button" onClick={goBack} className="fw-bold"> Login </span>
        </p>
      </div>
    </div>
  )
}

export default Register