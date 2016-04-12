import "./res/ShortcutsView.less";

import React from "react";

/**
 * 快捷键帮助对话框。
 */
export default class ShortcutsView extends React.Component
{
    static defaultProps =
    {
        id: "ShortcutsView"
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
                        <div className="ShortcutsBody modal-body">
                            <p>One fine body&hellip;</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}