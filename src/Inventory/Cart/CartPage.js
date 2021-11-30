import react, {useContext} from 'react';
import CartContext from '../../Context/CartContext';


export default function CartPage(){
    const {cart} = useContext(CartContext);


    function listCartItems(){
        if (cart.length > 0) {
            return (cart.map((item, index) =>{
                console.log(item)
                return <p key={index}>{item.name}</p>
            }));
        }
    }

    return(
        <div>
        {listCartItems()}
        </div>
    )
}