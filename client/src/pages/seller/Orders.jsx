import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
    const {currency, axios} = useAppContext()
    const [orders, setOrders] = useState([])

    const fetchOrders = async ()=>{
        try {
                const {data} = await axios.get('/api/order/seller')
                if(data.success){
                    setOrders(data.orders)
                }else{
                    toast.error(data.message)
                }
        } catch (error) {
            toast.error(error.message)
        }
    };


    useEffect(()=>{
        fetchOrders();
    }, [])


  return (
        <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-5xl space-y-5">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index}className="flex flex-col md:flex-row justify-between gap-6 p-6 border border-gray-300 rounded-md bg-white shadow-sm">
                    {/* Product & Quantity */}
                    <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                        <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
                        <div>
                        {order.items.map((item, i) => (
                            <p key={i} className="font-medium text-base">
                            {item.product.name}{" "}
                            <span className="text-primary">x {item.quantity}</span>
                            </p>
                        ))}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="text-base text-black/70 flex-1 min-w-[200px] leading-relaxed">
                        <p className="text-black font-semibold">
                            {order.address.firstName} {order.address.lastName}
                        </p>
                        <p>{order.address.street}, {order.address.city}</p>
                        <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                        <p>{order.address.phone}</p>
                    </div>

                    {/* Amount */}
                    <p className="text-lg font-semibold text-black my-auto flex-1 min-w-[100px] text-center">
                        {currency}{order.amount}
                    </p>

                    {/* Order Meta */}
                    <div className="text-base text-black/70 flex-1 min-w-[140px] text-right leading-relaxed">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
  )
}

export default Orders
