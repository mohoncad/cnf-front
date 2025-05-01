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
import "./Print.css";
import companyLogo from "../../../Static/Company_logo.png";
import axios from "axios";

const Auth = APP.SERVICES.AUTH;
const noLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwSGGfwg7rhSagWK4LfDiAqhLq70ljOTKzg&usqp=CAU";
const bankList = axios.get(APP.ENV.URL.API.ROOT + "/company/banks/free_list", {
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`,
  },
});

const currencyList = axios.get(
  APP.ENV.URL.API.ROOT + "/company/currency/free_list",
  {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  }
);

const portList = axios.get(APP.ENV.URL.API.ROOT + "/company/ports", {
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`,
  },
});

const unitList = axios.get(APP.ENV.URL.API.ROOT + "/company/unit/free_list", {
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

const supplierList = axios.get(
  APP.ENV.URL.API.ROOT + "/company/suppliers/free_list",
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
    // paddingRight: "10px",
    // paddingTop: "10px",
    verticalAlign: "top",
  },
  headerRightTableData: {
    width: "50%",
    // paddingRight: "10px",
    // paddingLeft: "10px",
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
    width: "150px",
    textAlign: "left",
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
  tableHead2: {
    width: "5%",
    textAlign: "left",
  },
  company_name: {
    display: "block",
    fontSize: "30px",
    fontWeight: "bold",
    margin: "0",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <div>
      {props.type === "REGULAR" ? (
        <table
          border="0"
          className="RegularHeader"
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            <tr>
              <td className="logo">
                <img src={props.company.logo} alt="Company Logo" />
              </td>
              <td className="company_details">
                <p className={classes.company_name}>{props.company.name} </p>
                <div>
                  <b>Phone: </b>
                  {props.company.phone}
                </div>{" "}
                <div>
                  <b>Web: </b>
                  {props.company.companyWeb}
                </div>{" "}
                <div>
                  <b>Address: </b>
                  {props.company.companyAdd}
                </div>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "5px",
          marginBottom: "5px",
          marginTop: "10px",
        }}
      >
        <b style={{ padding: "5px", border: "1px solid #000" }}>
          TRANSPORT CHALLAN / BILL
        </b>
      </div>
      <table className={classes.table} border="0">
        <tbody>
          <tr>
            <td className={classes.headerLeftTableData}>
              <table
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className={classes.table}
              >
                <tbody>
                  <tr>
                    <th className={classes.tableHead}>
                      Bill No<b>:</b>{" "}
                    </th>
                    <td colSpan="2">{props.bill.code} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      Bill to<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.clientName} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      Address<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.clientAddress ? props.bill.clientAddress : null} </td>
                  </tr>

                  <tr>
                    <td colSpan="3"></td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      Delivery Challan No<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.deliveryChallanNo} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      Transport Challan No<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.transportChallanNo} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      LC No<b>:</b>
                    </th>
                    <td>{props.bill.lcNo} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      Holding No<b>:</b>
                    </th>
                    <td>{props.bill.holdingNo} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      B/E C- No<b>:</b>
                    </th>
                    <td>{props.bill.beNo} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      From<b>:</b>
                    </th>
                    <td>{props.bill.fromPlace} </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className={classes.headerRightTableData}>
              <table
                className={classes.table}
                border="0"
                cellPadding="0"
                cellSpacing="0"
              >
                <tbody>
                  <tr>
                    <th className={classes.tableHead2}>
                      Bill Date<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.billDate} </td>
                    <th className={classes.tableHead2}>
                      AWB No<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.awbNo} </td>
                  </tr>
                  <tr className={classes.blankRow}>
                    <td colSpan="3" style={{visibility: "hidden"}}>EMPTY</td>
                    <td colSpan="3" style={{visibility: "hidden"}}>EMPTY</td>
                  </tr>
                  <tr className={classes.blankRow}>
                    <td colSpan="3" style={{visibility: "hidden"}}>EMPTY</td>
                    <td colSpan="3" style={{visibility: "hidden"}}>EMPTY</td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead2}>
                      Delivery Challan Date<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.deliveryChallanDate} </td>
                    <th className={classes.tableHead2}>
                      Description<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.goodsDescription} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead2}>
                      Transport Challan Date<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.transportChallanDate} </td>
                    <th className={classes.tableHead2}>
                      Package<b>:</b>
                    </th>
                    <td colSpan="2">
                      {props.bill.quantity} {props.bill.unit}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead2}>
                      LC Date<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.lcDate} </td>
                    <th className={classes.tableHead2}>
                      Transport<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.transportType} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead2}>
                      Holding Date<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.holdingDate} </td>
                    <th className={classes.tableHead2}>
                      Vehicle Reg. No<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.vehicleRegNo} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead2}>
                      BE Date<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.beDate} </td>
                    <th className={classes.tableHead2}>
                      Driver Name<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.driverName} </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead2}>
                      To<b>:</b>
                    </th>
                    <td colSpan="2">{props.bill.toPlace} </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Header.propTypes = {
  bill: PropTypes.any,
  company: PropTypes.any,
  type: PropTypes.any,
};

