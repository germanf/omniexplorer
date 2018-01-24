import React from 'react';
import Form from 'react-awesome-form-validator';
import { isAlpha, isEmail } from 'validator';
import { authenticationTypes } from '../../types';

const SignUpPage = ({ handleSignUp, signUpResponse }) => (
  <div className="page sign-up">
    <h1>Complete the following to get started!</h1>

    {!signUpResponse.success && (
      <p className="error">{signUpResponse.message}</p>
    )}

    <Form
      onSubmit={formData => handleSignUp(formData)}
      serverErrors={signUpResponse.serverErrors}
    >
      <Form.Input
        name="name"
        placeHolder=""
        type="text"
        label="First & Last Name"
        fieldClassName="form-field"
        validate={(value) => {
          let valid = true;
          let errorMessage = '';
          if (!value.length) {
            valid = false;
            errorMessage = 'This field is required';
          } else if (!isAlpha(value.replace(/\s/g, ''))) {
            valid = false;
            errorMessage = 'You must enter only characters';
          }
          return { valid, errorMessage };
        }}
      />

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
          <a className="button submit">Sign Up</a>
        </div>
      </Form.CustomSubmitButton>

    </Form>
  </div>
);

SignUpPage.propTypes = {
  handleSignUp: React.PropTypes.func.isRequired,
  signUpResponse: authenticationTypes.signUpResponse.isRequired
};

export default SignUpPage;
