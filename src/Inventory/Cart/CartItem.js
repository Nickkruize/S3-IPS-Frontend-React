import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CartContext from '../../Context/CartContext';
import { useContext } from 'react';

const CartItem = (props) => {
    const item = props.item
    const index = props.index
    const {addToCart, removeFromCart, changeQty} = useContext(CartContext);

    function getItemTotalPrice(item){
        const value = item.price * item.qty
        return value.toFixed(2)  
    }

    return (
        <tr id={index}>
            <td class="cart_product">
            <Link to={{ pathname: `/Product/${item.id}` }}><img style={{maxWidth: "50%"}}src={item.imgUrl} alt="" /></Link>
            </td>
            <td class="cart_description">
                <h4><Link to={{ pathname: `/Product/${item.id}` }}>{item.name}</Link></h4>
            </td>
            <td class="cart_price">
                <p>€{item.price}</p>
            </td>
            <td class="cart_quantity">
            <div class="cart_quantity_button">
                <input type="text" class="cart_quantity_input" value={item.qty} name="quantity"/>
                </div>
                <br/>
                <br/>
                <div class="cart_quantity_button">
                    <button style={{ marginRight:"10%" }} onClick={() => addToCart(item)} class="cart_quantity_up" > + </button>              
                    <button style={{ marginRight:"10%" }} onClick={() => changeQty(item, item.qty-1)} class="cart_quantity_down"> - </button>
                    <button class="cart_quantity_delete" onClick={() => removeFromCart(item)}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
            </td>
            <td class="cart_total">
                <p class="cart_total_price">€ {getItemTotalPrice(item)}</p>
            </td>
        </tr>
    )
};

export default CartItem;