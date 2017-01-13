import * as React from "react"


// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component {
    render() {
        return <h1>Hello {this.props.compiler} and {this.props.framework}!</h1>
    }
}