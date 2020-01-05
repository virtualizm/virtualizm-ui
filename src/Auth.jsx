import React, {useReducer} from 'react';

import TextField from '@material-ui/core/TextField';
import {Container, Button} from "@material-ui/core";
import { authorize, fetchHyps } from './Api';



export default function Auth (props) {

    const [inputValues, setInputValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            login: '',
            password: ''
        }
    );

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const handleSubmit = async () => {
        const response = await authorize(inputValues.login, inputValues.password);
        await fetchHyps();
        console.log(response)
        if(response.ok) {
            await props.authStatus.setIsAuthenticated(true);
            await fetchHyps();
        }

    };

    return (
        <Container>
            <TextField
                required
                value={inputValues.login}
                name="login"
                label="Login"
                onChange={handleOnChange}
            />
            <TextField
                required
                value={inputValues.password}
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleOnChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick = {handleSubmit}
            >
                Log in
            </Button>
        </Container>
    )
}

