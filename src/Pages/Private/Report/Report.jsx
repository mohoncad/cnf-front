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
//import Converter from "number-to-words";
import Converter from "decimal-number-to-words";
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
    width: "70px",
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
      {props.type === "REGULAR_VOUCHER" ||
      props.type === "REGULAR_CUSTOMER_BILL" ? (
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
      {props.type === "REGULAR_VOUCHER" || props.type === "VOUCHER" ? (
        <div className={classes.printTitle}>Voucher Bill</div>
      ) : (
        ""
      )}
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
                    <th className={classes.tableHead}>To</th>
                    <td colSpan="2">
                      <b>:</b> {props.bill.clientName}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>Address</th>
                    <td colSpan="2">
                      <b>:</b>
                      {props.bill.clientAddress}{" "}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3"></td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>Supplier</th>
                    <td colSpan="2">
                      <b>:</b>
                      {props.bill.supplier}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>Carrier</th>
                    <td colSpan="2">
                      <b>:</b>
                      {props.bill.carrier}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>BL No</th>
                    <td>
                      <b>:</b>
                      {props.bill.mawbNo}{" "}
                    </td>
                    <td>
                      <b>Date: </b>
                      {props.bill.mawbDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className={classes.headerRightTableData}>
              <table
                border="0"
                cellPadding="0"
                cellSpacing="0"
                className={classes.table}
              >
                <tbody>
                  <tr>
                    <td rowSpan="2" className={classes.billLabelContainer}>
                      <b className={classes.billLabel}>Bill</b>
                    </td>
                    <th className={classes.tableHead}>
                      Bill No<b>:</b>
                    </th>
                    <td>{props.bill.code}</td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      Bill Date<b>:</b>
                    </th>
                    <td>{props.bill.billDate}</td>
                  </tr>
                </tbody>
              </table>

              <table
                className={classes.table}
                border="0"
                cellPadding="0"
                cellSpacing="0"
              >
                <tbody>
                  <tr>
                    <th className={classes.tableHead}>Port</th>
                    <td colSpan="2">
                      <b>:</b>
                      {props.bill.port}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      <b>L/C No </b>
                    </th>
                    <td>
                      <b>:</b>
                      {props.bill.lcNo}{" "}
                    </td>
                    <td className={classes.date}>
                      <b>Date: </b> {props.bill.lcDate}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      <b>B/E No </b>
                    </th>
                    <td>
                      <b>:</b> {props.bill.beNo}{" "}
                    </td>
                    <td className={classes.date}>
                      <b>Date: </b> {props.bill.beDate}{" "}
                    </td>
                  </tr>
                  <tr>
                    <th className={classes.tableHead}>
                      <b>Invoice No </b>
                    </th>
                    <td>
                      <b>:</b> {props.bill.invoiceNo}{" "}
                    </td>
                    <td className={classes.date}>
                      <b>Date: </b> {props.bill.invoiceDate}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      <table
                        className={classes.table}
                        cellPadding="0"
                        cellSpacing="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <th
                              style={{ width: "120px" }}
                              className={classes.tableHead}
                            >
                              Consignment Value
                            </th>
                            <td>
                              <b>:</b> {props.bill.currency}{" "}
                              {props.bill.invoiceValue} @ TK{" "}
                              {props.bill.currencyRate}{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
              <table
                className={classes.table}
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  <tr>
                    <th className={classes.tableHead}>HBL No</th>
                    <td>
                      <b>:</b>
                      {props.bill.hawbNo}{" "}
                    </td>
                    <th className={classes.avalue}>A/Value (TK)</th>
                    <td>
                      <b>:</b>
                      {props.bill.aValue}{" "}
                    </td>
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
  const [particularCharges, setParticularCharges] = React.useState({});
  const [list, setList] = React.useState([]);
  const [overallTotal, setOverallTotal] = React.useState(0.0);
  const [dueAmount, setDueAmount] = React.useState(0.0);

  useEffect(() => {
    let tempCharges = {};
    let tempList = [];
    props.bill.particulars.forEach((item, index) => {
      if (tempCharges[item.category_name]) {
        tempCharges[item.category_name] = [
          ...tempCharges[item.category_name],
          { ...item, index: index },
        ];
      } else {
        if (!tempList.includes(item.category_name)) {
          tempList.push(item.category_name);
        }
        tempCharges[item.category_name] = [{ ...item, index: index }];
      }
    });
    let totalAmount = 0;
    for (let obj in tempCharges) {
      const total = tempCharges[obj].reduce((acc, curr) => {
        if (props.type === "REGULAR_VOUCHER" || props.type === "VOUCHER") {
          return acc + parseFloat(curr.actual_amount);
        }
        return acc + parseFloat(curr.customer_amount);
      }, 0.0);
      
      tempCharges[obj] = {
        list: tempCharges[obj],
        total: total.toFixed(2),
      };
      totalAmount += parseFloat(tempCharges[obj].total);
    }
    if (props.type === "REGULAR_VOUCHER" || props.type === "VOUCHER") {
      setDueAmount(totalAmount)
    } else {
      setDueAmount(parseFloat(totalAmount - props.bill.customerPaid));
    }
    setOverallTotal(totalAmount);

    if (tempCharges) {
      setParticularCharges(tempCharges);
      setList(tempList);
    }
  }, [props]);

  return (
    <>
      <table border="0" className={classes.particulars_table}>
        <tbody>
          <tr>
            <th
              parent=""
              className={classes.tableBorder}
              style={{ width: "280px", height: "20px" }}
            >
              Particulars of Consignment
            </th>
            <th
              parent=""
              className={classes.tableBorder}
              style={{ height: "20px" }}
            >
              Particulars of Charges
            </th>
            <th
              parent=""
              className={classes.tableBorder}
              style={{ width: "160px", height: "20px" }}
            >
              Amount (TK)
            </th>
          </tr>
          <tr>
            <td
              parent=""
              rowSpan="4"
              className={classes.tableBorder}
              style={{ position: "relative", verticalAlign: "top" }}
            >
              <div style={{ margin: "10px" }}>
                <table cellSpacing="0" cellPadding="0" border="0">
                  <tbody>
                    <tr>
                      <th
                        style={{
                          width: "140px",
                          textAlign: "left",
                          verticalAlign: "top",
                        }}
                      >
                        Package
                      </th>
                      <td>
                        <b>:</b>
                        {props.bill.quantity} {props.bill.unit}{" "}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "left", verticalAlign: "top" }}>
                        Weight
                      </th>
                      <td>
                        <b>:</b>
                        {props.bill.netWeight}{" "}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "left", verticalAlign: "top" }}>
                        Description of Goods
                      </th>
                      <td>
                        <b>:</b>
                        {props.bill.goodsDescription}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  padding: "5px",
                  margin: "3px",
                  marginTop: "30px",
                  border: " 2px solid #000000",
                }}
              >
                <table
                  className={classes.table}
                  cellSpacing="0"
                  cellPadding="0"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <th style={{ textAlign: "left", paddingBottom: "10px" }}>
                        <u>
                          <b>Enclosure</b>
                        </u>
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          paddingBottom: "10px",
                        }}
                      >
                        <u>
                          <b>Type</b>
                        </u>
                      </th>
                    </tr>
                    {props.bill.docList.map((item, i) => {
                      return (
                        <tr key={item.doc_name + i}>
                          <td style={{ textTransform: "capitalize" }}>
                            {item.doc_name}{" "}
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.doc_type}{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  left: "20px",
                  right: "20px",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <i>
                    <u>
                      <b>Reciever's Signature</b>
                    </u>
                  </i>
                </div>
                <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                  <b>Date:</b> ........................
                </div>
              </div>
            </td>

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
                    {list
                      ? list.map((val, index) => {
                          return (
                            <>
                              <tr>
                                <th
                                  style={{
                                    borderBottom: "0",
                                    textAlign: "left",
                                    padding: "5px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  {!props.bill.isPaid ? (
                                    <Tooltip
                                      title={
                                        "Removing this category will effect the balance"
                                      }
                                      placement={"top"}
                                      enterDelay={500}
                                    >
                                      <IconButton
                                        id="delete-button"
                                        size={"small"}
                                        // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                                        className={
                                          classes.TableDeleteActionButton
                                        }
                                        onClick={() =>
                                          props.handleTitleDelete(val)
                                        }
                                      >
                                        <DeleteIcon fontSize={"small"} />
                                      </IconButton>
                                    </Tooltip>
                                  ) : (
                                    ""
                                  )}
                                  {index + 1}. {val}
                                </th>
                                <td style={{ borderBottom: "0" }}></td>
                              </tr>
                              {particularCharges[val]
                                ? particularCharges[val].list.map((item, i) => {
                                    return (
                                      <tr key={`${val}-${i}`}>
                                        <td
                                          style={{
                                            paddingLeft: "25px",
                                            borderBottom: "1px dotted #000000",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          {!props.bill.isPaid ? (
                                            <Tooltip
                                              title={
                                                "Removing this particular will effect the balance"
                                              }
                                              placement={"top"}
                                              enterDelay={500}
                                            >
                                              <IconButton
                                                id="delete-button"
                                                size={"small"}
                                                // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                                                className={
                                                  classes.TableDeleteActionButton
                                                }
                                                onClick={() =>
                                                  props.handleSubDelete(item)
                                                }
                                              >
                                                <DeleteIcon
                                                  fontSize={"small"}
                                                />
                                              </IconButton>
                                            </Tooltip>
                                          ) : (
                                            ""
                                          )}
                                          <DescriptionIcon fontSize={"small"} />
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
                                            {props.type === "REGULAR_VOUCHER" ||
                                            props.type === "VOUCHER"
                                              ? item.actual_amount
                                              : item.customer_amount}
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                : ""}
                              <tr>
                                <td></td>
                                <td style={{ textAlign: "right" }}>
                                  <div
                                    style={{
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    <b>
                                      <u>{particularCharges[val].total}</u>
                                    </b>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      : ""}
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
              Total Amount :
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
                {parseFloat(overallTotal).toFixed(2)}
              </label>
            </td>
          </tr>
          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              {!props.bill.isPaid ? (
                <Tooltip
                  title={"Remove Advance"}
                  placement={"top"}
                  enterDelay={500}
                >
                  <IconButton
                    id="delete-button"
                    size={"small"}
                    // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                    className={classes.TableDeleteActionButton}
                    onClick={() => props.handleAdvanceRemove()}
                  >
                    <DeleteIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              Less C&F IT/Advance :
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
                {props.type === "REGULAR_VOUCHER" || props.type === "VOUCHER"
                  ? 0.0
                  : parseFloat(props.bill.customerPaid).toFixed(2)}
              </label>
            </td>
          </tr>
          <tr className={classes.tableBorder}>
            <th
              parent=""
              style={{ height: "20px", textAlign: "right", padding: "2px" }}
            >
              Balance :
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
                {parseFloat(dueAmount).toFixed(2)}
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
          {Converter.toWords(parseFloat(dueAmount).toFixed(2))} Taka Only
        </label>
      </div>
      <div style={{ marginTop: "5px" }}>
        <b>Note: </b> {props.bill.note}{" "}
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

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BillDetail: {},
      Company: {},
      PrintType: "",
      ready: false,
    };

    this.CallApis = this.CallApis.bind(this);
    this.handleSubDelete = this.handleSubDelete.bind(this);
    this.handleTitleDelete = this.handleTitleDelete.bind(this);
    this.handleAdvanceRemove = this.handleAdvanceRemove.bind(this);
    this.mapFindReturn = this.mapFindReturn.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    
  }

  async CallApis() {
    const billId = this.props.match.params.bill_id;
    const from = this.props.match.params.from;
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
      APP.ENV.URL.API.ROOT + `/company/${from}/detail?id=${billId}`,
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    Promise.all([
      bill,
      company,
      currencyList,
      portList,
      unitList,
      clientList,
      supplierList,
    ])
      .then((response) => {
        const [
          billResponse,
          companyResponse,
          currencyResponse,
          portResponse,
          unitResponse,
          clientResponse,
          supplierResponse,
        ] = response;

        if (billResponse.data.success) {
          let $billDetail = from === "import" ? billResponse.data.import_bill_list : billResponse.data.Export;
          this.setState({
            BillDetail: {
              isPaid: $billDetail.full_paid === 1,
              code: $billDetail.bill_code,
              billDate: moment($billDetail.bill_date, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              ),
              supplier: this.mapFindReturn(
                supplierResponse.data.supplier_list,
                $billDetail.supplier_id,
                "id",
                "Name"
              ),
              clientName: this.mapFindReturn(
                clientResponse.data.client_list,
                $billDetail.client_id,
                "id",
                "Name"
              ),
              clientAddress: $billDetail.client_address,
              goodsDescription: $billDetail.goods_description,
              note: $billDetail.bill_note,
              docList:
                $billDetail.enc_docs === "enc_docs"
                  ? []
                  : JSON.parse($billDetail.enc_docs),

              lcNo: $billDetail.lc_no,
              lcDate:
                $billDetail.lc_date !== "null"
                  ? moment($billDetail.lc_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              beNo: $billDetail.be_no,
              beDate:
                $billDetail.be_date !== "null"
                  ? moment($billDetail.be_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              invoiceNo: $billDetail.invoice_no,
              invoiceDate:
                $billDetail.invoice_date !== "null"
                  ? moment($billDetail.invoice_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,

              currency: this.mapFindReturn(
                currencyResponse.data.currencies,
                $billDetail.currency_id,
                "id",
                "Name"
              ),
              currencyRate: $billDetail.currency_rate,
              invoiceValue: $billDetail.invoice_value,
              grossWeight: $billDetail.gross_weight,
              netWeight: $billDetail.net_weight,
              unit: this.mapFindReturn(
                unitResponse.data.units,
                $billDetail.unit_id,
                "id",
                "Name"
              ),
              quantity: $billDetail.quantity,
              carrier: $billDetail.carrier,
              port: this.mapFindReturn(
                portResponse.data.ports,
                $billDetail.port_id,
                "id",
                "Name"
              ),
              commodity: $billDetail.commodity,
              aValue: $billDetail.a_value,
              mawbNo: $billDetail.mawb_no,
              mawbDate:
                $billDetail.mawb_date !== "null"
                  ? moment($billDetail.mawb_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              hawbNo: $billDetail.hawb_no,
              hawbDate:
                $billDetail.hawb_date !== "null"
                  ? moment($billDetail.hawb_date, "DD-MM-YYYY").format(
                      "DD/MM/YYYY"
                    )
                  : null,
              particulars:
                $billDetail.particulars_charges === "particulars_charges"
                  ? []
                  : JSON.parse($billDetail.particulars_charges),
              customerTotal: $billDetail.total_amount,
              customerPaid: $billDetail.paid_amount,
              cutomerDue: $billDetail.due_amount,
              attachments:
                $billDetail.attachments === "attachments"
                  ? []
                  : JSON.parse($billDetail.attachments),
              hasEditPermission: $billDetail.HasEditPermission,
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

  handleSubDelete = (obj) => {
    const newParticular = [...this.state.BillDetail.particulars];
    newParticular.splice(obj.index, 1);
    this.setState({
      BillDetail: {
        ...this.state.BillDetail,
        particulars: newParticular,
      },
    });
  };
  handleTitleDelete = (obj) => {
    let filteredItems = this.state.BillDetail.particulars.filter((item) => {
      return item.category_name !== obj;
    });
    this.setState({
      BillDetail: {
        ...this.state.BillDetail,
        particulars: filteredItems,
      },
    });

    // this.calculate(props.GlobalData.Particulars.paidAmount, filteredItems);
  };

  handleAdvanceRemove = () => {
    this.setState({
      BillDetail: {
        ...this.state.BillDetail,
        customerPaid: 0.0,
      },
    });
  };

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
            handleSubDelete={this.handleSubDelete}
            handleTitleDelete={this.handleTitleDelete}
            handleAdvanceRemove={this.handleAdvanceRemove}
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
    GlobalData: state.ImportBill,
    CompanyData: state.Company,
  };
};

export default connect(mapStateToProps)(Report);
