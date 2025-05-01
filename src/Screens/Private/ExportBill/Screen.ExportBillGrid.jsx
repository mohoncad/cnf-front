import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { APP } from "../../../App/AppProvider";

import "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PrintIcon from "@material-ui/icons/Print";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import AutoCompleteSelect from "../../../Components/Private/AutoCompleteSelect/AutoCompleteSelect";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  HandleBranchList,
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  ResetForm,
  HandleCode,
  HandleBillId,
  HandleClientList,
  HandleSupplierList,
  HandlePrintType,
  HandleDocumentList,
  HandleCurrencyList,
  HandlePortList,
  HandleUnitList,
  HandleBankList,
  HandleChargeCategory,
  HandleChargeHead,
} from "../../../Global/Data/Actions/Private/ImportBill/ImportBill.Action";

import {
  HandleName,
  HandlePhone,
  HandleEmail,
  HandleSite,
  HandleAddress,
  HandleLogo,
} from "../../../Global/Data/Actions/Private/Company/Company.Action";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const Auth = APP.SERVICES.AUTH;
const APPUAP = new APP.SERVICES.UAP();

const noLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwSGGfwg7rhSagWK4LfDiAqhLq70ljOTKzg&usqp=CAU";
const styles = {
  ActiveStatusIcon: {
    color: "green",
    fontSize: "16px",
  },
  BlockedStatusIcon: {
    color: "red",
    fontSize: "16px",
  },
  pageJumpTextField: {
    width: "60px",
    textAlign: "center",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  paper: {
    maxWidth: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 10,
    supplierSelect: "none",
    msBillSelect: "none",
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  TableHead: {
    border: "1px solid #dddddd",
    fontWeight: "bold",
    background: APP.CONFIG.COLORS.PRIMARY,
    color: "#ffffff",
  },
  TableCell: {
    border: "1px solid #dddddd",
  },
  TableActionButton: {
    fontWeight: "bold",
    color: APP.CONFIG.COLORS.PRIMARY,
  },
  TableDeleteActionButton: {
    fontWeight: "bold",
    color: APP.CONFIG.COLORS.ACTION_BTN.DANGER,
  },
}));
const createData = (
  sn,
  id,
  code,
  date,
  supplier,
  client,
  customer_total,
  vouchar_total,
  status,
  deleted_by,
  deleted_at
) => {
  return {
    sn,
    id,
    code,
    date,
    supplier,
    client,
    customer_total,
    vouchar_total,
    status,
    deleted_by,
    deleted_at,
  };
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = () => [
  {
    id: "sn",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "#",
    visible: true,
  },
  {
    id: "code",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Bill Code",
    visible: true,
  },
  {
    id: "date",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Date (DD/MM/YYYY)",
    visible: true,
  },
  {
    id: "supplier",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Supplier",
    visible: true,
  },
  {
    id: "client",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Client",
    visible: true,
  },
  {
    id: "customer_total",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Customer Total",
    visible:
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15])
        .CustomerAmountView
    ) === 1,
  },
  {
    id: "voucher_total",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Voucher Total",
    visible:
      Number(
        APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15])
          .ActualAmountView
      ) === 1,
  },
  {
    id: "status",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Status",
    visible: true,
  },
  {
    id: "deleted_by",
    align: "left",
    disablePadding: false,
    TrashModeOnly: true,
    label: "Deleted By",
    visible: true,
  },
  {
    id: "deleted_at",
    align: "left",
    disablePadding: false,
    TrashModeOnly: true,
    label: "Deleted At",
    visible: true,
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Action",
    visible: true,
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells().map((headCell) => (
          <React.Fragment key={headCell.id}>
            {!headCell.TrashModeOnly && headCell.visible && (
              <TableCell
                className={classes.TableHead}
                align={headCell.align}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}

            {props.trashMode && headCell.TrashModeOnly && headCell.visible &&(
              <TableCell
                className={classes.TableHead}
                align={headCell.align}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )}
          </React.Fragment>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  trashMode: PropTypes.bool.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const ContextMenuInitialState = {
  mouseX: null,
  mouseY: null,
};

function ExportBillListTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowId, setRowId] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [ContextMenu, setContextMenu] = React.useState(ContextMenuInitialState);
  const [ContextMenuAction, setContextMenuAction] = React.useState({
    view: () => {},
    edit: () => {},
    delete: () => {},
    restore: () => {},
  });
  const [ContextMenuActionID, setContextMenuActionID] = React.useState(0);
  const [viewPermission, setViewPermission] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15]).View
    ) === 1
  );
  const [deletePermission, setDeletePermission] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15]).Delete
    ) === 1
  );
  const [editPermission, setEditPermission] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15]).Edit
    ) === 1
  );
  const [restorePermission, setRestore] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15]).Restore
    ) === 1
  );
  const [deleteForever, setDeleteForever] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15]).DeleteForever
    ) === 1
  );

  const [actualPermission, setActualAmountPermission] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15])
        .ActualAmountView
    ) === 1
  );
  const [customerPermission, setCustomerPermission] = React.useState(
    Number(
      APPUAP.GetModulePermissions(APP.CONFIG.MODULE[15])
        .CustomerAmountView
    ) === 1
  );
  const handleOpenContextMenu = (event, action, action_id) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });

    setContextMenuAction(action);
    setContextMenuActionID(action_id);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(ContextMenuInitialState);
  };

  const handlePrintMenu = (event, id, code) => {
    setRowId(id);
    setCode(code);
    setAnchorEl(event.currentTarget);
  };
  const handlePrint = (type, mode) => {
    // props.onViewAction(mode, rowId, code);
    props.onPrintAction(type, rowId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const auth_supplier = new APP.SERVICES.SessionBill().GetProfile

  return (
    <div className={classes.root}>
      <TableContainer onContextMenu={(e) => e.preventDefault()}>
        <Table size={"small"} className={classes.table}>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            trashMode={props.trashMode}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {stableSort(props.rows, getComparator(order, orderBy)).map(
              (row, index) => {
                // const HasMasterSupplierRestriction = (Number(auth_supplier.IsMasterSupplier) === 0 && row.master_supplier);
                // const DeleteDisabled = Number(auth_supplier.id) === Number(row.id);

                return (
                  <TableRow
                    key={row.id}
                    hover
                    onContextMenu={(e) =>
                      handleOpenContextMenu(
                        e,
                        {
                          view: () => {
                            props.onViewAction("VIEW", row.id, row.code);
                            handleCloseContextMenu();
                          },
                          edit: () => {
                            props.onEditAction("EDIT", row.id, row.code);
                            handleCloseContextMenu();
                          },
                          delete: () => {
                            props.onDeleteAction(row.id);
                            handleCloseContextMenu();
                          },
                          restore: () => {
                            props.onRestoreAction(row.id);
                            handleCloseContextMenu();
                          },
                        },
                        row.id
                      )
                    }
                    onDoubleClick={() => {
                      if (!props.TrashMode) {
                        if(viewPermission) {
                          props.onViewAction("VIEW", row.id, row.code);
                        }
                      }
                    }}
                  >
                    <TableCell
                      align="left"
                      component="th"
                      scope="row"
                      className={classes.TableCell}
                    >
                      {row.sn}
                    </TableCell>
                    <TableCell align="left" className={classes.TableCell}>
                      {row.code}
                    </TableCell>
                    <TableCell align="left" className={classes.TableCell}>
                      {row.date}
                    </TableCell>
                    <TableCell align="left" className={classes.TableCell}>
                      {row.supplier}
                    </TableCell>
                    <TableCell align="left" className={classes.TableCell}>
                      {row.client}
                    </TableCell>
                    {actualPermission && (
                      <TableCell align="left" className={classes.TableCell}>
                        {row.customer_total}
                      </TableCell>
                    )}
                    {customerPermission && (
                      <TableCell align="left" className={classes.TableCell}>
                        {row.vouchar_total}
                      </TableCell>
                    )}
                    <TableCell align="left" className={classes.TableCell}>
                      {row.status ? "Pending" : "Paid"}
                    </TableCell>
                    {props.trashMode && (
                      <React.Fragment>
                        <TableCell align="left" className={classes.TableCell}>
                          {row.deleted_by}
                        </TableCell>
                        <TableCell align="left" className={classes.TableCell}>
                          {row.deleted_at}
                        </TableCell>
                      </React.Fragment>
                    )}

                    <TableCell align="center" className={classes.TableCell}>
                      {!props.trashMode && (
                        <React.Fragment>
                          {(actualPermission || customerPermission) && (
                            <Tooltip
                              title={"Print"}
                              placement={"top"}
                              enterDelay={500}
                            >
                              <IconButton
                                size={"small"}
                                // disabled={HasMasterSupplierRestriction}
                                //   className={classes.TableActionButton}
                                onClick={(event) =>
                                  handlePrintMenu(event, row.id, row.code)
                                }
                              >
                                <PrintIcon fontSize={"small"} />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            {actualPermission && (
                              <MenuItem
                                onClick={() => handlePrint("VOUCHER", "PRINT")}
                              >
                                Print Voucher
                              </MenuItem>
                            )}

                            {actualPermission && (
                              <MenuItem
                                onClick={() =>
                                  handlePrint("REGULAR_VOUCHER", "PRINT")
                                }
                              >
                                Print Regular Voucher
                              </MenuItem>
                            )}
                            {customerPermission && (
                              <MenuItem
                                onClick={() =>
                                  handlePrint("CUSTOMER_BILL", "PRINT")
                                }
                              >
                                Print Customer Bill
                              </MenuItem>
                            )}
                            {customerPermission && (
                              <MenuItem
                                onClick={() =>
                                  handlePrint("REGULAR_CUSTOMER_BILL", "PRINT")
                                }
                              >
                                Print Regular Customer Bill
                              </MenuItem>
                            )}
                          </Menu>
                          &nbsp;&nbsp;
                          {viewPermission && (
                          <Tooltip
                            title={"View"}
                            placement={"top"}
                            enterDelay={500}
                          >
                            <IconButton
                              size={"small"}
                              // disabled={HasMasterSupplierRestriction}
                              className={classes.TableActionButton}
                              onClick={() =>
                                props.onViewAction("VIEW", row.id, row.Code)
                              }
                            >
                              <VisibilityIcon fontSize={"small"} />
                            </IconButton>
                          </Tooltip>
                          )}
                          &nbsp;&nbsp;
                          {editPermission && (
                          <Tooltip
                            title={"Edit"}
                            placement={"top"}
                            enterDelay={500}
                          >
                            <IconButton
                              size={"small"}
                              // disabled={HasMasterSupplierRestriction}
                              className={classes.TableActionButton}
                              onClick={() =>
                                props.onEditAction("EDIT", row.id, row.Code)
                              }
                            >
                              <EditIcon fontSize={"small"} />
                            </IconButton>
                          </Tooltip>)}
                          &nbsp;&nbsp;
                          {deletePermission && (
                          <Tooltip
                            title={"Delete"}
                            placement={"top"}
                            enterDelay={500}
                          >
                            <IconButton
                              size={"small"}
                              // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                              className={classes.TableDeleteActionButton}
                              onClick={() => props.onDeleteAction(row.id)}
                            >
                              <DeleteIcon fontSize={"small"} />
                            </IconButton>
                          </Tooltip>)}
                        </React.Fragment>
                      )}

                      {props.trashMode && (
                        <React.Fragment>
                           {restorePermission && (
                          <Tooltip
                            title={"Restore"}
                            placement={"top"}
                            enterDelay={500}
                          >
                            <IconButton
                              size={"small"}
                              className={classes.TableActionButton}
                              onClick={() => props.onRestoreAction(row.id)}
                            >
                              <RestoreFromTrashIcon fontSize={"small"} />
                            </IconButton>
                          </Tooltip>)}
                          &nbsp;&nbsp;
                          {deleteForever && (
                          <Tooltip
                            title={"Delete Forever"}
                            placement={"top"}
                            enterDelay={500}
                          >
                            <IconButton
                              size={"small"}
                              className={classes.TableDeleteActionButton}
                              onClick={() => props.onDeleteAction(row.id)}
                            >
                              <DeleteForeverIcon fontSize={"small"} />
                            </IconButton>
                          </Tooltip>)}
                        </React.Fragment>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>

        {/* Context menu for table rows */}
        <Menu
          keepMounted
          elevation={4}
          open={ContextMenu.mouseY !== null}
          onClose={handleCloseContextMenu}
          onContextMenu={handleCloseContextMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            ContextMenu.mouseY !== null && ContextMenu.mouseX !== null
              ? { top: ContextMenu.mouseY, left: ContextMenu.mouseX }
              : undefined
          }
          PaperProps={{
            style: {
              width: "20ch",
            },
          }}
          TransitionComponent={Fade}
        >
          {!props.trashMode && (
            <div>
              {viewPermission && (
                <MenuItem onClick={ContextMenuAction.view}>View</MenuItem>
              )}
              {editPermission && (
                <MenuItem onClick={ContextMenuAction.edit}>Edit</MenuItem>
              )}
              {deletePermission && (
                <MenuItem onClick={ContextMenuAction.delete}>Delete</MenuItem>
              )}
            </div>
          )}

          {props.trashMode && (
            <div>
              {
                restorePermission && <MenuItem onClick={ContextMenuAction.restore}>Restore</MenuItem>
              }
              {
                deleteForever && <MenuItem onClick={ContextMenuAction.delete}>
                Delete Forever
              </MenuItem>
              } 
            </div>
          )}
        </Menu>
      </TableContainer>
    </div>
  );
}

ExportBillListTable.propTypes = {
  rows: PropTypes.array.isRequired,
  trashMode: PropTypes.bool.isRequired,
  onEditAction: PropTypes.func.isRequired,
  onViewAction: PropTypes.func.isRequired,
  onDeleteAction: PropTypes.func.isRequired,
  onRestoreAction: PropTypes.func.isRequired,
  onPrintAction: PropTypes.func.isRequired,
};

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * --------------------------------------------------------------------------
       * Core States
       */
      __FaShow: false,
      __FaType: "",
      __FaMessage: "",
      __FaDuration: "",
      __FaVerticalAlign: "",
      __FaHorizontalAlign: "",

      __FaProgressBarShow: false,
      __FaProgressBarType: "",
      __FaProgressBarMessage: "",
      __FaProgressBarVerticalAlign: "",
      __FaProgressBarHorizontalAlign: "",

      __PromptDialogShow: false,
      __PromptDialogTargetActionName: "",
      __PromptDialogTargetActionID: "",
      __PromptDialogTitle: "",
      __PromptDialogMessage: "",
      /**
       * Core States End
       * --------------------------------------------------------------------------
       */

      ModuleIndex: 1,
      TrashViewPermission:
        Number(
          new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[15])
            .Trash
        ) === 1,
      GridTrashMode: false,
      GridFilterMode: false,
      AddPermission:
      Number(
        new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[15])
          .Add
      ) === 1,
      SearchQuery: "",

      DataStatusList: [
        { id: 1, title: "Active" },
        { id: 2, title: "Banned" },
      ],
      DataSelectedStatus: 0,

      DataTotalRowsCount: 0,
      DataGridInitPageNumber: 1,
      DataGridCurrentPageNumber: 1,
      DataGridPrevPageNumber: 0,
      DataGridNextPageNumber: 0,
      DataGridRowsPerPage: 20,
      DataTotalPages: 0,
      TmpPageToJump: 0,

      FirstGridIndex: 0,
      LastGridIndex: 0,
      Offset: 0,

      PageListArray: [],

      DataGridRows: [],
    };

    /**
     * ---------------------------------------------------------------------------------
     * Core Method Bindings
     */
    this.__SetFA = this.__SetFA.bind(this);
    this.__RemoveFA = this.__RemoveFA.bind(this);
    this.__SetFAP = this.__SetFAP.bind(this);
    this.__RemoveFAP = this.__RemoveFAP.bind(this);
    this.__PD = this.__PD.bind(this);
    this.__PDRunAction = this.__PDRunAction.bind(this);
    /**
     * Core Method Binding Ends
     * ---------------------------------------------------------------------------------
     */

   
     this.OpenForm = this.OpenForm.bind(this);

     this.ToggleTrashMode = this.ToggleTrashMode.bind(this);
     this.ToggleFilterMode = this.ToggleFilterMode.bind(this);
 
     this.handleSelectStatus = this.handleSelectStatus.bind(this);
 
     this.handleGridDeleteAction = this.handleGridDeleteAction.bind(this);
     this.handleGridRestoreAction = this.handleGridRestoreAction.bind(this);
     this.handlePrintAction = this.handlePrintAction.bind(this);
     this.TryBillRestore = this.TryBillRestore.bind(this);
 
     this.TryBillDelete = this.TryBillDelete.bind(this);
 
     this.GetGridList = this.GetGridList.bind(this);
     this.GetAll = this.GetAll.bind(this);
 
     this.handleFetchFirstPage = this.handleFetchFirstPage.bind(this);
     this.handleFetchPrevPage = this.handleFetchPrevPage.bind(this);
     this.handleFetchNextPage = this.handleFetchNextPage.bind(this);
     this.handleFetchLastPage = this.handleFetchLastPage.bind(this);
 
     this.handleFetchSearchResult = this.handleFetchSearchResult.bind(this);
     this.handleChangeGridRowsPerPage =
       this.handleChangeGridRowsPerPage.bind(this);
 
     this.handleUpdateCurrentPage = this.handleUpdateCurrentPage.bind(this);
 
     this.handleUpdateTmpPageToJump = this.handleUpdateTmpPageToJump.bind(this);
  }

  /**
   * ---------------------------------------------------------------------------------
   * Core Method Declaration
   */
  __SetFA(type, message, duration, verticalAlign, horizontalAlign) {
    this.__RemoveFAP();

    type = typeof type === "undefined" ? "" : type;
    message = typeof message === "undefined" ? "" : message;
    duration = typeof duration === "undefined" ? "" : duration;
    verticalAlign = typeof verticalAlign === "undefined" ? "" : verticalAlign;
    horizontalAlign =
      typeof horizontalAlign === "undefined" ? "" : horizontalAlign;

    this.setState(
      {
        __FaShow: false,
        __FaType: "",
        __FaMessage: "",
        __FaDuration: "",
        __FaVerticalAlign: "",
        __FaHorizontalAlign: "",
      },
      () => {
        this.setState({
          __FaShow: true,
          __FaType: type,
          __FaMessage: message,
          __FaDuration: duration === "" ? 0 : Number(duration),
          __FaVerticalAlign: verticalAlign,
          __FaHorizontalAlign: horizontalAlign,
        });
      }
    );
  }

  __RemoveFA() {
    this.setState({
      __FaShow: false,
      __FaType: "",
      __FaMessage: "",
      __FaDuration: "",
      __FaVerticalAlign: "",
      __FaHorizontalAlign: "",
    });
  }

  __SetFAP(type, message, verticalAlign, horizontalAlign) {
    this.__RemoveFA();

    this.setState(
      {
        __FaProgressBarShow: false,
        __FaProgressBarType: "",
        __FaProgressBarMessage: "",
        __FaProgressBarVerticalAlign: "",
        __FaProgressBarHorizontalAlign: "",
      },
      () => {
        this.setState({
          __FaProgressBarShow: true,
          __FaProgressBarType: type,
          __FaProgressBarMessage: message,
          __FaProgressBarVerticalAlign: verticalAlign,
          __FaProgressBarHorizontalAlign: horizontalAlign,
        });
      }
    );
  }

  __RemoveFAP() {
    this.setState({
      __FaProgressBarShow: false,
      __FaProgressBarType: "",
      __FaProgressBarMessage: "",
      __FaProgressBarVerticalAlign: "",
      __FaProgressBarHorizontalAlign: "",
    });
  }

  __PD(action_name, action_id, title, message) {
    this.setState(
      {
        __PromptDialogShow: false,
        __PromptDialogTitle: "",
        __PromptDialogMessage: "",
        __PromptDialogTargetActionName: "",
        __PromptDialogTargetActionID: "",
      },
      () => {
        this.setState({
          __PromptDialogShow: true,
          __PromptDialogTitle: title,
          __PromptDialogMessage: message,
          __PromptDialogTargetActionName: action_name,
          __PromptDialogTargetActionID: action_id,
        });
      }
    );
  }

  __PDRunAction() {
    let action_name = this.state.__PromptDialogTargetActionName;
    let action_id = this.state.__PromptDialogTargetActionID;

    //call your callback confirm functions here
    if (action_name === "DeleteBill") {
      this.TryBillDelete(action_id);
    }

    if (action_name === "RestoreBill") {
      this.TryBillRestore(action_id);
    }
  }

  /**
   * Core Method Declaration Ends
   * ---------------------------------------------------------------------------------
   */

  OpenForm(FormMode, ActionId) {
    if(!this.state.GridTrashMode) {
      this.props.func.HandleFormOpen(true);
      this.props.func.HandleFormMode(FormMode);
      this.props.func.HandleBillId(ActionId);
    }
  }

  ToggleTrashMode() {
    this.setState(
      (state) => ({
        GridTrashMode: !state.GridTrashMode,
      }),
      () => {
        this.setState({ DataGridRows: [] });
        this.GetGridList();
      }
    );
  }

  ToggleFilterMode() {
    this.setState(
      (state) => ({
        GridFilterMode: !state.GridFilterMode,
      }),
      () => {
        if (!this.state.GridFilterMode) {
          this.GetGridList();
        }
      }
    );

    //Clear the previous selected values as usually
    this.setState({
      DataSelectedStatus: 0,
    });
  }

  handleSelectStatus(Status) {
    this.setState({
      DataSelectedStatus: Status,
    });
  }

  handleGridDeleteAction(BillID) {
    let title = this.state.GridTrashMode ? "Attention!" : "Delete Bill";
    let message = this.state.GridTrashMode
      ? "By pressing the OK button, this action can not be reversed! Are you sure to permanently delete this bill?"
      : "Are you sure to delete this bill?";
    this.__PD("DeleteBill", BillID, title, message);
  }

  handleGridRestoreAction(BillID) {
    this.__PD(
      "RestoreBill",
      BillID,
      "Restore Bill ",
      "Are you sure to restore this bill?"
    );
  }

  /**
   * Try to delete a bill
   */
  TryBillDelete(BillID) {
    this.__SetFAP("general", "Loading", "top", "center");
    axios
      .delete(APP.ENV.URL.API.ROOT + "/company/export/delete", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        data: {
          id: BillID,
          trash_mode: this.state.GridTrashMode.toString(),
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);

          this.GetGridList(false);
        } else {
          this.__SetFA("error", response.data.message, 5000);
        }
      })
      .catch((error) => {
        this.__RemoveFAP();

        if (error.response) {
          if (error.response.status === 401) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            this.__SetFA("error", error.response.data.message);
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  /**
   * Try to restore a bill
   */
  TryBillRestore(BillID) {
    this.__SetFAP("general", "Loading", "top", "center");
    axios
      .put(
        APP.ENV.URL.API.ROOT + "/company/export/restore",
        {
          id: BillID,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);

          this.GetGridList(false);
        } else {
          this.__SetFA("error", response.data.message, 5000);
        }
      })
      .catch((error) => {
        this.__RemoveFAP();

        if (error.response) {
          if (error.response.status === 401) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            this.__SetFA("error", error.response.data.message);
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  /**
   * Get the Grid data and bind data to the state for the table
   * @constructor
   */

  GetGridList(FAPShow = true) {
    if (FAPShow) {
      this.__SetFAP("general", "Loading", "top", "center");
    }

    /**
     * Data variables
     * Used to send parameters in the xhr request
     */
    let $row_limit = this.state.DataGridRowsPerPage,
      $current_page_number = this.state.DataGridCurrentPageNumber,
      $search_query = this.state.SearchQuery,
      $offset = this.state.Offset;

    /**
     * Make a request to get the available data for the data grid table
     * @return array || object
     */
    let url =
      APP.ENV.URL.API.ROOT +
      "/company/export?row_limit=" +
      $row_limit +
      "&page=" +
      $current_page_number +
      "&search_query=" +
      $search_query +
      "&offset=" +
      $offset +
      "&trash_mode=" +
      this.state.GridTrashMode;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          let $ResponseData = response.data;

          let $DataGridRows = [];
          let $GridData = $ResponseData.export;

          let $sn = this.state.FirstGridIndex;
          for (let $i = 0; $i < $GridData.length; $i++) {
            if ($i === 0) {
              this.setState({ FirstGridIndex: $sn });
            }
            $sn++;

            let $sn_output = $sn > 0 && $sn < 10 ? "0" + $sn : $sn;
            let id = $GridData[$i].id;
            let bill_code = $GridData[$i].bill_code;
            let date = moment($GridData[$i].CreatedAt).format("DD/MM/YYYY");
            let supplier = $GridData[$i].supplier_name;

            let client = $GridData[$i].client_name;

            let customer_total = $GridData[$i].total_amount;
            let vouchar_total = $GridData[$i].voucher_total;

            let status = Number($GridData[$i].full_paid) === 0;
            let deleted_by = $GridData[$i].DeletedBy;
            let deleted_at = $GridData[$i].DeletedAt;
            let $DataObject = createData(
              $sn_output,
              id,
              bill_code,
              date,
              supplier,
              client,
              customer_total,
              vouchar_total,
              status,
              deleted_by,
              deleted_at
            );
            $DataGridRows.push($DataObject);
          }

          this.setState({ LastGridIndex: $sn });

          //alert(this.state.FirstGridIndex +"-"+ this.state.LastGridIndex);

          let CurrentPageNo = Math.ceil(
            this.state.LastGridIndex / this.state.DataGridRowsPerPage
          );

          //Must check undefined status here
          //As it catches TypeError on boot loading and throws as network error
          if (typeof document.forms["PageJumpForm"] !== "undefined") {
            document.forms["PageJumpForm"]["PageNumber"].value = CurrentPageNo;
          }

          //alert("CurrentPageNo :" + CurrentPageNo);

          let TotalPages = Math.ceil(
            $ResponseData.total_rows / this.state.DataGridRowsPerPage
          );
          let PrevPageNo = CurrentPageNo <= 1 ? 0 : CurrentPageNo - 1;
          let NextPageNo = CurrentPageNo >= TotalPages ? 0 : CurrentPageNo + 1;
          //alert("PrevPageNo: " + PrevPageNo + " NextPageNo: "+ NextPageNo);
          this.setState({
            DataTotalRowsCount: $ResponseData.total_rows,
            DataGridRows: $DataGridRows,
            DataGridCurrentPageNumber: CurrentPageNo,
            DataGridPrevPageNumber: PrevPageNo,
            DataGridNextPageNumber: NextPageNo,
            DataTotalPages: TotalPages,
          });
        }
      })
      .catch((error) => {
        this.__RemoveFAP();

        if (error.response) {
          if (error.response.status === 401) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            this.__SetFA("error", error.response.data.message);
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          console.log(error);
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  async GetCompanyInfo() {
    this.__SetFAP("general", "Loading", "top", "center");
    const $company_id = new APP.SERVICES.SessionUser(this.props).GetProfile()
      .CompanyID;
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/detail?id=" + $company_id, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.props.func.HandleCompanyName(response.data.company.Name);
          this.props.func.HandleCompanyPhone(
            response.data.company.ContactNumber
          );
          this.props.func.HandleCompanyEmail(response.data.company.Email);
          this.props.func.HandleCompanySite(response.data.company.WebAddress);
          this.props.func.HandleCompanyAddress(response.data.company.Address1);
          this.props.func.HandleCompanyLogo(
            response.data.company.Logo ?? noLogo
          );
        }
      })
      .catch((error) => {
        this.__RemoveFAP();

        if (error.response) {
          if (error.response.status === 401) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            this.__SetFA("error", error.response.data.message);
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  GetAll() {
    // const client = axios.get(
    //   APP.ENV.URL.API.ROOT + "/company/clients/free_list",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${Auth.getToken()}`,
    //     },
    //   }
    // );

    // const supply = axios.get(
    //   APP.ENV.URL.API.ROOT + "/company/suppliers/free_list",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${Auth.getToken()}`,
    //     },
    //   }
    // );

    // Promise.all([client, supply])
    //   .then((res) => {
    //     const [tempClientList, tempSupplyList] = res;
    //     if (tempClientList.data.success) {
    //       this.props.func.HandleClientList(tempClientList.data.client_list);
    //     }

    //     if (tempSupplyList.data.success) {
    //       this.props.func.HandleSupplierList(tempSupplyList.data.supplier_list);
    //     }
    //   })
    //   .catch((error) => {
    //     this.__RemoveFAP();

    //     if (error.response) {
    //       if (error.response.status === 401) {
    //         Auth.remove(this.props);
    //       }

    //       if (error.response.status === 403) {
    //         this.__SetFA("error", error.response.data.message);
    //         new APP.SERVICES.UAP().Initialize();
    //       }
    //     } else {
    //       new APP.SERVICES.NETWORK_FAILURE().SetError();
    //     }
    //   });
  }

  handleChangeGridRowsPerPage(e) {
    //alert("Rows Per Page Change Event Call");

    let $Offset = 0,
      $LastGridIndex = this.state.LastGridIndex,
      $TotalRecord = this.state.DataTotalRowsCount;

    if ($LastGridIndex === $TotalRecord) {
      if (e.target.value > $TotalRecord) {
        $Offset = 0;
        this.setState({
          FirstGridIndex: 0,
        });
      } else {
        $Offset = $TotalRecord - e.target.value;
        this.setState({
          FirstGridIndex: $TotalRecord - e.target.value,
        });
      }
    } else {
      $Offset = this.state.FirstGridIndex;
    }

    this.setState((state) => ({
      DataGridRowsPerPage: e.target.value,
      Offset: $Offset,
    }));
  }

  handleFetchSearchResult(e) {
    e.preventDefault();

    let $SearchQuery =
      document.forms["ExportBillListSearchForm"]["search_query"].value.trim();

    this.setState({
      DataGridCurrentPageNumber: this.state.DataGridInitPageNumber,
      SearchQuery: $SearchQuery,
    });
  }

  handleFetchFirstPage() {
    //alert("First Page Event Call");
    this.setState(
      {
        DataGridCurrentPageNumber: this.state.DataGridInitPageNumber,
        Offset: 0,
        FirstGridIndex: 0,
      },
      () => {
        this.GetGridList();
      }
    );
  }

  handleFetchPrevPage() {
    //alert("Previous Page Event Call");
    let startIndex = 0;
    if (this.state.FirstGridIndex < this.state.DataGridRowsPerPage) {
      startIndex = 0;
    } else {
      startIndex = this.state.FirstGridIndex - this.state.DataGridRowsPerPage;
    }
    this.setState(
      {
        DataGridCurrentPageNumber: this.state.DataGridPrevPageNumber,
        Offset: startIndex,
        FirstGridIndex: startIndex,
      },
      () => {
        this.GetGridList();
      }
    );
  }

  handleFetchNextPage() {
    //alert("Next Page Event Call");
    this.setState(
      {
        DataGridCurrentPageNumber: this.state.DataGridNextPageNumber,
        Offset: this.state.LastGridIndex,
        FirstGridIndex: this.state.LastGridIndex,
      },
      () => {
        this.GetGridList();
      }
    );
  }

  handleFetchLastPage() {
    let startIndex = 0;
    if (this.state.DataTotalRowsCount >= this.state.DataGridRowsPerPage) {
      //startIndex = Math.ceil( this.state.DataTotalRowsCount / this.state.DataGridRowsPerPage);
      startIndex = this.state.DataTotalPages;
    }
    //alert(startIndex);
    this.setState(
      {
        DataGridCurrentPageNumber: this.state.DataTotalPages,
        Offset: (startIndex - 1) * this.state.DataGridRowsPerPage,
        FirstGridIndex: (startIndex - 1) * this.state.DataGridRowsPerPage,
      },
      () => {
        this.GetGridList();
      }
    );
  }

  handleUpdateCurrentPage($PageNumber) {
    //alert("Target: "+e.target.value + " Current: "+this.state.DataGridCurrentPageNumber);

    //let $TotalPages = Math.ceil(this.state.DataTotalRowsCount / this.state.DataGridRowsPerPage);
    let $TotalPages = this.state.DataTotalPages;

    $PageNumber = $PageNumber <= 0 ? 1 : $PageNumber;
    $PageNumber = $PageNumber > $TotalPages ? $TotalPages : $PageNumber;

    document.forms["PageJumpForm"]["PageNumber"].value = $PageNumber;

    let finalOffset = 0;
    let nextRemainingTargetPage = 0;
    let startIndex = 0;
    //alert("PageNo: "+$PageNumber + " Current Page No:" + this.state.DataGridCurrentPageNumber);
    if ($PageNumber === 1) {
      finalOffset = 0;
      startIndex = finalOffset;
      //alert("Initial Page: "+finalOffset);
    } else if ($PageNumber > this.state.DataGridCurrentPageNumber) {
      // jump to the next selected page
      nextRemainingTargetPage =
        $PageNumber - this.state.DataGridCurrentPageNumber - 1;
      finalOffset =
        this.state.LastGridIndex +
        this.state.DataGridRowsPerPage * nextRemainingTargetPage;
      startIndex = finalOffset;
      //alert("Forward: "+finalOffset);
    } else if ($PageNumber < this.state.DataGridCurrentPageNumber) {
      nextRemainingTargetPage =
        this.state.DataGridCurrentPageNumber - $PageNumber;
      finalOffset =
        this.state.FirstGridIndex -
        this.state.DataGridRowsPerPage * nextRemainingTargetPage;
      startIndex = finalOffset;
      //alert("Backword: "+finalOffset);
    } else {
      finalOffset = this.state.FirstGridIndex; //this.state.DataGridCurrentPageNumber;
      startIndex = this.state.FirstGridIndex;
      //alert("End Page: "+finalOffset + " First Index : "+startIndex);
    }

    this.setState(
      {
        DataGridCurrentPageNumber: $PageNumber,
        Offset: finalOffset,
        FirstGridIndex: startIndex,
      },
      () => {
        //alert("Offset: "+this.state.Offset+ " row_limit: "+this.state.DataGridRowsPerPage);
        this.GetGridList();
      }
    );
  }

  handleUpdateTmpPageToJump(e) {
    e.preventDefault();

    let $PageNumber = Number(
      document.forms["PageJumpForm"]["PageNumber"].value
    );
    //alert("Go: -- PageNo: "+$PageNumber + " CurrentPage: "+this.state.DataGridCurrentPageNumber);
    if (
      $PageNumber !== this.state.DataGridCurrentPageNumber &&
      $PageNumber > 0 &&
      $PageNumber <= this.state.DataTotalPages
    ) {
      //alert("Go");
      this.handleUpdateCurrentPage($PageNumber);
    } else {
      document.forms["PageJumpForm"]["PageNumber"].value =
        this.state.DataGridCurrentPageNumber;
    }
  }


  handlePrintAction(type, id) {
    // this.props.func.HandlePrintType(e);
    window.open(`report/${id}/${type}/export`);
  }


  componentDidMount() {
    this.GetAll();
    this.GetGridList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      //prevState.DataGridCurrentPageNumber !== this.state.DataGridCurrentPageNumber ||
      prevState.DataGridRowsPerPage !== this.state.DataGridRowsPerPage ||
      prevState.SearchQuery !== this.state.SearchQuery
    ) {
      this.GetAll();
      this.GetGridList();
    }

    if (
      prevProps.GridShouldReload !== this.props.GridShouldReload &&
      this.props.GridShouldReload === true
    ) {
      this.props.onUpdateGridShouldReload(false);
      this.GetAll();
      this.GetGridList();
    }

    if (
      prevProps.GlobalData.DataGridShouldReload !==
        this.props.GlobalData.DataGridShouldReload &&
      this.props.GlobalData.DataGridShouldReload === true
    ) {
      this.GetAll();
      this.GetGridList();

      this.props.func.HandleDataGridShouldReload(false);
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={8} md={11}>
            <h2 style={{ margin: "0 0 20px 0" }}>Export Bill List</h2>
          </Grid>
          <Grid item xs={4} md={1}>
          {
              this.state.AddPermission &&
              <Button
                style={{
                  background: APP.CONFIG.COLORS.PRIMARY,
                  color: "#ffffff",
                }}
                size={"small"}
                fullWidth={true}
                onClick={() => {
                  this.props.func.HandleFormOpen(true);
                  this.props.func.HandleFormMode("ADD");
                }}
              >
                <AddIcon /> &nbsp; Add
              </Button>
            }
          </Grid>
        </Grid>

        <Paper
          variant={"elevation"}
          elevation={1}
          style={{ padding: "10px", marginTop: "5px", marginBottom: "15px" }}
        >
          <Grid container spacing={0}>
            <Grid
              item
              {...(this.state.TrashViewPermission
                ? { xs: 8, sm: 11 }
                : { xs: 10, sm: 11 })}
            >
              <form
                name={"ExportBillListSearchForm"}
                onSubmit={this.handleFetchSearchResult.bind(this)}
              >
                <Paper
                  variant="elevation"
                  style={{
                    padding: "2px 10px 2px 15px",
                    display: "flex",
                    alignItems: "center",
                    margin: "auto 1px 5px 1px",
                  }}
                >
                  <InputBase
                    name={"search_query"}
                    style={{ flex: 1 }}
                    placeholder="Search"
                    inputProps={{ "aria-label": "Search" }}
                    autoComplete={"off"}
                    autoFocus={true}
                  />
                  <IconButton
                    type={"submit"}
                    style={{ padding: 7 }}
                    aria-label="Search"
                  >
                    <SearchIcon fontSize={"small"} />
                  </IconButton>
                </Paper>
              </form>
            </Grid>

            <Grid
              item
              {...(this.state.TrashViewPermission
                ? { xs: 4, sm: 1 }
                : { xs: 2, sm: 1 })}
            >
              <Paper
                variant="outlined"
                square={false}
                style={{
                  padding: "2px 0px 2px 0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto 1px 5px 1px",
                  border: 0,
                }}
              >
                {/* <Tooltip title={"Filter List"} placement="top">
                                    <IconButton style={{padding: 7}}
                                                onClick={this.ToggleFilterMode}>
                                        <FilterListIcon fontSize={"small"}/>
                                    </IconButton>
                                </Tooltip> */}

                {this.state.TrashViewPermission && (
                  <Tooltip
                    title={
                      this.state.GridTrashMode ? "Close Trash" : "View Trash"
                    }
                    placement="top"
                  >
                    <IconButton
                      style={{
                        padding: 7,
                        color: APP.CONFIG.COLORS.ACTION_BTN.DANGER,
                      }}
                      onClick={this.ToggleTrashMode}
                    >
                      {!this.state.GridTrashMode && (
                        <DeleteSweepIcon fontSize={"small"} />
                      )}
                      {this.state.GridTrashMode && (
                        <CloseIcon fontSize={"small"} />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
              </Paper>
            </Grid>
          </Grid>

          {this.state.GridFilterMode && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={2}>
                <div style={{ margin: "10px 0px 10px 0px" }}>
                  <AutoCompleteSelect
                    label={"Status"}
                    options={[
                      { id: 1, title: "Active" },
                      {
                        id: 2,
                        title: "Banned",
                      },
                    ]}
                    selectedValue={this.state.DataSelectedStatus}
                    ZeroIndexTitle={"All"}
                    ZeroIndexDisabled={false}
                    onChange={this.handleSelectStatus}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={1}>
                <Button
                  style={{
                    margin: "10px 0px 10px 0px",
                    padding: "9px 0px 9px 0px",
                  }}
                  variant={"outlined"}
                  onClick={this.GetGridList}
                >
                  <SearchIcon fontSize={"small"} />
                </Button>
              </Grid>
            </Grid>
          )}

          <ExportBillListTable
            rows={this.state.DataGridRows}
            onEditAction={this.OpenForm}
            onViewAction={this.OpenForm}
            onDeleteAction={this.handleGridDeleteAction}
            onRestoreAction={this.handleGridRestoreAction}
            onPrintAction={this.handlePrintAction}
            trashMode={this.state.GridTrashMode}
          />
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <b>Total Record:</b> {this.state.DataTotalRowsCount}
          </Grid>
          <Grid item xs={12} sm={3}>
            <b>Page:</b>

            <form
              name="PageJumpForm"
              style={{ display: "inline-block" }}
              onSubmit={this.handleUpdateTmpPageToJump}
            >
              <FormControl
                style={{
                  marginLeft: "10px",
                  marginRight: "15px",
                  verticalAlign: "middle",
                }}
              >
                <TextField
                  inputProps={{ style: { textAlign: "center", width: "60px" } }}
                  name="PageNumber"
                  autoComplete={"off"}
                  defaultValue={1}
                />
              </FormControl>
              of <b>{this.state.DataTotalPages}</b>
              &nbsp;&nbsp;
              {/* <IconButton
                                style={{background: "#dddddd"}}
                                type={'submit'}
                                color={'primary'}
                                size={'small'}>
                                <ArrowRightIcon/>
                            </IconButton> */}
            </form>
          </Grid>

          <Grid item xs={12} sm={3}>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                fontWeight: "bold",
              }}
            >
              Rows Per Page
            </div>
            <FormControl
              style={{
                marginLeft: "10px",
                marginRight: "15px",
                verticalAlign: "middle",
              }}
            >
              <Select
                onChange={this.handleChangeGridRowsPerPage}
                value={this.state.DataGridRowsPerPage}
              >
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
            <IconButton
              color={"primary"}
              disabled={this.state.DataGridPrevPageNumber <= 0}
              onClick={this.handleFetchFirstPage}
            >
              <FirstPageIcon />
            </IconButton>

            <IconButton
              color={"primary"}
              disabled={this.state.DataGridPrevPageNumber <= 0}
              onClick={this.handleFetchPrevPage}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              color={"primary"}
              disabled={
                this.state.DataTotalRowsCount === this.state.LastGridIndex ||
                this.state.DataGridNextPageNumber <= 0
              }
              onClick={this.handleFetchNextPage}
            >
              <ChevronRightIcon />
            </IconButton>

            <IconButton
              color={"primary"}
              disabled={
                this.state.DataTotalRowsCount === this.state.LastGridIndex ||
                this.state.DataGridNextPageNumber === 0
              }
              onClick={this.handleFetchLastPage}
            >
              <LastPageIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Floating Alert */}
        {this.state.__FaShow && (
          <FloatingAlert
            show={this.state.__FaShow}
            type={this.state.__FaType}
            message={this.state.__FaMessage}
            duration={this.state.__FaDuration}
            verticalAlign={this.state.__FaVerticalAlign}
            horizontalAlign={this.state.__FaHorizontalAlign}
          />
        )}

        {/* Floating Progress Bar */}
        {this.state.__FaProgressBarShow && (
                    <FloatingProgressbar
                        show={this.state.__FaProgressBarShow}
                        type={this.state.__FaProgressBarType}
                        {...(this.state.__FaProgressBarMessage !== ""
                            ? { message: this.state.__FaProgressBarMessage }
                            : "")}
                        {...(this.state.__FaProgressBarVerticalAlign !== ""
                            ? {
                                verticalAlign: this.state.__FaProgressBarVerticalAlign,
                                horizontalAlign: this.state.__FaProgressBarHorizontalAlign,
                            }
                            : "")}
                    />
                )}

        {/* Prompt Dialog */}
        {this.state.__PromptDialogShow && (
          <PromptDialog
            title={this.state.__PromptDialogTitle}
            message={this.state.__PromptDialogMessage}
            onConfirm={this.__PDRunAction}
          />
        )}
      </div>
    );
  }
}

Screen.propTypes = {};

const mapStateToProps = (state) => {
  return {
    GlobalData: state.ImportBill,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    func: {
      ClearForm: () => {
        dispatch(ResetForm());
      },
      HandleFormOpen: (payload) => {
        dispatch(HandleFormOpen(payload));
      },
      HandleFormMode: (payload) => {
        dispatch(HandleFormMode(payload));
      },
      HandlePrintType: (payload) => {
        dispatch(HandlePrintType(payload));
      },
      HandleBillId: (payload) => {
        dispatch(HandleBillId(payload));
      },
      HandleClientList: (payload) => {
        dispatch(HandleClientList(payload));
      },
      HandleSupplierList: (payload) => {
        dispatch(HandleSupplierList(payload));
      },
      HandleDocumentList: (payload) => {
        dispatch(HandleDocumentList(payload));
      },
      HandleBankList: (payload) => {
        dispatch(HandleBankList(payload));
      },
      HandleCurrencyList: (payload) => {
        dispatch(HandleCurrencyList(payload));
      },
      HandlePortList: (payload) => {
        dispatch(HandlePortList(payload));
      },
      HandleUnitList: (payload) => {
        dispatch(HandleUnitList(payload));
      },
      HandleChargeCategory: (payload) => {
        dispatch(HandleChargeCategory(payload));
      },
      HandleChargeHead: (payload) => {
        dispatch(HandleChargeHead(payload));
      },
      HandleCode: (payload) => {
        dispatch(HandleCode(payload));
      },
      HandleDataGridShouldReload: (value) => {
        dispatch(HandleDataGridShouldReload(value));
      },
      StoreBranchList: (payload) => {
        dispatch(HandleBranchList(payload));
      },

      HandleCompanyName: (value) => {
        dispatch(HandleName(value));
      },
      HandleCompanyPhone: (value) => {
        dispatch(HandlePhone(value));
      },
      HandleCompanyEmail: (value) => {
        dispatch(HandleEmail(value));
      },
      HandleCompanySite: (value) => {
        dispatch(HandleSite(value));
      },
      HandleCompanyAddress: (value) => {
        dispatch(HandleAddress(value));
      },
      HandleCompanyLogo: (value) => {
        dispatch(HandleLogo(value));
      },
    },
  };
};

const ExportBillScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Screen));

export { ExportBillScreen as Screen };
