import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
    name,
    label,
    placeholder,
    value,
    error,
    type,
    onChange
}) => {
    return(
        <div className="form-group">
            <label>{label}</label>
            <input 
                type={type}
                className={classnames('form-control form-control-sm', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default TextFieldGroup;