import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

let ornerk = {
    "_id" : '5bc263b55cf4901b15d676b4',
    "username" : "orbay",
    // "room" : 3,
    "saloon" : 2,
    // "address" : "BAKIRKOY",
    // "building_type" : "Residans",
    // "post_type" : "Kiralik",
    // "age" : 15,
    // "size" : 185,
    "starting_bid" : 7609,
    "bid_count" : 0,
    "current_bid" : 0,
    "current_bidder" : null,
    "expiration_time" : 279
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
                            { Header: "Ad Type",   accessor: "post_type",     className: "center-aligned" },
                            { Header: "Address",   accessor: "address",       className: "center-aligned" }
                        ]
                    },
                    
                    {
                        Header: "House Info",
                        columns: [
                            { Header: "Type",    accessor: "building_type", className: "center-aligned" },
                            { Header: "Rooms",   accessor: "room",          className: "center-aligned" },
                            { Header: "Size",    accessor: "size", className: "center-aligned" }
                        ]
                    }
                ]}
                defaultPageSize={20}
                className="-striped -highlight"
                getTdProps={(state, rowInfo, column) => {
                    return {
                        onClick: (e, handleOriginal) => {
                            // this.props.onRowClick(rowInfo.original.history);
                            console.log("event:", e);
                            console.log("column:", column);
                            console.log("row:", rowInfo);
                            if (handleOriginal) {
                                handleOriginal();
                            }
                        }
                    };
                }}
            />
		);
	}
}

export default TableWrap;