import { Alert } from '@mui/material'
import React, { Component } from 'react'

export default class ToastMessage extends Component {
    render() {
        return (
            <Alert variant="filled" severity="error">
                This is an error alert — check it out!
            </Alert>

        )
    }
}
