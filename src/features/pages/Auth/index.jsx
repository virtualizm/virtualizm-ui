import React, { useCallback, useEffect, useReducer, useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Row, Col, Card, Input, Button, message } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { authorize, fetchSessions } from "../../../utils/api";
import Loading from "../Loading";
import styles from "./styles.module.scss";

function Auth({ authStatus, history, location }) {
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      login: "",
      password: "",
    }
  );

  const [isLoading, setIsLoading] = useState(true);

  const redirectTo = location.state ? location.state.from : "/";

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValues.login || !inputValues.password) return;

    try {
      await authorize(inputValues.login, inputValues.password);
      authStatus.setIsAuthenticated(true);

      history.push(redirectTo);
    } catch (e) {
      message.error(e[0].title);
    }
  };

  const onLoad = useCallback(async () => {
    try {
      await fetchSessions();
      authStatus.setIsAuthenticated(true);
      setIsLoading(false);

      history.push(redirectTo);
    } catch (e) {
      setIsLoading(false);
      console.error("error", e);
    }
  }, [authStatus, history, redirectTo]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.background}>
      <Row justify="end">
        <Col xl={8} md={10} sm={15} xs={24}>
          <Card className={styles.wrapper}>
            <Row justify="center">
              <Col span={24}>
                <div className={styles.header}>
                  <LoginOutlined height="20" />
                  <h1>Login</h1>
                </div>
              </Col>
              <Row gutter={20} className={styles.row}>
                <Form className={styles.form}>
                  <Input
                    placeholder="login"
                    size="large"
                    name="login"
                    onChange={handleOnChange}
                  />
                  <div className={styles.divider} />
                  <Input.Password
                    placeholder="password"
                    size="large"
                    name="password"
                    onChange={handleOnChange}
                  />
                  <div className={styles.divider} />
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className={styles.loginBtn}
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                </Form>
              </Row>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(Auth);
