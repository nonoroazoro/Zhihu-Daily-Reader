import map from "lodash/map";
import isFunction from "lodash/isFunction";
import React, { PropTypes, PureComponent } from "react";

/**
 * 幻灯片内容。
 */
export default class CarouselInner extends PureComponent
{
    static propTypes = {
        storyIDs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                image: PropTypes.string,
                title: PropTypes.string
            })
        ),
        onClick: PropTypes.func
    };

    static defaultProps = {
        storyIDs: [],
        onClick: () => { }
    };

    handleClick(p_storyID)
    {
        if (isFunction(this.props.onClick))
        {
            this.props.onClick({ id: p_storyID });
        }
    }

    render()
    {
        const rows = map(this.props.storyIDs, (value, index) =>
        {
            return (
                <div className={index === 0 ? "item active" : "item"} key={index}>
                    <div
                        className="carousel-picture"
                        onClick={() => this.handleClick(value.id)}
                        style={{ backgroundImage: `url(${value.image})` }}
                    />
                    <div className="carousel-caption">
                        <h3>{value.title}</h3>
                    </div>
                </div>
            );
        });

        return (
            <div className="CarouselInner carousel-inner" role="listbox">
                {rows}
            </div>
        );
    }
}
