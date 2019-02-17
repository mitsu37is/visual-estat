import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

interface ICrime {
  GET_STATS_DATA: any;
}

interface IState {
  data: [];
}

class App extends Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      data: []
    };
  }

  public componentDidMount() {
    axios
      .get<ICrime>(
        "https://api.e-stat.go.jp/rest/2.1/app/json/getStatsData?appId=80a6dee81b8a4cb37125a4f70e1e978428e83653&lang=J&statsDataId=0003191320&metaGetFlg=Y&cntGetFlg=N&sectionHeaderFlg=1"
      )
      .then(response => {
        console.log(
          response.data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE.slice(
            0,
            100
          )[0]["@cat01"]
        );
        this.setState({
          data: response.data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE.slice(
            0,
            100
          )
        });
      });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header bg-black">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {this.state.data.map(data => (
          <ul>
            <li>{data["@cat01"]}</li>
            <li>{data["@cat02"]}</li>
            <li>{data["@time"]}</li>
            <li>{data["$"] + data["@unit"]}</li>
          </ul>
        ))}
        <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 mx-auto">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2" />
            <p className="text-grey-darker text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
              #photography
            </span>
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
              #travel
            </span>
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
              #winter
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
