import React, { Component } from 'react'

export default class PopUp extends Component {
    render() {
        return (
            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Thông báo</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                   {this.props.titleError}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-warning" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}
