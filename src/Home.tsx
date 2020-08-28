import React from "react";
import Cookies from "universal-cookie";
import "antd/dist/antd.css";
import { Redirect } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { getSource, Source } from "./backend";

export class Home extends React.Component {
  state = { ready: false, redirect: "" };
  cookies: any;
  items: any;

  searchRef: any;
  resultRef: any;

  rendered: any;

  constructor(props: any) {
    super(props);
    this.cookies = new Cookies();

    this.items = [];
    this.rendered = [];

    this.searchRef = React.createRef<HTMLInputElement>();
    this.resultRef = React.createRef<HTMLDivElement>();

    // const logout = () => {
    // 	// let history = useHistory()
    // 	// history.push("/")
    // }
  }

  componentDidMount() {
    if (this.cookies.get("token") === undefined) {
      alert("Вы не авторизованы!");
      this.setState({ redirect: "/" });
    }

    const getData = async () => {
      this.items = await getSource();

      this.items.map((item: any, key: any) => {
        this.rendered.push(
          <Row justify="center" key={key}>
            <Col span="2">{item.id}</Col>
            <Col span="2">{item.user}</Col>
            <Col span="2">{item.data}</Col>
          </Row>
        );
      });

      this.setState({ ready: true });
    };

    getData();
  }

  handleSearch() {
    if (this.searchRef.current) {
      this.search(this.searchRef.current.value);
    }
  }

  search(value: string) {
    if (this.resultRef.current) {
      if (this.items.length > 0) {
        this.resultRef.current.innerHTML = "Ничего не найдено";
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].user == value) {
            this.resultRef.current.innerHTML = "ID пользователя: " + i;
          }
        }
      } else {
        this.resultRef.current.innerHTML = "Ничего не найдено";
      }
    }
  }

  handleLogout() {
    this.cookies.remove("token");
    this.setState({ redirect: "/" });
  }

  render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <Row justify="space-between">
          <Col></Col>
          <Col>
            <input type="search" placeholder="Поиск" ref={this.searchRef} />
            <Button
              onClick={() => {
                this.handleSearch();
              }}
            >
              Найти
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                this.handleLogout();
              }}
            >
              Выйти
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col span="6">
            <div ref={this.resultRef}></div>
          </Col>
        </Row>
        <Row justify="center">
          <Col span="2">ID</Col>
          <Col span="2">USER</Col>
          <Col span="2">DATA</Col>
        </Row>
        {this.state.ready ? this.rendered : "Загрузка"}
      </div>
    );
  }
}
