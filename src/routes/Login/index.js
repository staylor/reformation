import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ThemeProvider } from 'pretty-lights';
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import Message from 'components/Form/Message';
import { TOKEN_KEY } from 'utils/constants';
import * as styles from './styled';

/* eslint-disable react/prop-types */

@graphql(
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
)
class Login extends Component {
  state = {};

  static getDerivedStateFromProps(nextProps) {
    const {
      match: { params },
    } = nextProps;

    if (params.action) {
      switch (params.action) {
        case 'unauthorized':
          return { error: 'You must login to access this area.' };
        default:
          break;
      }
    }
    return null;
  }

  submitForm = e => {
    e.preventDefault();

    this.form.blur();

    const inputs = this.form.elements;

    if (!inputs.email.value || !inputs.password.value) {
      this.setState({ error: 'All fields are required.' });
    }

    fetch(`${this.props.data.settings.siteUrl}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email.value,
        password: inputs.password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        Cookies.set(TOKEN_KEY, data.token, { expires: 7, path: '/' });
        window.location.pathname = '/admin';
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    const {
      data: { loading, settings },
    } = this.props;

    if (loading && !settings) {
      return null;
    }

    return (
      <ThemeProvider theme={{}}>
        <div className={styles.wrapperClass}>
          <div className={styles.contentClass}>
            <h1 className={styles.titleClass}>{settings.siteTitle}</h1>
            {this.state.error && <Message text={this.state.error} />}
            <form
              className={styles.formClass}
              method="post"
              ref={form => {
                this.form = form;
              }}
              onSubmit={this.submitForm}
            >
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
}

export default Login;
