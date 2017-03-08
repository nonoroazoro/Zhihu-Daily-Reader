import map from "lodash/map";
import React, { PropTypes, PureComponent } from "react";

export default class ShortcutsBody extends PureComponent
{
    static defaultProps = {
        keys: []
    };

    static propTypes = {
        keys: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            desc: PropTypes.string
        }))
    };

    render()
    {
        const rows = map(this.props.keys, (item, index) =>
        {
            return (
                <tr key={item.name}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                </tr>
            );
        });

        const table = (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Shortcut</th>
                        <th>Command</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );

        return (
            <div className="ShortcutsBody modal-body">
                {table}
            </div>
        );
    }
}
