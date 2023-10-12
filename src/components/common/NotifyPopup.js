import { useForm } from "react-hook-form";

const NotifyPopup = (props) => { 
    // console.log(props);
    const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
    const onSubmit = async (data) => { 
        console.log(data);
    }

    return (
        <div className={`fixed w-full flex items-center h-screen justify-center top-0 left-0 z-[999999] ${props.nameClass}`}>
             <div onClick={props.close} className="absolute z-[2]  w-full top-0 left-0 w-full h-screen bg-opacity-80 bg-black"></div>
                <div className="max-w-md bg-white p-8 relative z-[4]">
                    <div className="flex items-start justify-between mb-5">
                        <h2 className="text-xl">Notify Me When Available</h2>
                        <span className="cursor-pointer font-medium text-gray" onClick={props.close}>x</span>
                    </div>
                <p className="text-xs mb-5">We'll notify you when this product is back in stock</p>
                <p className="text-base mb-5">{props.content.ITEM_DESC}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            placeholder="Enter Email"
                            type="email"
                            className="bg-gray-50 mb-3 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...register("email", { 
                                    required: "Please enter your email id",
                                    pattern: {
                                        value:
                                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email id",
                                    },
                                })}  
                        />
                    </div>
                    <button type="submit" class="text-white mb-5 bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-ful px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Notify me when available</button>
                </form>
                <p className="text-xs">We don't share your information with others.</p>
            </div>
        </div>
    )
}

export default NotifyPopup