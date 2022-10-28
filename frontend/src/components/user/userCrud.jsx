import React, { Component, useState } from "react";
import Main from "../template/Main";
import axios from "axios";
import * as S from "./styles";

const headerProps = {
  icon: "users",
  title: "Usuários",
  subtitle: "Cadastro de usuários : Incluir, Listar, Alterar e Excluir",
};
const baseUrl = "http://localhost:3001/users";

const initialState = {
  user: {
    name: "",
    birthday: "",
    cpf: "",
    gender: "masculino",
    adress: "",
    status: "active",
    complement: "",
    zipcode: "",
    city: "",
  },
  list: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  onHandleStatus(e) {
    const activeStatus = e.target.value;
    if (activeStatus === "active") {
      alert("ativo");
    }
  }
  clear() {
    this.setState({ user: initialState.user });
  }
 

  save() {
    const name = this.state.user.name;

    if (this.state.user.cpf === "") {
      alert("Campo cpf é obrigatório!");
    }
    if (this.state.user.name === "") {
      alert("Campo nome é obrigatório!");
    }
    if (this.state.user.birthday === "") {
      alert("Campo data de nascimento é obrigatório!");
    }
   

    if (name && this.state.user.cpf !== "") {
      const user = this.state.user;
      const method = user.id ? "put" : "post";
      const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
      axios[method](url, user).then((resp) => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ user: initialState.user, list });
      });
    }
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }
  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }
 
  //masks
  cpf(e) {
    let value = e.currentTarget.value;
    e.currentTarget.maxLength = 14;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1-$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e.currentTarget.value = value;
    return e;
  }
  zipcode(e) {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    e.currentTarget.value = value;
    return e;
  }

  date(e) {
    let value = e.currentTarget.value;
    e.currentTarget.maxLength = 8;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1.$2.$3");

    e.currentTarget.value = value;
    return e;
  }
// End masks


  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Data de nascimento</label>
              <input
                onKeyUp={this.date}
                type="text"
                className="form-control"
                name="birthday"
                value={this.state.user.birthday}
                onChange={(e) => this.updateField(e)}
                placeholder="Data de nascimento"
              />
            </div>
          </div>
          <div className="col-6 col-md-6">
            <div className="form-group">
              <label htmlFor="">CPF</label>
              <input
                onKeyUp={this.cpf}
                type="text"
                className="form-control"
                name="cpf"
                value={this.state.user.cpf}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o CPF"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4 col-md-2">
              <S.SelectFields>
                <div className="form-group">
                  <label htmlFor="">Gênero</label>
                  <S.statusField>
                    <select
                      name="gender"
                      id="gender"
                      onChange={(e) => this.updateField(e)}
                    >
                      <option value="masculino" name="masculino">
                        Masculino
                      </option>
                      <option value="feminino" name="feminino">
                        Feminino
                      </option>
                    </select>
                  </S.statusField>
                </div>
                <div className="col-2 col-md-2">
                  <div className="form-group">
                    <label htmlFor="">Status</label>
                    <S.statusField>
                      <select
                        name="status"
                        id="active"
                        onChange={(e) => this.updateField(e)}
                      >
                        Ativo
                        <option value="inactive" name="inactive">
                          Inativo
                        </option>
                        <option value="active" name="active">
                          Ativo
                        </option>
                      </select>
                    </S.statusField>
                  </div>
                </div>
              </S.SelectFields>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">CEP</label>

              <input
                 
                onKeyUp={this.zipcode}
                type="text"
                className="form-control"
                name="zipcode"
                value={this.state.user.zipcode}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o CEP"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Cidade</label>

              <input
                type="text"
                className="form-control"
                name="city"
                value={this.state.user.city}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite a cidade"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Endereço</label>

              <input
                type="text"
                className="form-control"
                name="adress"
                value={this.state.user.adress}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o endereço"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="">Complemento</label>
              <input
                type="text"
                className="form-control"
                name="complement"
                value={this.state.user.complement}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o complemento"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }
  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4 ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data nascimento</th>
            <th>CPF</th>
            <th>Gênero</th>
            <th>Endereço</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.birthday}</td>
          <td>{user.cpf}</td>
          <td>{user.gender === "masculino" ? "Masculino" : "Feminino"}</td>
          <td>{user.adress}</td>
          <td>{user.status === "active" ? "Ativo" : "Inativo"}</td>

          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              className="btn btn-primary ml-2"
              onClick={() => this.load(user)}
            >
              <i class="fa-regular fa-eye"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
