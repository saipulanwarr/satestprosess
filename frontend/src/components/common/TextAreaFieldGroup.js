import React from 'react';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
    name,
    label,
    placeholder,
    value,
    error,
    rows,
    onChange
}) => {
    return(
        <div className="form-group">
            <label>{label}</label>
            <textarea 
                className={classnames('form-control form-control-sm', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                rows="8"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

export default TextAreaFieldGroup;