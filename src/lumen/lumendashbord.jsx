import React, { useState } from 'react';

const LumenDashboard = () => {
    // Sample static data
    const examComplaints = [
        { id: 1, subject: "Mathematics", issue: "Server timeout during exam", status: "Pending", date: "2023-11-20" },
        { id: 2, subject: "Physics", issue: "Unable to submit answers", status: "Resolved", date: "2023-11-19" },
        { id: 3, subject: "Chemistry", issue: "Wrong time allocation", status: "In Progress", date: "2023-11-18" },
    ];

    const questionComplaints = [
        { id: 1, subject: "Mathematics", questionNo: 5, issue: "Unclear question", status: "Pending", date: "2023-11-20" },
        { id: 2, subject: "Physics", questionNo: 12, issue: "Multiple correct answers", status: "Resolved", date: "2023-11-19" },
        { id: 3, subject: "Biology", questionNo: 8, issue: "Wrong answer key", status: "In Progress", date: "2023-11-18" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Complaint Dashboard</h1>
            
            {/* Exam Complaints Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Exam Complaints</h2>
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {examComplaints.map((complaint) => (
                                <tr key={complaint.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.issue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                                                complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-blue-100 text-blue-800'}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Question Complaints Section */}
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Question Complaints</h2>
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {questionComplaints.map((complaint) => (
                                <tr key={complaint.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.questionNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.issue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                                                complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-blue-100 text-blue-800'}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{complaint.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LumenDashboard;