const Particulars = (props) => {
  const classes = useStyles();

  return (
    <>
      <table border="0" className={classes.particulars_table}>
        <tbody>
          <tr>
            <th
              parent=""
              className={classes.tableBorder}
              style={{ height: "20px" }}
            >
              Particulars of Heads/Accounts
            </th>
            <th
              parent=""
              className={classes.tableBorder}
              style={{ width: "160px", height: "20px" }}
            >
              Taka
            </th>
          </tr>
          <tr>
            <td
              className={classes.tableBorder}
              parent=""
              colSpan="2"
              style={{
                verticalAlign: "top",
                padding: "0",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "158px",
                  bottom: "0",
                  border: "1px solid #000000",
                }}
              ></div>

              <data
                id="data-table"
                style={{
                  position: "relative",
                  zIndex: "2",
                  display: "block",
                  height: "100%",
                }}
              >
                <table className={classes.table} border="0">
                  <tbody>
                    {props.bill.particulars
                      ? props.bill.particulars.map(
                          (item, i) => {
                            return (
                              <tr key={`${item.head_name}-${i}`}>
                                <td
                                  style={{
                                    paddingLeft: "25px",
                                    borderBottom: "1px dotted #000000",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  ({i < 10 ? `0${i + 1}` : i + 1}){" "}
                                  {item.head_name}
                                </td>
                                <td
                                  style={{
                                    width: "160px",
                                    textAlign: "right",
                                    borderBottom: "1px dotted #000000",
                                  }}
                                >
                                  <div
                                    style={{
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    {item.amount}
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )
                      : ""}
                    {/* </>
                              );
                            })
                          : ""} */}
                  </tbody>
                </table>
              </data>
            </td>
          </tr>

          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              Total Taka :
            </th>
            <td
              className={classes.tableBorder}
              parent=""
              style={{
                height: "20px",
                textAlign: "right",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <label id="bill_total_amount">
                {parseFloat(
                  props.bill.customerTotal
                ).toFixed(2)}
              </label>
            </td>
          </tr>
          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              Less Advance Taka :
            </th>
            <td
              className={classes.tableBorder}
              parent=""
              style={{
                height: "20px",
                textAlign: "right",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <label id="bill_paid_amount">
                {parseFloat(
                  props.bill.customerPaid
                ).toFixed(2)}
              </label>
            </td>
          </tr>
          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              Net Payable Taka :
            </th>
            <td
              className={classes.tableBorder}
              parent=""
              style={{
                height: "20px",
                textAlign: "right",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p id="bill_due_amount">
                {parseFloat(Math.round(
                  props.bill.customerDue)
                ).toFixed(2)}
              </p>
            </td>
          </tr>
          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              Less Amount :
            </th>
            <td
              className={classes.tableBorder}
              parent=""
              style={{
                height: "20px",
                textAlign: "right",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p id="bill_due_amount">
                {parseFloat(Math.round(
                  props.bill.less_amount)
                ).toFixed(2)}
              </p>
            </td>
          </tr>
          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              Paid Amount :
            </th>
            <td
              className={classes.tableBorder}
              parent=""
              style={{
                height: "20px",
                textAlign: "right",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p id="bill_due_amount">
                {parseFloat(Math.round(
                  props.bill.payable_amount)
                ).toFixed(2)}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <b>Total Taka (In Words): </b>
        <label
          style={{ textTransform: "capitalize" }}
          id="bill_due_amount_text"
        >
          {Converter.toWords(props.bill.customerDue)} Taka
          Only
        </label>
      </div>
      <div
        style={{
          // marginTop: "10px",
          textAlign: "right",
          marginRight: "20px",
        }}
      >
        <u>
          <i>Authorised Signature</i>
        </u>
      </div>
    </>
  );
};
Particulars.propTypes = {
  bill: PropTypes.any,
  company: PropTypes.any,
  type: PropTypes.any,
};

class TransportReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BillDetail: {},
      Company: {},
      PrintType: "",
      ready: false,
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

    const company_id = new APP.SERVICES.SessionUser(this.props).GetProfile()
      .CompanyID;
    const company = axios.get(
      APP.ENV.URL.API.ROOT + "/company/detail?id=" + company_id,
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );
    const bill = axios.get(
      APP.ENV.URL.API.ROOT + `/company/transport/detail?bill_id=${billId}`,
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    Promise.all([bill, company, currencyList, portList, unitList, clientList])
      .then((response) => {
        const [
          billResponse,
          companyResponse,
          currencyResponse,
          portResponse,
          unitResponse,
          clientResponse,
        ] = response;

        if (billResponse.data.success) {
          let $billDetail = billResponse.data.transport;

          this.setState({
            BillDetail: {
              code: $billDetail.bill_code,
              billDate: moment($billDetail.bill_date, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              ),
              awbNo: $billDetail.awb_no,
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
              goodsDescription: $billDetail.description,

              lcNo: $billDetail.lc_no,
              lcDate:
                $billDetail.lc_date !== ""
                  ? moment($billDetail.lc_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              beNo: $billDetail.be_no,
              beDate:
                $billDetail.be_date !== ""
                  ? moment($billDetail.be_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,

              deliveryChallanNo: $billDetail.delivery_challan_no,
              deliveryChallanDate:
                $billDetail.delivery_challan_date !== ""
                  ? moment(
                      $billDetail.delivery_challan_date,
                      "DD-MM-YYYY"
                    ).format("DD/MM/YYYY")
                  : null,
              transportChallanNo: $billDetail.transport_challan_no,
              transportChallanDate:
                $billDetail.transport_challan_date !== ""
                  ? moment(
                      $billDetail.transport_challan_date,
                      "DD-MM-YYYY"
                    ).format("DD/MM/YYYY")
                  : null,

              holdingNo: $billDetail.holding_no,
              holdingDate:
                $billDetail.holding_date !== ""
                  ? moment($billDetail.holding_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,

              jobNo: $billDetail.job_no,
              jobDate:
                $billDetail.job_date !== ""
                  ? moment($billDetail.job_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              transportType: $billDetail.transport_type,
              vehicleRegNo: $billDetail.vehicle_reg_no,
              driverName: $billDetail.driver_name,
              fromPlace: $billDetail.from_place,
              toPlace: $billDetail.to_place,

              unit: this.mapFindReturn(
                unitResponse.data.units,
                $billDetail.unit_id,
                "id",
                "Name"
              ),
              quantity: $billDetail.quantity,

              particulars:
                $billDetail.particulars_charges === "particulars_charges"
                  ? []
                  : JSON.parse($billDetail.particulars_charges),
              customerTotal: $billDetail.total_amount,
              customerPaid: $billDetail.paid_amount,
              customerDue: $billDetail.due_amount,
              hasEditPermission: $billDetail.HasEditPermission,
              less_amount: $billDetail.less_amount,
              payable_amount: $billDetail.payable_amount,
            },
          });
        }

        if (companyResponse.data.success) {
          this.setState({
            Company: {
              name: companyResponse.data.company.Name,
              phone: companyResponse.data.company.ContactNumber,
              companyAdd: companyResponse.data.company.Address1,
              companyWeb: companyResponse.data.company.WebAddress,
              logo: companyResponse.data.company.Logo
                ? companyResponse.data.company.Logo
                : noLogo,
            },
          });
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
          <Header
            bill={this.state.BillDetail}
            company={this.state.Company}
            type={this.state.PrintType}
          />

          <Particulars
            bill={this.state.BillDetail}
            company={this.state.Company}
            type={this.state.PrintType}
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
    GlobalData: state.TransportBill,
    CompanyData: state.Company,
  };
};

export default connect(mapStateToProps)(TransportReport);
