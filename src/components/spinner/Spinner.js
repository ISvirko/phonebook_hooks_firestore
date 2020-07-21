import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-color: #78c2ad;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="spinner-wrapper">
        <div className="spinner-overlay"></div>
        <div className="spinner-content"></div>
        <div className="sweet-loading spinner">
          <SyncLoader
            css={override}
            size={15}
            margin={2}
            color={"#78c2ad"}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default AwesomeComponent;
