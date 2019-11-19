/// external modules ///
import React from 'react';
import axios from 'axios';
import { withFormik , Form , Field } from 'formik';
import * as Yup from 'yup';

/// internal modules ///
import Card from '../generics/cards/Card';
import CardHead from '../generics/cards/CardHead';
import CardBody from '../generics/cards/CardBody';
import CardFoot from '../generics/cards/CardFoot';
import FormItem from '../generics/forms/FormItem';

/***************************************
  COMPONENT
***************************************/
const UserSignUpForm = (props) => {
  return (
    <Card>
      <Form className='user-sign-up'>
        <FormItem {...props} name='username'>
          <Field type='text' name='username' placeholder='Username'/>
        </FormItem>
        <FormItem {...props} name='email'>
          <Field type='email' name='email' placeholder='Email'/>
        </FormItem>
        <FormItem {...props} name='password'>
          <Field type='password' name='password' placeholder='Password'/>
        </FormItem>
        {/* <FormItem {...props} name='tos'>
          <Field type='checkbox' name='tos' checked={props.values.tos}/>
          <label htmlFor="tos">I accept the <a href="#">Terms of Service</a>.</label>
        </FormItem> */}
        <FormItem {...props} name='submit'>
          <button type='submit' name='submit'>Submit</button>
        </FormItem>
      </Form>
    </Card>
  );
};

const FormikUserSignUpForm = withFormik ({
  mapPropsToValues : (values) => ({
    'username' : values.username || init.username.default,
    'email' : values.email || init.email.default,
    'password' : values.password || init.password.default,
    /* 'tos' : values.tos || init.tos.default, */
  }),
  validationSchema : Yup.object ().shape ({
    'username' : Yup.string ()
      .required ('You must provide your username.')
      .trim (),
    'email' : Yup.string ()
      .required ('You must provide your email.')
      .email ('That email address is not valid.'),
    'password' : Yup.string ()
      .required ('You must provide a password.')
      .min (init.password.min_length, `Your password must be no less than ${init.password.min_length} characters long.`)
      .max (init.password.max_length, `Your password must be no more than ${init.password.max_length} characters long.`),
    /*
    'tos' : Yup.boolean ()
      .required ('You must choose whether to accept the Terms of Service.')
      .oneOf ([true] , 'You must accept the Terms of Service.'),
    */
  }),
  handleSubmit : (values, setSubmitting) => {
    axios
      .post('https://only-salty-hackers.herokuapp.com/api/register/', values)
      .then(res => {
        console.log ('--- success! ---')
        console.log('response', res)
        sessionStorage.setItem(res.data.token, res.data);
        console.log(sessionStorage)
      })
      .catch(er => {
        console.log ('--- failure! ---')
        console.log(er)
      })
  }
}) (UserSignUpForm);

/**************************************/
export default FormikUserSignUpForm;
