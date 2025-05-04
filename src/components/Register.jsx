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
    <div className="d-flex flex-column w-50 mx-auto text-center">
      <h1> Register </h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onBlur={handleEmail} required />
        <div style={{ color: "red" }}>{emailErrorMessage}</div>

        <label>Password</label>
        <input type="password" value={password} onChange={handlePassword} required />
        <div style={{ color: "red" }}>{passwordErrorMessage}</div>

        <label>Confirm Password</label>
        <input
          disabled={passwordErrorMessage && (!password || password.length < 6) ? true : false}
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          required
        />

        <div style={{ color: isSamePassword ? "green" : "red" }}>{confirmPasswordMessage}</div>
        <button type="submit" disabled={isSamePassword ? false : true}>Register</button>
      </form>
      <button className="w-50 mx-auto"onClick={goBack}>Back</button>
    </div>
  )
}

export default Register