import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, useField } from 'react-final-form-hooks';
import { View, Picker, Modal as ModalP } from 'react-native';
import { Button, Portal, Provider, Text } from 'react-native-paper';

import Input from '../../Modules/Input/Input';
import _ from 'lodash';
import styled from 'styled-components/native';
import AuthContext from '../../../contexts/Global/AuthContext';
import ModalLayer from '../../ModalLayer/ModalLayer';

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
    // email: { name: 'email', type: 'text', label: 'Email', pattern: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i), required: true },
    displayName: { name: 'displayName', type: 'text', label: 'Display Name', required: true },
    phoneNumber: { name: 'phoneNumber', type: 'text', label: 'Phone Number', pattern: new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) },
    coffee: {
        name: 'coffee',
        type: 'select',
        label: 'Coffee',
        options: [ { value: null, label: 'none' }, { label: 'latte', value: 'latte' }, { label: 'java', value: 'java' }, { label: 'american', value: 'american' }, { label: 'mocha', value: 'mocha' } ]
    },
    coffee: {
        name: 'coffee',
        type: 'picker',
        label: 'Coffee',
        options: [ { value: null, label: 'none' }, { label: 'latte', value: 'latte' }, { label: 'java', value: 'java' }, { label: 'american', value: 'american' }, { label: 'mocha', value: 'mocha' } ]
    }
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

const UserFormFieldForm = ({ field, actionType }) => {
    const { state: { user, isLoading }, onChange } = useContext(AuthContext);
    const { form } = useForm({ onChange, validate: validate(Object.values(formFeildKeyValue)) });
    const { values, valid } = form.getState();
    const fieldConfig = fieldAdaptor(useField(field.name, form), field);
    useEffect(
        () => {
            form.initialize(user[field.name]);
        },
        [ field ]
    );
    return <View />;
};

const UserFormModal = ({
    field,
    actived,
    toggleActived,
    onSubmit = (data) => {
        console.log(data);
    },
    onChange = (data) => {
        console.log(data);
    }
}) => {
    const { form } = useForm({ onSubmit });
    const { values, valid } = form.getState();
    const fieldConfig = fieldAdaptor(useField(field.name, form), field);
    return (
        <ModalLayer.Sidebar actived={actived} toggleActived={toggleActived}>
            <View>
                <Input {...fieldConfig} />
            </View>
        </ModalLayer.Sidebar>
    );
};

const SubmitView = styled.View`padding: 15px 50px;`;

const getFinalFieldEntries = (form, formFeildKeyValue) => {
    return Object.entries(formFeildKeyValue).map(([ filedName, field ]) => fieldAdaptor(useField(field.name, form), field));
};
const UserForm = ({ actionType }) => {
    const { state: { user, isLoading }, onChange } = useContext(AuthContext);
    const { form } = useForm({ onSubmit: onChange, validate: validate(Object.values(formFeildKeyValue)) });
    const { values, valid } = form.getState();
    const fieldEntries = getFinalFieldEntries(form, formFeildKeyValue);
    const [ actived, setActived ] = useState(false);
    const toggleActived = useCallback(() => {
        setActived((value) => !value);
    }, []);

    const _onSubmit = useCallback(
        () => {
            onChange({ payload: values, actionType: 'updateProfile' });
        },
        [ values, actionType ]
    );
    useEffect(
        () => {
            form.initialize(user);
        },
        [ user ]
    );
    // console.obj(values);
    return (
        <View>
            {fieldEntries.map((field) => <Input key={field.name} {...field} />)}
            <SubmitView>
                <Button loading={isLoading} disabled={!valid} mode='contained' onPress={_onSubmit}>
                    Save
                </Button>
            </SubmitView>
        </View>
    );
};
export default UserForm;
