import React from 'react';
import Form from 'react-awesome-form-validator';
import { isEmail } from 'validator';
import { Link } from 'react-router-dom';
import { authenticationTypes } from '../../types';

const SignInPage = ({ handleLogIn, signInResponse }) => (
  <div className="page sign-in">
    <h1>Sign Into Aleign</h1>

    {!signInResponse.success && (
      <p className="error">{signInResponse.message}</p>
    )}

    <Form onSubmit={formData => handleLogIn(formData)} >
      <Form.Input
        name="email"
        placeHolder=""
        label="Email Address"
        type="email"
        value=""
        fieldClassName="form-field"
        startValidatingWhenIsPristine
        validate={(value) => {
          let valid = true;
          let errorMessage = '';
          if (!value.length) {
            valid = false;
            errorMessage = 'This field is required';
          } else if (!isEmail(value.replace(/\s/g, ''))) {
            valid = false;
            errorMessage = 'You must enter a valid email';
          }
          return { valid, errorMessage };
        }}
      />

      <Form.Input
        name="password"
        placeHolder=""
        type="password"
        label="Password"
        fieldClassName="form-field"
        startValidatingWhenIsPristine
        validate={(value) => {
          let valid = true;
          let errorMessage = '';
          if (!value.length) {
            valid = false;
            errorMessage = 'This field is required';
          }
          return { valid, errorMessage };
        }}
      />

      <Form.CustomSubmitButton>
        <div className="form-field form-submit">
          <a className="button submit">Sign In</a>
        </div>
      </Form.CustomSubmitButton>

      <Link to="/forgot-password">Forgot Password</Link>

    </Form>
  </div>
);


SignInPage.propTypes = {
  handleLogIn: authenticationTypes.handleLogIn.isRequired,
  signInResponse: authenticationTypes.signInResponse.isRequired
};

export default SignInPage;
