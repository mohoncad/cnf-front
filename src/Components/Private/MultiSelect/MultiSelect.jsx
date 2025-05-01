import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import {APP} from "../../../App/AppProvider";

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 100%;
  border: 1px solid #bababa;
  background-color: #fff;
  border-radius: 4px;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #000000;
  }

  &.focused {
    border: 2px solid ${APP.CONFIG.COLORS.PRIMARY};
    padding: 2px;
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({label, onDelete, ...props}) => (
    <div {...props}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete}/>
    </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0px 4px 0px 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  left: 0; right: 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 9999;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: green;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

function MultiSelect(props) {

    const Options = props.Options;

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        defaultValue: [],
        value: props.Value,
        multiple: true,
        options: Options,
        getOptionLabel: (option) => option.title,
    });

    function SelectObjectValue(option) {
        props.onChange(option);
    }

    function RemoveSelectedObjectValue(option) {
        props.onChange(option);
    }

    function findSelectedValue(id) {
        const index = props.Value.indexOf(props.Value.find(x => x.id === id));
        if(index < 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <NoSsr>
            <div style={{position: "relative", pointerEvents: props.disabled ? "none" : "auto", userSelect: "none", msUserSelect: "none"}}>
                <div {...getRootProps()}>
                    <Label {...getInputLabelProps()}>{props.Label} *</Label>
                    <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                        {(value.length > 0) && (
                            <React.Fragment>
                                {value.map((option, index) => (
                                    <Tag label={option.title} {...getTagProps({index})}
                                         onDelete={() => RemoveSelectedObjectValue(option)}/>
                                ))}
                            </React.Fragment>
                        )}

                        <input {...getInputProps()}/>
                    </InputWrapper>
                </div>
                {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <li style={{
                                fontWeight: findSelectedValue(option.id) ? "bold" : "normal",
                                background: findSelectedValue(option.id) ? "#fafafa" : "auto",
                            }}
                                {...getOptionProps({option, index})} onClick={() => SelectObjectValue(option)}>
                                <span>{option.title}</span>
                                <CheckIcon fontSize="small" style={{
                                    color: findSelectedValue(option.id) ? "green" : "transparent"
                                }}/>
                            </li>
                        ))}
                    </Listbox>
                ) : null}
            </div>
        </NoSsr>
    );
}


MultiSelect.propTypes = {
    disabled: PropTypes.bool.isRequired,
    Label: PropTypes.string.isRequired,
    Options: PropTypes.array.isRequired,
    Value: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
    return {
        GlobalData: state.UserProfileForm
    }
};

export default connect(mapStateToProps)(MultiSelect);
