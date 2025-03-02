import Transaction from "../models/transactionModel.js";

const transactionResolver = {
    Query: {
        transactions: async(_, __, context) => {
            try {
                if(!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._Id;

                const transactions = await Transaction.find({userId});
                return transactions;
            } catch (error) {
                console.error("Error in transactions query", error);
                throw new Error( "Internal server error");
            }
        },

        transaction: async(_, {transactionId}) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.error("Error in transaction query", error);
                throw new Error( "Internal server error");
            }
        }
    },
    Mutation: {
        createTransaction: async(_, {input}, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                });
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                console.error("Error in createTransaction mutation", error);
                throw new Error( "Internal server error");   
            }
        },

        updateTransaction: async(_, {input}) => {
            try {
                const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {new: true});
                return updateTransaction;
            } catch (error) {
                console.log("Error in updating transaction", error);
                throw new Error( "Internal server error");
            }
        },

        deleteTransaction: async(_, {transactionId}) => {
            try {
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction;
            } catch (error) {
                console.log("Error in deleting transaction", error);
                throw new Error( "Internal server error");
            }
        }
    },
    //add a transaction
}

export default transactionResolver;