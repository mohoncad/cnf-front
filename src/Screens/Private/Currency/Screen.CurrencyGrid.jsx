import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { APP } from "../../../App/AppProvider";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    padding: "10px",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    userSelect: "none",
    msUserSelect: "none",
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
  TableBypassActionButton: {
    fontWeight: "bold",
    color: APP.CONFIG.COLORS.ACTION_BTN.BYPASS_SELECTOR,
  },
  TableDeleteActionButton: {
    fontWeight: "bold",
    color: APP.CONFIG.COLORS.ACTION_BTN.DANGER,
  },
}));

const ContextMenuInitialState = {
  mouseX: null,
  mouseY: null,
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

const headCells = [
  {
    id: "sn",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "#",
  },
  {
    id: "name",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Name",
  },
  {
    id: "rate",
    align: "left",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Rate",
  },
  {
    id: "DeletedBy",
    align: "center",
    disablePadding: false,
    TrashModeOnly: true,
    label: "Deleted By",
  },
  {
    id: "DeletedAt",
    align: "center",
    disablePadding: false,
    TrashModeOnly: true,
    label: "Deleted At",
  },
  {
    id: "action",
    align: "center",
    disablePadding: false,
    TrashModeOnly: false,
    label: "Action",
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
        {headCells.map((headCell) => (
          <React.Fragment key={headCell.id}>
            {!headCell.TrashModeOnly && (
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

            {props.trashMode && headCell.TrashModeOnly && (
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

function Screen(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const [ContextMenu, setContextMenu] = React.useState(ContextMenuInitialState);
  const [ContextMenuAction, setContextMenuAction] = React.useState({
    view: () => {},
    edit: () => {},
    delete: () => {},
    restore: () => {},
  });
  const [ContextMenuActionObject, setContextMenuActionObject] = React.useState({
    id: 0,
    Permissions: {
      ModuleAccess: false,
      View: false,
      Add: false,
      Edit: false,
      Delete: false,
      Trash: false,
      Restore: false,
      DeleteForever: false,
    },
  });

  const Permissions = new APP.SERVICES.UAP().GetModulePermissions(
    APP.CONFIG.MODULE[5]
  );
  const AddPermission = Number(Permissions.Add) === 1;
  const ViewPermission = Number(Permissions.View) === 1;
  const ModuleAccessPermission = Number(Permissions.ModuleAccess) === 1;
  const EditPermission = Number(Permissions.Edit) === 1;
  const DeletePermission = Number(Permissions.Delete) === 1;
  const TrashViewPermission = Number(Permissions.Trash) === 1;
  const RestorePermission = Number(Permissions.Restore) === 1;
  const DeleteForeverPermission = Number(Permissions.DeleteForever) === 1;

  const [SearchQuery, setSearchQuery] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(SearchQuery);
  };

  const handleOpenContextMenu = (event, action, action_object) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });

    setContextMenuAction(action);
    setContextMenuActionObject(action_object);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(ContextMenuInitialState);
  };

  let data = props.data,
    sn = 1;
  for (let $i = 0; $i < data.length; $i++) {
    data[$i].sn = sn;

    sn++;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant={"elevation"} elevation={1}>
        <Grid container spacing={0}>
          <Grid item xs={10} sm={11}>
            <form onSubmit={handleSearchSubmit}>
              <Paper
                variant="elevation"
                square={false}
                style={{
                  padding: "2px 10px 2px 15px",
                  display: "flex",
                  alignItems: "center",
                  margin: "auto 1px 5px 1px",
                }}
              >
                <InputBase
                  fullWidth={true}
                  name={"search_query"}
                  style={{ flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "Search" }}
                  autoComplete={"off"}
                  autoFocus={true}
                  onChange={handleSearchInput}
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

          <Grid item xs={2} sm={1}>
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
              {TrashViewPermission && (
                <Tooltip
                  title={props.TrashMode ? "Close Trash" : "View Trash"}
                  placement="top"
                >
                  <IconButton
                    type={"submit"}
                    style={{
                      padding: 7,
                      color: APP.CONFIG.COLORS.ACTION_BTN.DANGER,
                    }}
                    disabled={!TrashViewPermission}
                    onClick={props.onTrashModeToggle}
                  >
                    {!props.TrashMode && <DeleteSweepIcon fontSize={"small"} />}
                    {props.TrashMode && <CloseIcon fontSize={"small"} />}
                  </IconButton>
                </Tooltip>
              )}
            </Paper>
          </Grid>
        </Grid>

        <TableContainer onContextMenu={(e) => e.preventDefault()}>
          <Table className={classes.table} size={"small"}>
            <EnhancedTableHead
              classes={classes}
              trashMode={props.TrashMode}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      title={
                        props.BypassMode
                          ? "Ctrl + click to select this bank"
                          : "Double click to view"
                      }
                      onContextMenu={(e) =>
                        handleOpenContextMenu(
                          e,
                          {
                            view: () => {
                              props.onViewAction(
                                row.id,
                                row.Name,
                                row.CurrencyRate
                              );
                              handleCloseContextMenu();
                            },
                            edit: () => {
                              props.onEditAction(
                                row.id,
                                row.Name,
                                row.CurrencyRate
                              );
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
                          {
                            id: row.id,
                            Permissions: {
                              ModuleAccess: ModuleAccessPermission,
                              View: ViewPermission,
                              Add: AddPermission,
                              Edit: EditPermission,
                              Delete: DeletePermission,
                              Trash: TrashViewPermission,
                              Restore: RestorePermission,
                              DeleteForever: DeleteForeverPermission,
                            },
                          }
                        )
                      }
                      onDoubleClick={() => {
                        if (!props.TrashMode) {
                          if(ViewPermission) {
                            props.onViewAction(
                              row.id,
                              row.Name,
                              row.CurrencyRate
                            );
                          }
                        }
                      }}
                    >
                      <TableCell
                        className={classes.TableCell}
                        style={{ maxWidth: "5px" }}
                        align="left"
                      >
                        {row.sn}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="left">
                        {row.Name}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="left">
                        {row.CurrencyRate}
                      </TableCell>

                      {props.TrashMode && (
                        <React.Fragment>
                          <TableCell
                            className={classes.TableCell}
                            style={{ maxWidth: "50px" }}
                            align="left"
                          >
                            <div style={{ whiteSpace: "pre-wrap" }}>
                              {row.DeletedBy}
                            </div>
                          </TableCell>
                          <TableCell
                            className={classes.TableCell}
                            style={{ maxWidth: "50px" }}
                            align="left"
                          >
                            <div style={{ whiteSpace: "pre-wrap" }}>
                              {row.DeletedAt}
                            </div>
                          </TableCell>
                        </React.Fragment>
                      )}

                      <TableCell className={classes.TableCell} align="center">
                        {!props.TrashMode && (
                          <React.Fragment>
                            {ViewPermission && (
                              <Tooltip
                                title={"View"}
                                placement={"top"}
                                enterDelay={500}
                              >
                                <IconButton
                                  size={"small"}
                                  className={classes.TableActionButton}
                                  disabled={!ViewPermission}
                                  onClick={() =>
                                    props.onViewAction(
                                      row.id,
                                      row.Name,
                                      row.CurrencyRate
                                    )
                                  }
                                >
                                  <VisibilityIcon fontSize={"small"} />
                                </IconButton>
                              </Tooltip>
                            )}
                            &nbsp;&nbsp;
                            {EditPermission && (
                              <Tooltip
                                title={"Edit"}
                                placement={"top"}
                                enterDelay={500}
                              >
                                <IconButton
                                  size={"small"}
                                  className={classes.TableActionButton}
                                  disabled={!EditPermission}
                                  onClick={() =>
                                    props.onEditAction(
                                      row.id,
                                      row.Name,
                                      row.CurrencyRate
                                    )
                                  }
                                >
                                  <EditIcon fontSize={"small"} />
                                </IconButton>
                              </Tooltip>
                            )}
                            &nbsp;&nbsp;
                            {DeletePermission && (
                              <Tooltip
                                title={"Delete"}
                                placement={"top"}
                                enterDelay={500}
                              >
                                <IconButton
                                  size={"small"}
                                  className={classes.TableDeleteActionButton}
                                  disabled={!DeletePermission}
                                  onClick={() => props.onDeleteAction(row.id)}
                                >
                                  <DeleteIcon fontSize={"small"} />
                                </IconButton>
                              </Tooltip>
                            )}
                          </React.Fragment>
                        )}

                        {props.TrashMode && (
                          <React.Fragment>
                            {RestorePermission && (
                              <Tooltip
                                title={"Restore"}
                                placement={"top"}
                                enterDelay={500}
                              >
                                <IconButton
                                  size={"small"}
                                  className={classes.TableActionButton}
                                  disabled={!RestorePermission}
                                  onClick={() => props.onRestoreAction(row.id)}
                                >
                                  <RestoreFromTrashIcon fontSize={"small"} />
                                </IconButton>
                              </Tooltip>
                            )}
                            &nbsp;&nbsp;
                            {DeleteForeverPermission && (
                              <Tooltip
                                title={"Delete Forever"}
                                placement={"top"}
                                enterDelay={500}
                              >
                                <IconButton
                                  size={"small"}
                                  className={classes.TableDeleteActionButton}
                                  disabled={!DeleteForeverPermission}
                                  onClick={() => props.onDeleteAction(row.id)}
                                >
                                  <DeleteForeverIcon fontSize={"small"} />
                                </IconButton>
                              </Tooltip>
                            )}
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
            TransitionComponent={Fade}
            PaperProps={{
              style: {
                width: "20ch",
              },
            }}
          >
            {!props.TrashMode && (
              <div>
                {ContextMenuActionObject.Permissions.View && (
                  <MenuItem onClick={ContextMenuAction.view}>View</MenuItem>
                )}
                {ContextMenuActionObject.Permissions.Edit && (
                  <MenuItem onClick={ContextMenuAction.edit}>Edit</MenuItem>
                )}
                {ContextMenuActionObject.Permissions.Delete && (
                  <MenuItem onClick={ContextMenuAction.delete}>Delete</MenuItem>
                )}
              </div>
            )}

            {props.TrashMode && (
              <div>
                {ContextMenuActionObject.Permissions.Restore && (
                  <MenuItem onClick={ContextMenuAction.restore}>
                    Restore
                  </MenuItem>
                )}
                {ContextMenuActionObject.Permissions.DeleteForever && (
                  <MenuItem onClick={ContextMenuAction.delete}>
                    Delete Forever
                  </MenuItem>
                )}
              </div>
            )}
          </Menu>
        </TableContainer>
      </Paper>
    </div>
  );
}

Screen.propTypes = {
  data: PropTypes.array,
  TrashMode: PropTypes.bool,
  BypassMode: PropTypes.bool,
  BypassSelectedId: PropTypes.number,
  onSearchSubmit: PropTypes.func,
  onViewAction: PropTypes.func,
  onEditAction: PropTypes.func,
  onDeleteAction: PropTypes.func,
  onRestoreAction: PropTypes.func,
  onTrashModeToggle: PropTypes.func,
};

export { Screen };
