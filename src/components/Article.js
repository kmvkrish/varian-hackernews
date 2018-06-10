import React, {Component} from 'react';

export default class Article extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<a href={this.props.item.url} className="list-group-item" target="_blank">
				<div className="row">
					<div className="col-xs-1">
						<p className="text-muted">{this.props.id + 1}</p>
					</div>
					<div className="col-xs-11">
						<p>
							<span className="text-primary">{this.props.item.title}</span>
						</p>
						<p>
							<span>{this.props.item.num_points} points by {this.props.item.author}</span>
							<span> | {this.props.item.created_at}</span> 
							<span> | {this.props.item.num_comments} comments</span>
						</p>
					</div>
				</div>
			</a>
		)
	}
}