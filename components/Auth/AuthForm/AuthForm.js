import React, { useCallback, useContext, useEffect } from 'react';
import { useForm, useField } from 'react-final-form-hooks';
import { View, TouchableHighlight } from 'react-native';
import { Button, Text } from 'react-native-paper';
import InputText from '../../Modules/Input/InputText';
import _ from 'lodash';
import styled from 'styled-components';
import AuthContext from '../../../contexts/Global/AuthContext';
import Link from '../../Routes/Link';
const StyledInputText = styled(InputText)`
        margin:10px;
        color:#333;
`;
const StyledSubmitButton = styled(Button)`
    margin:10px 50px; 
`;

const StyledFormFooter = styled(View)`
        display: flex;
        flex-direction:row;
        justify-content:space-between;
        align-items:center;
        width:100%;
        padding:10px 50px;
`;

const fieldAdaptor = (field, fieldConfig = {}) => {
    const { input = {}, meta = {} } = field;
    const { onBlur, onFocus, onChange, name, value } = input;
    return {
        onChange,
        onBlur: () => {
            onBlur(name);
        },
        onFocus: () => {
            onFocus(name);
        },
        name,
        value,
        meta,
        ...fieldConfig
    };
};
const formFeildKeyValue = {
    email: { name: 'email', type: 'text', label: 'Email', pattern: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i), required: true },
    password: { name: 'password', type: 'password', label: 'Password', required: true, secureTextEntry: true },
    repassword: { name: 'repassword', type: 'password', label: 'Repeat Password', required: true, secureTextEntry: true },
    phone: { name: 'phone', type: 'text', label: 'phone', pattern: new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) }
};

const validate = (fields) => (values) => {
    const errors = {};
    fields.map((field) => {
        if (field.required && !values[field.name]) {
            errors[field.name] = 'Required';
        }
        if (!values[field.name]) {
        } else if (values['password'] !== values['repassword'] && values['repassword']) {
            errors['repassword'] = 'Password not match';
        } else if (field.pattern && !field.pattern.test(values[field.name])) {
            errors[field.name] = field.error || 'Please enter valid ' + field.name;
        } else if (field.maxLength && values[field.name].length > field.maxLength) {
            errors[field.name] = 'Exceed maximum number of characters';
        } else if (field.minLength && values[field.name].length < field.minLength) {
            errors[field.name] = 'Not reach minimum number of characters';
        }
        return field;
    });
    return errors;
};

const AuthSignOutButton = () => {
    const { onChange } = useContext(AuthContext);
    const _onChange = useCallback(() => {
        onChange({ actionType: 'signOut' });
    }, []);
    return (
        <TouchableHighlight onPress={_onChange}>
            <Text>Logout</Text>
        </TouchableHighlight>
    );
};
const AuthFormSignUp = ({
    onSubmit = (data) => {
        console.log(data, 'submit');
    }
}) => {
    const { onChange } = useContext(AuthContext);
    return (
        <React.Fragment>
            <AuthForm initializeValue={{}} onSubmit={onChange} actionType='signUpEmail' fieldNames={[ 'email', 'password' ]} />
            <StyledFormFooter>
                <Link to='AuthLogin'>
                    <Text>Sign In</Text>
                </Link>
            </StyledFormFooter>
        </React.Fragment>
    );
};

export const AuthFormLogin = () => {
    const { onChange } = useContext(AuthContext);
    return (
        <React.Fragment>
            <AuthForm initializeValue={{ email: 'jslandclan@gmail.com', password: 'Qwer1234' }} onSubmit={onChange} actionType='loginEmail' fieldNames={[ 'email', 'password' ]} />
            <StyledFormFooter>
                <Link to='AuthSignUp'>
                    <Text>SignUp</Text>
                </Link>
                <Link to='Login'>
                    <Text>Forget Password </Text>
                </Link>
            </StyledFormFooter>
        </React.Fragment>
    );
};

const StyledAuthForm = styled.View`width: 100%;`;
const AuthForm = ({
    onSubmit = (data) => {
        console.log(data);
        console.log('submit');
    },
    isLoading,
    actionType,
    initializeValue = {},
    fieldNames = [ 'email', 'password', 'repassword' ]
}) => {
    const { form } = useForm({ onSubmit, validate: validate(Object.values(_.pick(formFeildKeyValue, fieldNames))) });
    const { values, valid } = form.getState();
    const fields = fieldNames.map((name) => fieldAdaptor(useField(name, form), formFeildKeyValue[name]));
    const _onSubmit = useCallback(
        () => {
            onSubmit({ ...values, actionType });
        },
        [ values, actionType ]
    );
    useEffect(() => {
        form.initialize(initializeValue);
    }, []);
    return (
        <StyledAuthForm>
            {fields.map((field) => <StyledInputText key={field.name} {...field} />)}
            <StyledSubmitButton loading={isLoading} disabled={!valid} mode='contained' onPress={_onSubmit}>
                Start
            </StyledSubmitButton>
        </StyledAuthForm>
    );
};
AuthForm.Login = AuthFormLogin;
AuthForm.SignUp = AuthFormSignUp;
AuthForm.SignOutButton = AuthSignOutButton;
export default AuthForm;
