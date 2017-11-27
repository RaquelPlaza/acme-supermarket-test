import React, {Component} from 'react';

class AcmeCart extends Component {

	constructor(props) {
		super(props);

		this.state = {
			cartContents: [],
			chargableContents: [],
			products: [
			  { 
			  	name: "Fruit tea", 
			  	id: "FR1", 
			  	price: 3.11, 
			  },
			  {
			  	name: "Strawberries",
			  	id: "SR1",
			  	price: 5
			  },
			  {
			  	name: "Coffee",
			  	id: "CF1",
			  	price: 11.21
			  }
			  
			],
			buyOneGetOneItemCode: "FR1",
			otherOfferItems: []
		};

		this.addToCart=this.addToCart.bind(this);
		this.buyOneGetOne = this.buyOneGetOne.bind(this);
		this.getItemPrice = this.getItemPrice.bind(this);

	}

	addToCart(event, item) {
		event.preventDefault();
		// console.log(event.target.value);
		
		// this.setState(prevState => ({
		//   cartContents: [...prevState.cartContents, item]
		// }));

	}

	buyOneGetOne() {

		let itemsInOffer;
		
		if(this.state.cartContents && this.state.buyOneGetOneItemCode) {	
			itemsInOffer = this.state.cartContents.filter((each) => each.id == this.state.buyOneGetOneItemCode);

		for (var i = 0; i < itemsInOffer.length; i++) {

			let chargableItemsQty = 0;

		if (itemsInOffer[i].qty >= 2) {
			chargableItemsQty = Math.floor(itemsInOffer[i].qty/2) + (itemsInOffer[i].qty % 2);	
		}

		const resolvedPriceAfterOffer = chargableItemsQty * this.getItemPrice(itemsInOffer[i].id);
		console.log('res', resolvedPriceAfterOffer);

		}

		}
			
	}

	getItemPrice(itemId) {
			for (var i = 0; i < this.state.products; i++) {
			if(this.state.products[i].id == itemId) {
				console.log(this.state.products[i]);
				return this.state.products[i].price;
			}
		}


	}


	componentDidMount() {
		// this.buyOneGetOne(this.props.cartContents);
		this.setState({
			cartContents: [
				{
					id: 'FR1',
					qty: 3
				}, 
				{
					id: 'SR1',
					qty: 2
				}]
			});
		// this.buyOneGetOne();
		
	}

	render() {
		// console.log(this.state.cartContents);
		// console.log(this.state.buyOneGetOneItem);
		this.buyOneGetOne();

		// const contents = Object.keys(this.state.cartContents).map(function(each, key) {

		//  return <li key="key">{this.state.cartContents[key].id}</li>
		//  });

		return (
	    <div className='acme-cart'>
	      <h1>Acme cart</h1>
	      <form>
	      <label htmlFor="basket">Basket</label>
			<input name="basket" type="text" />
			<input name="submit" type="submit" onClick={this.addToCart} />
	      </form>
	      <div><ul>{contents}</ul></div>
	    </div>
	  	);
	}
}

export default AcmeCart;