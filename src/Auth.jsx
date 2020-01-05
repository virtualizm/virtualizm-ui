import React, {useReducer} from 'react';
import TextField from '@material-ui/core/TextField';
import {Container, Button} from "@material-ui/core";
import { authorize } from './Api';
import { withRouter } from 'react-router-dom';

const Auth = function (props) {
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
        try {
            await authorize(inputValues.login, inputValues.password);
            await props.authStatus.setIsAuthenticated(true);
            props.history.push('/')
        } catch (e) {
            // handle error here
        }
    };

    return (
        <Container>
            <form>
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
                    type="submit"
                    onClick = {handleSubmit}
                >
                    Log in
                </Button>
            </form>
        </Container>
    )
};

export default withRouter(Auth)
