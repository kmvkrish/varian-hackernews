import React, {Component} from 'react';
import Articles from './Articles';

class App extends Component {
    constructor() {
        super();
        this.state = {
			news: [],
            isLoading: true,
            search: "",
            sortOrder: -1,
			dateOrder: -1
        };
        
		this.articles = [];
		
		this.searchArticles = this.searchArticles.bind(this);
		this.sort = this.sort.bind(this);
		this.orderByDate = this.orderByDate.bind(this);
    }
	
	filterData(searchString, sortOrder, dateOrder) {
		var filteredArticles = [];
		var news = JSON.parse(window.localStorage.articles);
		if(sortOrder != -1) {
			news.sort((a,b)=>{
				if(sortOrder == 0) {
					return a.num_points - b.num_points;
				} else {
					return b.num_points - a.num_points;
				}
			});
		}
		
		if(dateOrder != -1) {
			news.sort((a,b) => {
				var date1 = new Date(a.created_at).getTime();
				var date2 = new Date(b.created_at).getTime();
				if(dateOrder == 0) {
					if (date1 > date2) return 1;
					if (date1 < date2) return -1;
					return 0;
				} else if(dateOrder) {
					if (date1 > date2) return -1;
					if (date1 < date2) return 1;
					return 0;
				}
			});
		}
		
		if (searchString.length == 0) {
			filteredArticles = news;
		} else {
			filteredArticles = news.filter( (article) => {
				var name = article.title.toLowerCase();
				if(name.indexOf(searchString) < 0) {
					return false;
				}
				return true;
			});
		}
		
		return filteredArticles;
	}
	
	sort(event) {
		var sortOrder = event.target.value;
		this.setState({
			sortOrder: sortOrder
		});
		this.setState({
			news: this.filterData(this.state.search, sortOrder, this.state.dateOrder)
		});
	}
	
	searchArticles(event) {
		var searchString = (event.target.value).toLowerCase();
		this.setState({search: event.target.value});
		
		this.setState({
			news: this.filterData(searchString, this.state.sortOrder, this.state.dateOrder)
		});
	}
	
	orderByDate(event) {
		this.setState({
			dateOrder: event.target.value
		});
		this.setState({
			news: this.filterData(this.state.search, this.state.sortOrder, event.target.value)
		});
	}

    componentDidMount() {

        var _this = this;
        fetch("http://starlord.hackerearth.com/hackernews").then(res => res.json())
        .then(response => {
            
			for(var i=1; i< response.length; i++) {
				_this.articles.push(response[i]);
			}
			window.localStorage.articles = JSON.stringify(_this.articles);
            _this.setState({
                isLoading: false,
                news: _this.filterData(this.state.search, this.state.sortOrder, this.state.dateOrder)
            });
			
        });
    }

    render() {
        return (
			<div className="container-fluid no-padding">
				<div className="banner">
					<h4>Hacker News</h4>
					<p className="text-success">Best Hacker News Articles</p>
				</div>
				<div className="container">
					<div className="row">
						<div className="input-group col-md-4">
                            <input type="text" className="search-query form-control" placeholder="Search" value={this.state.search} onChange={this.searchArticles} />
                            <span className="input-group-addon">
                                <i className="text-danger">
                                    <span className="glyphicon glyphicon-search"></span>
                                </i>
                            </span>
                        </div>
						<div className="col-md-4">
							<select className="form-control" value={this.state.sortOrder} onChange={this.sort}>
								<option value="-1">Sort by Points</option>
								<option value="0">Ascending</option>
								<option value="1">Descending</option>
							</select>
						</div>
						<div className="col-md-4">
							<select className="form-control" value={this.state.dateOrder} onChange={this.orderByDate}>
								<option value="-1">Sort by Date</option>
								<option value="0">Oldest First</option>
								<option value="1">Newest First</option>
							</select>
						</div>
					</div> <br/>
					<div className="row">				
						{
							this.state.isLoading? (
								<div className="container">
									<div className="is-processing">
										<p>
											<i className="fa fa-spinner fa-3x fa-fw"></i>
											<span>Loading...</span>
										</p>
									</div>
								</div>
							): <Articles items={this.state.news} />
						}
					</div>
				</div>
			</div>
        )
    }
}

export default App;