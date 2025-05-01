/*
 * Copyright (c) 2020. Mohammed Nayeem - All rights reserved.
 *
 * @link http://salessystembd.com
 * @license http://salessystembd.com
 */

import blueGrey from "@material-ui/core/colors/blueGrey";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const COLORS = {
    PRIMARY: blueGrey[600],
    WHITE: "#ffffff",
    BLACK: "#000000",
    GREEN: green[500],
    RED: red[500],

    PROGRESS_BAR: {
        LINEAR: {
            PRIMARY: blueGrey[100],
            BAR: blueGrey[600]
        }
    },

    ACTION_BTN: {
        SUCCESS: blueGrey[600],
        DANGER: red[500],
        WARNING: "",
        BYPASS_SELECTOR: green[500],
    }
};

export {COLORS}
