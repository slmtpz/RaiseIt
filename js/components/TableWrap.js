import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Button, Icon } from 'antd';

let ornerk = {
  "_id": '5bc263b55cf4901b15d676b4',
  "username": "orbay",
  // "room" : 3,
  // "saloon" : 2,
  // "address" : "BAKIRKOY",
  // "building_type" : "Residans",
  // "post_type" : "Kiralik",
  // "age" : 15,
  // "size" : 185,
  "starting_bid": 7609,
  "bid_count": 0,
  // "current_bid" : 0,
  "current_bidder": null,
  "expiration_time": 279
}

class TableWrap extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('TABLEWRAP: data', this.props.data);
    return (
      <ReactTable
        data={this.props.data}
        columns={[
          {
            Header: "Ad Info",
            columns: [
              { Header: "Ad Type", accessor: "post_type", className: "center-aligned", width: 100 },
              { Header: "Address", accessor: "address", className: "center-aligned" }
            ]
          },

          {
            Header: "House Info",
            columns: [
              { Header: "Type", accessor: "building_type", className: "center-aligned", width: 150 },
              {
                Header: "Rooms",
                accessor: "room",
                className: "center-aligned",
                width: 100,
                Cell: e => (<div>{`${e.original.room} + ${e.original.saloon}`}</div>)
              },
              { Header: "Size", accessor: "size", className: "center-aligned", width: 100 }
            ]
          },
          {
            Header: "Bid Info",
            columns: [
              {
                Header: "Current Bid",
                accessor: "current_bid",
                width: 200,
                Cell: e => {
                  let currentBid = e.value
                  if (!currentBid) currentBid = 'ー'
                  return (<div>{currentBid}</div>);
                },
                className: "center-aligned"
              },
              {
                Header: "Raise",
                accessor: "minimum_bid",
                Cell: e => {
                  let currentBid = e.value
                  if (!currentBid) currentBid = 'ー'
                  return (
                    <div>
                      <Button onClick={() => this.props.onRaiseClicked(e.original)}>
                        Raise <Icon type="rise" theme="outlined" />
                      </Button>
                      <span>{` to ${e.value}₺`}</span>
                    </div>);
                }
              },
            ]
          }
        ]}
        defaultPageSize={20}
        className="-striped -highlight"
      />
    );
  }
}

export default TableWrap;