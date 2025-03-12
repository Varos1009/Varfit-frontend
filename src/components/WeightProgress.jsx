import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const WeightProgress = ({ weightData, newWeight, setNewWeight, handleAddWeight, formatDate }) => {
    return (
        <div className="mb-6 w-full p-4 border rounded-lg shadow-sm bg-gray-50 sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
            <h2 className="text-2xl text-center font-semibold text-red-800">Weight Progress</h2>
            <form onSubmit={handleAddWeight} className="flex flex-col sm:flex-row sm:justify-center items-center mt-4">
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    required
                    placeholder="Enter your weight"
                    className="w-full sm:w-auto px-4 py-2 mb-3 sm:mb-0 mr-0 sm:mr-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>

            <ResponsiveContainer width="100%" height={300} className="mt-6">
                <LineChart data={weightData}>
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis domain={["dataMin", "dataMax"]} />
                    <Tooltip
                        content={({ payload }) => {
                            if (!payload || payload.length === 0) return null;
                            const { weight } = payload[0].payload;
                            return (
                                <div className="bg-white p-2 rounded shadow-md">
                                    <p className="text-sm text-blue-700">
                                        <strong>Date: </strong> {formatDate(payload[0].payload.date)}
                                    </p>
                                    <p className="text-sm text-red-700">
                                        <strong>Weight: </strong> {weight} kg
                                    </p>
                                </div>
                            );
                        }}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
};

export default WeightProgress;
