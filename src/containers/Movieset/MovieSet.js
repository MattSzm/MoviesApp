import React, { Component, Fragment } from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import classes from './MovieSet.module.css';
import Slider from '../../components/UI/SliderItems/SliderItems';
import { connect } from 'react-redux';
import * as actionsRedux from '../../store/actions/movies';
import MovieDetail from "../MovieDetail/MovieDetail";


class MovieSet extends Component{
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth,
                                height: window.innerHeight,
                                offset: 0,
                                leftScrollDisabled: true,
                                rightScrollDisabled: false});
    }

    state = {
        width: 0,
        height: 0,
        offset: 0,
        leftScrollDisabled: true,
        rightScrollDisabled: false
    }

    scrollLeft = () => {
        if (this.state.width < 1500) {
            const prevOffset = this.state.offset;
            if ( prevOffset > 0) {
                this.setState({offset: prevOffset - 270 * 3,
                                    leftScrollDisabled: false,
                                    rightScrollDisabled: false})
            }
        else {
            this.setState({leftScrollDisabled: true,
                                 rightScrollDisabled: false});
            }}
        else if(this.state.width > 1500) {
            const prevOffset = this.state.offset;
            if (prevOffset > 0) {
                this.setState({offset: prevOffset - 360 * 3,
                                    leftScrollDisabled: false,
                                    rightScrollDisabled: false})
            }
            else {
                this.setState({leftScrollDisabled: true,
                            rightScrollDisabled: false});
            }
        }
        if(this.state.offset < 0){
            this.setState({offset: 0});
        }
    };

    scrollRight = () => {
        if (this.state.width < 1500) {
            const prevOffset = this.state.offset;
            let value = this.state.width / 270 * 0.95;
            if (value + prevOffset / 270*0.95 <= this.props.items.length ) {
                this.setState({offset: prevOffset + 270 * 3,
                                    rightScrollDisabled: false,
                                    leftScrollDisabled: false})}
        else {
                this.setState({rightScrollDisabled: true,
                                    leftScrollDisabled: false})
            }}
        else if(this.state.width >= 1500) {
            const prevOffset = this.state.offset;
            let value = this.state.width / 360 * 0.95;
            if (value + prevOffset / 360 <= this.props.items.length) {
                this.setState({offset: prevOffset + 360 * 3,
                                    rightScrollDisabled: false,
                                    leftScrollDisabled: false})
            }
            else{
                this.setState({rightScrollDisabled: true,
                                    leftScrollDisabled: false})
            }
        }
    };


    render() {
        const items = this.props.items.map(item => (
            <MovieItem
                imageSource={item.imageSource}
                key={item.id}
                id={item.id}
                picked={item.picked}
                refreshed={item.refreshed}
                showInfo={this.props.OnMouseHandlerAction}
                hideInfo={this.props.OffMouseHandlerAction}
                openDetails={this.props.ShowDetailsAction}
                offset = {this.state.offset}
            />));

        return (
            <Fragment>
                <div className={classes.MovieSet}>
                    <ul>
                        {items}
                    </ul>
                    <Slider direction='left'
                            scroll={this.scrollLeft}
                            disabled={this.state.leftScrollDisabled}
                    />
                    <Slider direction='right'
                            disabled={this.state.rightScrollDisabled}
                            scroll={this.scrollRight}
                    />
                </div>

                <MovieDetail widthResolution={this.state.width}
                            heightResolution={this.state.height}/>
            </Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnMouseHandlerAction: (Id) => dispatch(actionsRedux.onMouseHandlerMovie(Id)),
        OffMouseHandlerAction: (Id) => dispatch(actionsRedux.offMouseHandlerMovie(Id)),
        ShowDetailsAction: (Id) => dispatch(actionsRedux.showDetails(Id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSet);