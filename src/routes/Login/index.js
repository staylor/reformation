import React, { useState, useRef } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ThemeProvider } from 'pretty-lights';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Message from 'components/Form/Message';
import { TOKEN_KEY } from 'utils/constants';
import * as styles from './styled';

/* eslint-disable react/prop-types */

function Login({ data }) {
  const form = useRef(null);
  const params = useParams();
  const initialError =
    params.action === 'unauthorized' ? 'You must login to access this area.' : undefined;
  const [error, setError] = useState(initialError);

  const submitForm = e => {
    e.preventDefault();

    form.current.blur();

    const inputs = form.current.elements;

    if (!inputs.email.value || !inputs.password.value) {
      setError('All fields are required.');
    }

    fetch(`${data.settings.siteUrl}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email.value,
        password: inputs.password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        Cookies.set(TOKEN_KEY, responseData.token, { expires: 7, path: '/' });
        window.location.pathname = '/admin';
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const { loading, settings } = data;

  if (loading && !settings) {
    return null;
  }

  return (
    <ThemeProvider theme={{}}>
      <div className={styles.wrapperClass}>
        <div className={styles.contentClass}>
          <h1 className={styles.titleClass}>{settings.siteTitle}</h1>
          {error && <Message text={error} />}
          <form className={styles.formClass} method="post" ref={form} onSubmit={submitForm}>
            <label className={styles.labelClass} htmlFor="email">
              Email
              <input className={styles.inputClass} type="text" name="email" />
            </label>
            <label className={styles.labelClass} htmlFor="password">
              Password
              <input className={styles.inputClass} type="password" name="password" />
            </label>
            <button className={styles.buttonClass} type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default graphql(
  gql`
    query LoginQuery($id: String) {
      settings(id: $id) {
        ... on SiteSettings {
          siteTitle
          siteUrl
        }
      }
    }
  `,
  {
    options: {
      variables: { id: 'site' },
    },
  }
)(Login);
