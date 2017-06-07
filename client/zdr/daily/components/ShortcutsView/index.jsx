import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import ShortcutsBody from "./ShortcutsBody";

import "./index.less";

/**
 * 快捷键帮助对话框。
 */
export default class ShortcutsView extends PureComponent
{
    static defaultProps = {
        id: "ShortcutsView",
        keys:
        [
            { name: "esc", desc: "关闭阅读界面" },
            { name: "h/?", desc: "显示快捷键帮助" },
            { name: "j", desc: "打开或切换至上一篇" },
            { name: "k", desc: "打开或切换至下一篇" },
            { name: "←", desc: "选中或切换上一篇" },
            { name: "→", desc: "选中或切换下一篇" },
            { name: "o/enter", desc: "打开当前所选日报" },
            { name: "v", desc: "查看知乎讨论" }
        ]
    };

    static propTypes = {
        id: PropTypes.string,
        keys: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            desc: PropTypes.string
        }))
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
