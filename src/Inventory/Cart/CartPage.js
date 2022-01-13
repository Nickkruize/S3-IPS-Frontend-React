import {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/react-fontawesome'
import '@fortawesome/react-fontawesome'
import CartContext from '../../Context/CartContext';
import '../../css/cart.css'
import '../../css/responsive.css'
import CartItem from './CartItem';


export default function CartPage(){
    const {cart} = useContext(CartContext);


    function listCartItems(){
        console.log(cart)
        if (cart.length > 0) {
            return (cart.map((item, index) =>{
                return(
                    <CartItem item={item} index={index}/>
                )
            }));
        }
    }

    function getTotalPrice(){
        let totalprice = 0;
        (cart.map((item) =>{
            totalprice = totalprice + (item.price * item.qty);
            return(totalprice.toFixed(2))
        }))
        return(totalprice.toFixed(2))
    }

    function notImplemented(){
        alert("Checkout not yet implemented")
    }
    return(
        <section id="cart_items">
       	<div class="cartcontainer">
        <div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">
							<td class="image">Item</td>
							<td class="description"></td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
                    {listCartItems()}
					</tbody>
				</table>
			</div>
            </div>
            <div>
                <p style={{marginRight : "5%", textAlign:"right", fontSize: "24px"}}>Total price: €{getTotalPrice()}</p>
            </div>
            <div style={{textAlign:"right"}}>
            <button style={{marginRight : "5%"}} class="btn btn-primary" onClick={() => notImplemented()}>To Checkout</button>
            </div>
            </section>
    )
}