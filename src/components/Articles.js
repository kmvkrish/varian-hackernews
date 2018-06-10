import React, {Component} from 'react';
import Article from './Article';

export default class Articles extends Component{
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="list-group">
				{
					this.props.items.map( (article, index) => {
						return (
							<Article key={article.id} id={index} item={article} />
						)
					})
				}
			</div>
		)
	}
}