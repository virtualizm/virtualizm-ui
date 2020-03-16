import React, { useCallback, useEffect, useReducer, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Card, Input, Button, message } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { authorize, fetchSessions } from "../../utils/api";
import Loading from "./Loading";
import "../../App.scss";

function Auth({ authStatus, history }) {
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      login: "",
      password: "",
    }
  );

  const [isLoading, setIsLoading] = useState(true);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!inputValues.login || !inputValues.password) return;

    try {
      await authorize(inputValues.login, inputValues.password);
      await authStatus.setIsAuthenticated(true);
      history.push("/virtual_machines");
    } catch (e) {
      message.error(e[0].title);
    }
  };

  const onLoad = useCallback(async () => {
    try {
      await fetchSessions();
      authStatus.setIsAuthenticated(true);
      setIsLoading(false);
      history.push("/virtual_machines");
    } catch (e) {
      setIsLoading(false);
      console.error("error", e);
    }
  }, [authStatus, history]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  if (isLoading) return <Loading />;

  return (
    <div className="login-bg">
      <Row justify="end">
        <Col xl={8} md={10} sm={15} xs={24}>
          <Card className="login__wrapper">
            <Row justify="center">
              <Col span={24}>
                <div className="login__header">
                  <LoginOutlined height="20" />
                  <h1>Login</h1>
                </div>
              </Col>
              <Row gutter={20}>
                <Input
                  placeholder="login"
                  size="large"
                  name="login"
                  onChange={handleOnChange}
                />
                <div className="divider" />
                <Input.Password
                  placeholder="password"
                  size="large"
                  name="password"
                  onChange={handleOnChange}
                />
                <div className="divider" />
                <Button
                  type="primary"
                  size="large"
                  className="login__btn"
                  onClick={handleSubmit}
                  onPressEnter={handleSubmit}
                >
                  Sign in
                </Button>
              </Row>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Auth);
