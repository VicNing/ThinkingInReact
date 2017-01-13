const React = require('react');
const ReactDOM = require('react-dom');
require('normalize.css');
require('../style/main.css');

const data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filterText: '', inStockOnly: false};
        this.onFilterChange = this.onFilterChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }

    render() {
        return (
            <div className="productTable">
                <SearchBar
                    data={this.props.data}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterChange={this.onFilterChange}
                    onCheckChange={this.onCheckChange}/>
                <ProductTable
                    data={this.props.data}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}/>
            </div>
        );
    }

    onFilterChange(e) {
        this.setState({filterText: e.target.value});
    }

    onCheckChange(e) {
        this.setState({inStockOnly: e.target.checked});
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="searchBar">
                <input type="text" value={this.props.filterText} onChange={this.props.onFilterChange}/>
                <div>
                    <input id="checkbox" type="checkbox" value={this.props.inStockOnly}
                           onChange={this.props.onCheckChange}/>
                    <label>Only show products in stock</label>
                </div>
            </div>
        );
    }
}

class ProductTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let data = null;
        if (this.props.inStockOnly) {
            data = this.props.data.filter((item) => {
                return item.stocked;
            });
        } else {
            data = this.props.data;
        }

        let products = null;
        if (this.props.filterText) {
            products = data.map((item, index) => {
                if (item.name.indexOf(this.props.filterText) !== -1) {
                    return (
                        <ProductRow key={index} data={item}/>
                    );
                }
            })
        } else {
            products = data.map((item, index) => {
                return (
                    <ProductRow key={index} data={item}/>
                );
            })
        }

        return (
            <div>
                Name Price
                <ProductCategoryRow catagoryNames="Sporting Goods"/>
                {products.filter(item => item && 'Sporting Goods' === item.props.data.category)}
                <ProductCategoryRow catagoryNames="Electronics"/>
                {products.filter(item => item && 'Electronics' === item.props.data.category)}
            </div>
        );
    }
}

class ProductCategoryRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.catagoryNames}
            </div>
        );
    }
}

class ProductRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.data.name}&nbsp;{this.props.data.price}</div>
        );
    }
}

ReactDOM.render(<FilterableProductTable data={data}/>, document.querySelector('#root'));