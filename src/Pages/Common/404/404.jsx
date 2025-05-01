import React, {Component} from 'react';
import './404.css';

class FourZeroFour extends Component {
    render() {
        return (
            <div className={'FOUR-ZERO-FOUR'}>
                <div className="flex-center position-ref full-height">
                    <div className="code">
                        404
                    </div>

                    <div className="message">
                        Not Found
                    </div>
                </div>
            </div>
        );
    }
}

export default FourZeroFour;