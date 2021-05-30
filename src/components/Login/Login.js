import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state, action)=>{
  if(action.type === 'EMAIL_VALUE'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'BLUR_SPACE'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passwordReducer=(state, action)=>{
  if(action.type === 'pass_value'){
    return {passwd: action.val , isValid: action.val.trim().length > 6}
  }
  if(action.type === 'no_passwd'){
    return {passwd: state.passwd , isValid: state.passwd.trim().length > 6}
  }
  return {passwd: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] = useReducer(emailReducer,{
    value:'',
    isValid: null
  })

  const [passwdState, dispatchPasswd] = useReducer(passwordReducer,{
    passwd:'',
    isValid: null
  })
  // useEffect(()=>{
  //   setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //   );
  // },[enteredEmail,enteredPassword])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'EMAIL_VALUE', val: event.target.value})

    setFormIsValid(
      emailState.isValid && passwdState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPasswd({type: 'pass_value', val: event.target.value})
    setFormIsValid(
      emailState.isValid && passwdState.isValid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'BLUR_SPACE'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPasswd({type: 'no_passwd'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwdState.passwd);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwdState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwdState.passwd}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
