import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { APP } from "../../../../App/AppProvider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AutoCompleteSelect from "../../../../Components/Private/AutoCompleteSelect/AutoCompleteSelect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Badge from "@material-ui/core/Badge";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelCircleIcon from "@material-ui/icons/Cancel";
import {
  HandleAddress,
  HandleSelectedBranchList,
  HandleContactNumber,
  HandleEmail,
  HandleFormMode,
  HandleFullName,
  HandleIsActive,
  HandleIsMasterUser,
  HandlePassword,
  HandleProfilePhotoFile,
  HandleProfilePhotoUrl,
  HandleUserRoleID,
} from "../../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";
import UserRole from "../../../../Pages/Private/UAP/UserRole/UserRole";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FullScreenDialog from "../../../../Components/Private/FullScreenDialog/FullScreenDialog";
import BarAlert from "../../../../Components/Common/BarAlert/BarAlert";
import Branches from "../../../../Pages/Private/Branches/Branches";
import MultiSelect from "../../../../Components/Private/MultiSelect/MultiSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  Avatar: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    display: "inline-block",
  },

  TextField: {
    "& .MuiOutlinedInput-root": {
      color: "#262626",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: APP.CONFIG.COLORS.PRIMARY,
    },
  },
}));

const MaterialCheckbox = withStyles({
  root: {
    color: APP.CONFIG.COLORS.PRIMARY,
    "&$checked": {
      color: APP.CONFIG.COLORS.PRIMARY,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Screen = (props) => {
  const classes = useStyles();

  const auth_user = new APP.SERVICES.SessionUser().GetProfile();

  const [BypassUserRoleSenderOpen, setBypassUserRoleSenderOpen] =
    React.useState(false);
  const BypassRoleIdUpdate = (RoleID) => {
    props.func.HandleUserRoleID(RoleID);
    setBypassUserRoleSenderOpen(false);
  };

  const [BypassBranchSenderOpen, setBypassBranchSenderOpen] =
    React.useState(false);

  const BranchObjectUpdate = (BranchObject) => {
    let index = props.GlobalData.SelectedBranchList.indexOf(
      props.GlobalData.SelectedBranchList.find((x) => x.id === BranchObject.id)
    );

    if (index < 0) {
      const temp = props.GlobalData.SelectedBranchList;
      temp.push(BranchObject);
      props.func.HandleSelectedBranchList(temp);
    } else {
      const temp = props.GlobalData.SelectedBranchList;
      temp.splice(index, 1);
      props.func.HandleSelectedBranchList(temp);
    }
  };

  const [File, setFile] = React.useState(null);
  const [ImagesAttributes, setImagesAttributes] = React.useState([]);
  const [ImagePreviewUrl, setImagePreviewUrl] = React.useState("");

  const ProfilePhotoChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      props.func.HandleProfilePhotoFile(file);
      setImagePreviewUrl(reader.result);
      props.func.HandleProfilePhotoUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const [ChangePasswordMode, setChangePasswordMode] = React.useState(false);

  const FormMode = props.GlobalData.FormMode;

  const IsSelfProfile = props.GlobalData.IsSelfProfile;
  const UserRoleID = props.GlobalData.UserRoleID;
  const IsActive = props.GlobalData.IsActive;
  const IsMasterUser = props.GlobalData.IsMasterUser;
  const IsSupportUser = props.GlobalData.IsSupportUser;
  const FullName = props.GlobalData.FullName;
  const Email = props.GlobalData.Email;
  const Password = props.GlobalData.Password;
  const ContactNumber = props.GlobalData.ContactNumber;
  const Address = props.GlobalData.Address;
  const ProfilePhotoUrl = props.GlobalData.ProfilePhotoUrl;

  const MasterFlagEditPermission = props.GlobalData.MasterFlagEditPermission;
  const HasEditPermission = props.GlobalData.HasEditPermission;

  const FormDisabled =
    FormMode === "VIEW" || (FormMode === "EDIT" && HasEditPermission === false);
  const UserRoleDisabled = FormDisabled || IsMasterUser || IsSupportUser;
  const MasterFlagDisabled =
    (FormMode === "ADD" && Number(auth_user.IsMasterUser) === 0) ||
    FormDisabled ||
    (FormMode === "EDIT" && MasterFlagEditPermission === false);

  return (
    <React.Fragment>
      {FormMode === "VIEW" && HasEditPermission !== false && (
        <BarAlert
          type={"info"}
          message={"Edit this settings"}
          style={{ cursor: "pointer" }}
          onClick={() => props.func.HandleFormMode("EDIT")}
        />
      )}

      <div style={{ padding: "10px", marginTop: "20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <div style={{ textAlign: "center" }}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <IconButton
                    disabled={true}
                    size={"small"}
                    style={{ background: "#ffffff" }}
                  >
                    {IsActive ? (
                      <CheckCircleIcon
                        style={{
                          fontSize: "35px",
                          color: APP.CONFIG.COLORS.GREEN,
                        }}
                      />
                    ) : (
                      <CancelCircleIcon
                        style={{
                          fontSize: "35px",
                          color: APP.CONFIG.COLORS.RED,
                        }}
                      />
                    )}
                  </IconButton>
                }
              >
                <Avatar
                  alt=""
                  src={ProfilePhotoUrl}
                  className={classes.Avatar}
                />
              </Badge>
            </div>

            {(FormMode === "ADD" ||
              (FormMode === "EDIT" && HasEditPermission !== false)) && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  id="ProfilePhotoPicker"
                  onChange={ProfilePhotoChange}
                  ref={(input) => {
                    ImagesAttributes[0] = input;
                  }}
                />
                <label htmlFor="ProfilePhotoPicker">
                  <Button
                    variant={"contained"}
                    size="small"
                    style={{
                      background: APP.CONFIG.COLORS.PRIMARY,
                      color: "#ffffff",
                    }}
                    component="span"
                  >
                    Change Photo
                  </Button>
                </label>
              </div>
            )}
          </Grid>

          <Grid item xs={12} sm={8}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <h3 style={{ marginTop: 0 }}>
                {IsSelfProfile ? "My Profile" : "Profile Info"}
              </h3>

              <br />

              <Grid container spacing={0}>
                <Grid item xs={10} sm={11}>
                  <AutoCompleteSelect
                    label={"User Role"}
                    disabled={UserRoleDisabled}
                    options={props.GlobalData.UserRoleList}
                    selectedValue={UserRoleID}
                    onChange={props.func.HandleUserRoleID}
                  />
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select user role from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color: UserRoleDisabled
                          ? "#a6a6a6"
                          : APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => setBypassUserRoleSenderOpen(true)}
                      disabled={UserRoleDisabled}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <MaterialCheckbox
                    checked={IsMasterUser}
                    disabled={MasterFlagDisabled}
                    onChange={() =>
                      props.func.HandleIsMasterUser(!IsMasterUser)
                    }
                  />
                }
                label="Master User"
              />

              <FormControlLabel
                control={
                  <MaterialCheckbox
                    checked={IsActive}
                    disabled={FormDisabled || IsSelfProfile}
                    onChange={() => props.func.HandleIsActive(!IsActive)}
                  />
                }
                label="Active"
              />

              <br />
              <br />

              <Grid container spacing={0}>
                <Grid item xs={10} sm={11}>
                  <MultiSelect
                    disabled={FormDisabled || IsMasterUser}
                    Label={"Select Branch"}
                    Options={props.GlobalData.BranchList}
                    Value={props.GlobalData.SelectedBranchList}
                    onChange={BranchObjectUpdate}
                  />
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select branch from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color:
                          FormDisabled || IsMasterUser
                            ? "#a6a6a6"
                            : APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => setBypassBranchSenderOpen(true)}
                      disabled={FormDisabled || IsMasterUser}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>

              <br />

              <TextField
                fullWidth={true}
                required
                variant={"outlined"}
                size={"small"}
                label="Full Name"
                className={classes.TextField}
                disabled={FormDisabled}
                value={FullName}
                onChange={(e) => props.func.HandleFullName(e.target.value)}
              />

              <br />
              <br />

              <TextField
                fullWidth={true}
                required
                type={"email"}
                variant={"outlined"}
                size={"small"}
                label="Email Address"
                className={classes.TextField}
                disabled={FormDisabled}
                value={Email}
                onChange={(e) => props.func.HandleEmail(e.target.value)}
              />

              <br />
              <br />

              <TextField
                fullWidth={true}
                variant={"outlined"}
                size={"small"}
                label="Contact Number"
                className={classes.TextField}
                disabled={FormDisabled}
                value={ContactNumber}
                onChange={(e) => props.func.HandleContactNumber(e.target.value)}
              />

              <br />
              <br />

              <TextField
                fullWidth={true}
                variant={"outlined"}
                size={"small"}
                label="Address"
                rows={2}
                rowsMax={4}
                multiline={true}
                className={classes.TextField}
                disabled={FormDisabled}
                value={Address}
                onChange={(e) => props.func.HandleAddress(e.target.value)}
              />

              <br />
              <br />

              {FormMode === "EDIT" && !ChangePasswordMode && (
                <React.Fragment>
                  <Button
                    variant={"contained"}
                    size={"small"}
                    style={{
                      background: APP.CONFIG.COLORS.ACTION_BTN.SUCCESS,
                      color: "#ffffff",
                    }}
                    onClick={() => setChangePasswordMode(true)}
                  >
                    Change Password
                  </Button>
                </React.Fragment>
              )}

              {ChangePasswordMode && (
                <React.Fragment>
                  <Button
                    variant={"contained"}
                    size={"small"}
                    style={{
                      background: APP.CONFIG.COLORS.RED,
                      color: "#ffffff",
                    }}
                    onClick={() => setChangePasswordMode(false)}
                  >
                    Cancel Change Password
                  </Button>
                  <br />
                  <br />
                </React.Fragment>
              )}

              {(FormMode === "ADD" || ChangePasswordMode) && (
                <TextField
                  fullWidth={true}
                  required
                  type={"password"}
                  variant={"outlined"}
                  size={"small"}
                  label="Password"
                  className={classes.TextField}
                  disabled={FormDisabled}
                  value={Password}
                  onChange={(e) => props.func.HandlePassword(e.target.value)}
                />
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* User Role Bypass Sender */}
        <FullScreenDialog
          open={BypassUserRoleSenderOpen}
          title={"Select User Role"}
          onClose={() => {
            setBypassUserRoleSenderOpen(false);
            props.onUserRoleListReloadCommand();
          }}
        >
          <div style={{ padding: "20px" }}>
            <UserRole
              BypassMode={true}
              onBypassRoleSelected={BypassRoleIdUpdate}
            />
          </div>
        </FullScreenDialog>

        {/* Branch Bypass Sender */}
        <FullScreenDialog
          open={BypassBranchSenderOpen}
          title={"Select Branch"}
          onClose={() => {
            setBypassBranchSenderOpen(false);
            props.onBranchListReloadCommand();
          }}
          hasSubmitButton={true}
          submitButtonTitle={"Ok"}
          submitButtonDisabled={false}
          onSubmit={() => {
            setBypassBranchSenderOpen(false);
            props.onBranchListReloadCommand();
          }}
        >
          <div style={{ padding: "20px" }}>
            <Branches
              BypassMode={true}
              onBypassObjectSelected={BranchObjectUpdate}
              BypassTempArray={props.GlobalData.SelectedBranchList}
            />
          </div>
        </FullScreenDialog>
      </div>
    </React.Fragment>
  );
};

Screen.propTypes = {
  onUserRoleListReloadCommand: PropTypes.func.isRequired,
  onBranchListReloadCommand: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    GlobalData: state.UserProfileForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    func: {
      HandleFormMode: (payload) => {
        dispatch(HandleFormMode(payload));
      },
      HandleUserRoleID: (payload) => {
        dispatch(HandleUserRoleID(payload));
      },
      HandleSelectedBranchList: (payload) => {
        dispatch(HandleSelectedBranchList(payload));
      },
      HandleIsActive: (payload) => {
        dispatch(HandleIsActive(payload));
      },
      HandleIsMasterUser: (payload) => {
        dispatch(HandleIsMasterUser(payload));
      },
      HandleFullName: (payload) => {
        dispatch(HandleFullName(payload));
      },
      HandleEmail: (payload) => {
        dispatch(HandleEmail(payload));
      },
      HandlePassword: (payload) => {
        dispatch(HandlePassword(payload));
      },
      HandleContactNumber: (payload) => {
        dispatch(HandleContactNumber(payload));
      },
      HandleAddress: (payload) => {
        dispatch(HandleAddress(payload));
      },
      HandleProfilePhotoUrl: (payload) => {
        dispatch(HandleProfilePhotoUrl(payload));
      },
      HandleProfilePhotoFile: (payload) => {
        dispatch(HandleProfilePhotoFile(payload));
      },
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
