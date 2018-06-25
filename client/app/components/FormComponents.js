import React from 'react';

export const renderField = ({ input, aria, label, type, placeholder, help, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <input {...input}
      type={type}
      className={"form-control" + (touched && (error || warning) ? " is-invalid" : "")}
      placeholder={placeholder}
      aria-describedby={aria}
      style={{minWidth: 250, maxWidth: 350,}}
    />

    {
      touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))
    }

    {help ? (<small id={aria} className="form-text text-muted">
      {help}
    </small>) : (<div />)}
  </div>
);

export const renderTextArea = ({ input, placeholder, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <div>
      <textarea {...input} className="form-control" placeholder={placeholder} type={type} rows="3" />
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
)
