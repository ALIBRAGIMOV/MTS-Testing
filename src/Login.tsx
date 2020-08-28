import React from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { login } from "./backend";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

type Props = {};

export const Login = (props: Props) => {
  const loginRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const history = useHistory();
  const cookies = new Cookies();

  async function handleClick() {
    let token = undefined;

    if (loginRef.current && passwordRef.current) {
      token = await login(loginRef.current.value, passwordRef.current.value);
      cookies.set("token", token);
    }

    if (token !== undefined) {
      history.push("/home");
    } else {
      alert("Неверный логин или пароль!");
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <Row justify="center">
        <Col span={6}>
          <input placeholder="Логин" id="login_input" ref={loginRef} />
          <br />
          <input
            type="password"
            placeholder="Пароль"
            ref={passwordRef}
            id="password_input"
          />
          <br />
          <Button
            type="primary"
            block
            style={{ maxWidth: 180 }}
            onClick={handleClick}
          >
            Войти
          </Button>
        </Col>
      </Row>
    </div>
  );
};
