import React, { Component, useEffect, usesState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import Converter from "number-to-words";
import "date-fns";
import "./Summary.css";
import companyLogo from "../../../Static/Company_logo.png";
import axios from "axios";

const Auth = APP.SERVICES.AUTH;
const noLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwSGGfwg7rhSagWK4LfDiAqhLq70ljOTKzg&usqp=CAU";

const portList = axios.get(APP.ENV.URL.API.ROOT + "/company/ports", {
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`,
  },
});

const clientList = axios.get(
  APP.ENV.URL.API.ROOT + "/company/clients/free_list",
  {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  }
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  border: {
    border: "1px solid black",
  },
  container: {
    marginBlock: "10px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginInline: "10px",
  },
  printTitle: {
    padding: 0,
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
  },
  headerLeftTableData: {
    width: "50%",
    paddingRight: "10px",
    paddingTop: "10px",
    verticalAlign: "top",
  },
  headerRightTableData: {
    width: "50%",
    paddingRight: "10px",
    paddingLeft: "10px",
    verticalAlign: "top",
  },
  billLabelContainer: {
    width: "80px",
    padding: "10px",
    verticalAlign: "top",
  },
  billLabel: {
    fontFamily: "Arial",
    fontSize: "22px",
    border: " 2px solid #000000",
    padding: "3px",
    paddingLeft: " 25px",
    paddingRight: "25px",
  },
  avalue: {
    width: "85px",
    textAlign: "left",
    verticalAlign: "top",
  },
  dateSibling: {
    width: "70px",
    textAlign: "left",
  },
  date: {
    width: "150px",
  },
  tableHead: {
    width: "17%",
    textAlign: "left",
  },
  tableHead2: {
    width: "5%",
    textAlign: "left",
  },
  blankRow: {
    height: "30px",
  },
  particulars_table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
    height: "550px",
    minHeight: "550px",
  },
  tableBorder: {
    border: "2px solid #000000",
  },
}));

const Header = (props) => {
  const [currentDate, setCurrentDate] = React.useState("");
  useEffect(() => {
    const convertDate = (date) => {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("/");
    };
    setCurrentDate(convertDate(new Date()));
  }, [props]);
  const classes = useStyles();
  return (
    <div>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td style={{ width: "60%" }}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <th style={{ paddingRight: "10px", textAlign: "left" }}>
                      {props.bill.clientName}{" "}
                    </th>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: "10px" }}>
                      {props.bill.clientAddress ? props.bill.clientAddress : ""}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{ width: "40%" }}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td>
                      <b>Bill No: </b> {props.bill.summaryCode}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Date: </b> {currentDate}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "16px",
          textTransform: "uppercase",
          marginTop: "20px",
        }}
      >
        {props.bill.bill_type} Bill
      </div>
      <div style={{ fontWeight: "bold", marginTop: "5px" }}>
        Sub: {props.bill.subject}{" "}
      </div>
    </div>
  );
};

Header.propTypes = {
  bill: PropTypes.any,
};

const Details = (props) => {
  const classes = useStyles();
  const [total, setTotal] = React.useState(0.0);

  useEffect(() => {
    if (props.clientName !== "") {
      let totalNum = 0.0;
      props.list.forEach((item, index) => {
        if (item.isSelected) {
          if (item.port_id) {
            item["portName"] =
              props.portList[
                props.portList.findIndex((port) => port.id === item.port_id)
              ].Name;
          } else {
            item["portName"] = "";
          }
          totalNum += parseFloat(item.due_amount);
        }
        item.be_date =
          item.be_date !== null &&
          item.be_date !== "null" &&
          item.be_date !== ""
            ? moment(item.be_date, "DD-MM-YYYY").format("DD/MM/YYYY")
            : null;
      });
      setTotal(Math.round(totalNum).toFixed(2));
    }
  }, [props]);
  return (
    <>
      <table border="1" className="topTable">
        <tbody>
          <tr>
            <th style={{ width: "130px" }}>Bills Duratrion</th>
            <th style={{ width: "90px" }}>From</th>
            <th style={{ width: "150px" }}> {props.bill.fromDate} </th>
            <th style={{ width: "70px" }}>To</th>
            <th style={{ width: "150px" }}> {props.bill.toDate}</th>
          </tr>
        </tbody>
      </table>

      <table border="1" className="topTable">
        <thead>
          <tr>
            <th style={{ width: "40px" }}>SL</th>
            <th style={{ width: "95px" }}>Bill No</th>
            <th style={{ width: "80px" }}>Bill Date</th>
            <th style={{ width: "100px" }}>From/To</th>
            <th style={{ width: "100px" }}>B/E No</th>
            <th style={{ width: "80px" }}>Date</th>
            <th style={{ width: "100px" }}>Taka</th>
          </tr>
        </thead>

        <tbody>
          {props.list.map((item, i) => {
            if (item.isSelected) {
              return (
                <tr key={i}>
                  <td style={{ width: "40px", textAlign: "center" }}>
                    {i + 1}
                  </td>
                  <td style={{ width: "95px", textAlign: "center" }}>
                    {item.bill_code}
                  </td>
                  <td style={{ width: "80px", textAlign: "center" }}>
                    {item.bill_date}
                  </td>
                  <td style={{ width: "100px", textAlign: "center" }}>
                    {props.bill.bill_type === "Transport"
                      ? item.from_place + "-" + item.to_place
                      : item.portName}
                  </td>
                  <td style={{ width: "100px", textAlign: "center" }}>
                    {props.bill.bill_type === "Transport"
                      ? item.delivery_challan_no
                      : item.be_no}
                  </td>
                  <td style={{ width: "80px", textAlign: "center" }}>
                    {props.bill.bill_type === "Transport"
                      ? item.delivery_challan_date
                      : item.be_date}
                  </td>
                  <td style={{ width: "100px", textAlign: "right" }}>
                    {item.due_amount}
                  </td>
                </tr>
              );
            }
          })}

          <tr>
            <td colSpan="3" rowSpan="2">
              Receiving from party/bank
            </td>
            <th
              colSpan="3"
              style={{ textAlign: "right", paddingRight: "10px" }}
            >
              Total Taka:
            </th>
            <td style={{ textAlign: "right" }}>{total}</td>
          </tr>
          <tr>
            <th colSpan="3" style={{ textAlign: "right", paddinRight: "10px" }}>
              Net Payable Taka:
            </th>
            <th style={{ textAlign: "right" }}>{total} </th>
          </tr>
          <tr>
            <td
              colSpan="7"
              style={{ textAlign: "left", textTransform: "capitalize" }}
            >
              <b>In Words:</b>
              {Converter.toWords(total)} Taka Only{" "}
            </td>
          </tr>

          <tr>
            <td
              colSpan="7"
              style={{ borderTop: "0", borderBottom: "0", height: "50px" }}
            ></td>
          </tr>
          <tr>
            <th style={{ border: "0", textAlign: "right" }} colSpan="7">
              <strong style={{ borderTop: "1px solid #000000" }}>
                Authorised Signature
              </strong>
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};
Details.propTypes = {
  bill: PropTypes.any,
  list: PropTypes.any,
  portList: PropTypes.any,
};

class SummaryReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BillDetail: {},
      ready: false,
      list: [],
      portList: [],
    };

    this.CallApis = this.CallApis.bind(this);
    this.mapFindReturn = this.mapFindReturn.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
  }

  componentDidMount() {
    document.title = "Report";

    this.props.func.ClearForm();
  }

  async CallApis() {
    const billId = this.props.match.params.bill_id;
    this.setState({
      PrintType: this.props.match.params.type,
    });

    const bill = axios.get(
      APP.ENV.URL.API.ROOT + `/company/BillSummary/detail?summary_id=${billId}`,
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    Promise.all([bill, clientList, portList])
      .then((response) => {
        const [billResponse, clientResponse, portResponse] = response;

        if (billResponse.data.success) {
          let $billDetail = billResponse.data.bill_summary_list;

          this.setState({
            BillDetail: {
              clientName: this.mapFindReturn(
                clientResponse.data.client_list,
                $billDetail.client_id,
                "id",
                "Name"
              ),
              clientAddress: this.mapFindReturn(
                clientResponse.data.client_list,
                $billDetail.client_id,
                "id",
                "MailingAddess"
              ),
              billType: $billDetail.bill_type,
              fromDate:
                $billDetail.from_date !== ""
                  ? moment($billDetail.from_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              toDate:
                $billDetail.to_date !== ""
                  ? moment($billDetail.to_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,

              summaryCode: $billDetail.summary_code,
              subject: $billDetail.subject,
              bill_type: $billDetail.bill_type,
              hasEditPermission: $billDetail.HasEditPermission,
            },
            portList: portResponse.data.ports,
          });
          this.GetBillList(
            $billDetail.client_id,
            $billDetail.bill_type,
            $billDetail.from_date,
            $billDetail.to_date,
            $billDetail
          );
        }

        this.setState({
          ready: true,
        });
      })
      .catch((error) => {
        // this.__RemoveFAP();
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            this.setState({
              BillDetail: {},
              Company: {},
            });
            this.__SetFA("error", error.response.data.message);
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  GetBillList(cli, type, from = null, to = "", bill_summary) {
    const billList = JSON.parse(bill_summary.InvoiceList);
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillSummary/getBillList?client_id=" +
          cli +
          "&bill_type=" +
          type +
          "&from_date=" +
          from +
          "&to_date=" +
          to +
          "&bill_summary_id=" +
          bill_summary.summary_id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          const tempArry = response.data.bill_summary_list.map((item) => {
            const temp = {
              ...item,
              bill_date: moment(item.bill_date, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              ),
              be_date: item.be_date ?? item.be_date,
              isSelected: false,
              isDisabled: item.valid === 0,
            };
            if (billList.includes(item.id)) {
              temp.isSelected = true;
            }

            return temp;
          });

          this.setState({
            list: tempArry,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 429) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  mapFindReturn(list, searchValue, match, returnValue) {
    if (searchValue === "0" || searchValue === 0) return "";
    return list[list.findIndex((item) => item[match] === searchValue)][
      returnValue
    ];
  }

  handlePrint = () => {
    window.print();
  };
  componentDidMount() {
    this.CallApis();
  }

  render() {
    return this.state.ready ? (
      <>
        <Button
          className="button-print"
          variant="contained"
          onClick={this.handlePrint}
        >
          Print
        </Button>
        <div id="printableArea">
          <Header bill={this.state.BillDetail} />

          <Details
            list={this.state.list}
            bill={this.state.BillDetail}
            portList={this.state.portList}
          />
        </div>
      </>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GlobalData: state.BillSummary,
  };
};

export default connect(mapStateToProps)(SummaryReport);
