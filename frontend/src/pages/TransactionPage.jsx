import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { GET_TRANSACTION, GET_TRANSACTION_STATISTICS } from "../graphql/queries/transactionQuery";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transactionMutation";
import toast from "react-hot-toast";
import TransactionFormSkeleton from "../components/skeletons/TransactionFormSkeleton";

const TransactionPage = () => {
	const { id } = useParams();
	const navigate = useNavigate(); // Initialize useNavigate
	const { loading, data } = useQuery(GET_TRANSACTION, {
		variables: { id: id },
	});

	const [updateTransaction, { loading: loadingUpdate }] = useMutation(UPDATE_TRANSACTION, {
		refetchQueries: [{ query: GET_TRANSACTION_STATISTICS }],
	});

	const [formData, setFormData] = useState({
		description: data?.transaction?.description || "",
		paymentType: data?.transaction?.paymentType || "",
		category: data?.transaction?.category || "",
		amount: data?.transaction?.amount || "",
		location: data?.transaction?.location || "",
		date: data?.transaction?.date || "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const amount = parseFloat(formData.amount); 
		try {
			await updateTransaction({
				variables: {
					input: {
						...formData,
						amount,
						transactionId: id,
					},
				},
			});
			toast.success("Transaction updated successfully");
			navigate("/"); // Redirect to home after update
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (data) {
			setFormData({
				description: data?.transaction?.description,
				paymentType: data?.transaction?.paymentType,
				category: data?.transaction?.category,
				amount: data?.transaction?.amount,
				location: data?.transaction?.location,
				date: new Date(+data.transaction.date).toISOString().substr(0, 10),
			});
		}
	}, [data]);

	if (loading) return <TransactionFormSkeleton />;

	return (
		<div className='h-screen max-w-4xl mx-auto flex flex-col items-center'>
			<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
				Update this transaction
			</p>
			<form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
				{/* TRANSACTION */}
				<div className='flex flex-wrap'>
					<div className='w-full'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='description'
						>
							Transaction
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='description'
							name='description'
							type='text'
							placeholder='Rent, Groceries, Salary, etc.'
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* PAYMENT TYPE */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor='paymentType'>
							Payment Type
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='paymentType'
								name='paymentType'
								onChange={handleInputChange}
								value={formData.paymentType}
							>
								<option value={"card"}>Card</option>
								<option value={"cash"}>Cash</option>
							</select>
						</div>
					</div>

					{/* CATEGORY */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor='category'>
							Category
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='category'
								name='category'
								onChange={handleInputChange}
								value={formData.category}
							>
								<option value={"saving"}>Saving</option>
								<option value={"expense"}>Expense</option>
								<option value={"investment"}>Investment</option>
							</select>
						</div>
					</div>

					{/* AMOUNT */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
							Amount(₹)
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='amount'
							name='amount'
							type='number'
							placeholder='150'
							value={formData.amount}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* LOCATION */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor='location'>
							Location
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							id='location'
							name='location'
							type='text'
							placeholder='New York'
							value={formData.location}
							onChange={handleInputChange}
						/>
					</div>

					{/* DATE */}
					<div className='w-full flex-1'>
						<label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor='date'>
							Date
						</label>
						<input
							type='date'
							name='date'
							id='date'
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							placeholder='Select date'
							value={formData.date}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* SUBMIT BUTTON */}
				<button
					className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'
					type='submit'
					disabled={loadingUpdate}
				>
					{loadingUpdate ? "Updating..." : "Update Transaction"}
				</button>
			</form>
		</div>
	);
};
export default TransactionPage;
