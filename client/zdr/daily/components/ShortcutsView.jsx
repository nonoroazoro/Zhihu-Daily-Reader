import "./res/ShortcutsView.less";

import map             from "lodash/collection/map";
import React           from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

class ShortcutsBody extends React.Component
{
    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static propTypes =
    {
        keys: React.PropTypes.object
    };

    static defaultProps =
    {
        keys: {}
    };

    render()
    {
        const rows = map(Object.keys(this.props.keys), (key, index) =>
        {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{key}</td>
                    <td>{this.props.keys[key]}</td>
                </tr>
            );
        });

        const table =
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
            </table>;

        return (
            <div className="ShortcutsBody modal-body">
                {table}
            </div>
        );
    }
}

/**
 * 快捷键帮助对话框。
 */
export default class ShortcutsView extends React.Component
{
    constructor(p_props)
    {
        super(p_props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    static propTypes =
    {
        id: React.PropTypes.string,
        keys: React.PropTypes.object
    };

    static defaultProps =
    {
        id: "ShortcutsView",
        keys:
        {
            "esc": "关闭阅读界面",
            "h/?": "显示快捷键帮助",
            "j": "打开或切换至上一篇",
            "k": "打开或切换至下一篇",
            "←": "选中或切换上一篇",
            "→": "选中或切换下一篇",
            "o/enter": "打开当前所选日报", 
            "v": "查看知乎讨论",
        }
    };

    render()
    {
        return (
            <div id={this.props.id} className="ShortcutsView modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="ShortcutsHeader modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                            <h3 className="title">键盘快捷键</h3>
                        </div>
                        <ShortcutsBody keys={this.props.keys} />
                    </div>
                </div>
            </div>
        );
    }
}