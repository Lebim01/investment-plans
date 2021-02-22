import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { addUser } from 'src/redux/actions/users'
import { useDispatch, useSelector } from 'react-redux'

const Register = (props) => {
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const dispatch = useDispatch()

  const _addUser = useSelector(state => {
    return (username, password) => {
      let exists = state.users.users.find(u => u.username === username)
      if(exists)
        return false;

      dispatch(addUser({
        username,
        password
      }))
      return true;
    }
  })

  const change = (e, save) => {
    save(e.target.value)
  }

  const create = () => {
    try {
      setError('')

      if(!username) throw Error('Favor de llenar el campo Username')
      if(!password) throw Error('Favor de llenar el campo Password')
      if(password !== repeatPassword) throw Error('Las conatraseñas no coinciden')

      if(_addUser(username, password)){
        props.history.push('/login?message=Usuario registrado')
      }else{
        throw Error('Este usuario ya existe')
      }
    }catch(err){
      setError(err.toString())
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  { error && <CAlert color="danger">{error}</CAlert> }
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" autoComplete="username" onChange={(e) => change(e, setUsername)} value={username} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" onChange={(e) => change(e, setPassword)} value={password} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Repeat password" autoComplete="new-password" onChange={(e) => change(e, setRepeatPassword)} value={repeatPassword} />
                  </CInputGroup>
                  <CButton color="success" block onClick={create}>Create Account</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register