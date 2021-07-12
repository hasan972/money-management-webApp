import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {}
    }
    //Handel the onChange event
    changeHandler = event => {
        this.setState({
            [event.target.name]: [event.target.value]
        })
    }
    submitHandler = event => {
        event.preventDefault()
    }

    render() {
        let { email, password } = this.state
        return (
            <div className='row'>
                <div className='col-md-6 offset-md-3 '>
                    <h1 className='text-center display-3'>Login Form</h1>
                    <form onSubmit={this.submitHandler}>
                        <div className='form-group m-3'>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Enter the email..'
                                name='email'
                                id='email'
                                value={email}
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div className='form-group m-3'>
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Enter the Password..'
                                name='password'
                                id='password'
                                value={password}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <Link to='/register' className='text-decoration-none m-3'>You Don't Have Account? Register Here</Link>
                        <button className='btn btn-success m-3 my-3 d-block'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login
