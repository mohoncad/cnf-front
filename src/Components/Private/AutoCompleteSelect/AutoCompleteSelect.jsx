import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from "@material-ui/core/styles";
import {APP} from "../../../App/AppProvider";

const useStyles = makeStyles((theme) => ({
    TextField: {
        "& .MuiOutlinedInput-root": {

        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: ""
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: ""
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: APP.CONFIG.COLORS.PRIMARY,
        }
    }
}));

export default function AutoCompleteSelect(props) {
    const classes = useStyles();

    let ZeroIndexTitle = props.ZeroIndexTitle;
    let ZeroIndexDisabled = props.ZeroIndexDisabled;

    ZeroIndexTitle = (ZeroIndexTitle === '' || ZeroIndexTitle === null || typeof ZeroIndexTitle === 'undefined') ? "Select" : ZeroIndexTitle;
    ZeroIndexDisabled = (ZeroIndexDisabled === null || typeof ZeroIndexDisabled === 'undefined') ? true : ZeroIndexDisabled;

    const options = typeof props.options === 'undefined' ? [] : props.options;

    if(options.length > 0 && options[0].id !== 0) {
        options.unshift({id: 0, title: ZeroIndexTitle});
    } else {
        options[0] = {id: 0, title: ZeroIndexTitle};
    }

    const [value, setValue] = React.useState(options[options.findIndex(x => x.id === props.selectedValue)]);

    const [SelectedID, setSelectedID] = React.useState((typeof value === 'undefined' || value === null) ? 0 : value.id);


    React.useEffect(() => {
        setValue(options[options.findIndex(x => x.id === props.selectedValue)]);
    }, [options, props.selectedValue]);

    return (
        <div>
            <Autocomplete
                disabled={props.disabled}
                value={value}
                onChange={(event, newValue) => {
                    if(typeof newValue !== 'undefined' && newValue !== null) {
                        setValue(newValue);
                        setSelectedID(newValue.id);
                        props.onChange(newValue.id);
                    }
                }}
                options={options}
                getOptionLabel={(option) => option.title}
                getOptionDisabled={(option) => option.id === 0 && ZeroIndexDisabled === true}
                renderInput={(params) => <TextField required className={classes.TextField} {...params} label={props.label} variant="outlined" size="small" />}
            />
        </div>
    );
}

AutoCompleteSelect.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    selectedValue: PropTypes.number.isRequired,
    ZeroIndexTitle: PropTypes.string,
    ZeroIndexDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}
