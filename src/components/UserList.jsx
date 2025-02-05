import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // Menyimpan data user yang sedang diedit
    const [newUserData, setNewUserData] = useState({ name: "", email: "" });

    // Mendapatkan data pengguna
    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // Menangani perubahan form input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
    };

    // Menangani pengiriman form edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user data
            await axios.put(`http://localhost:5000/users/${editingUser.id}`, newUserData);
            // Update list of users with the new data
            setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...newUserData } : user)));
            setEditingUser(null); // Close the form after update
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Menangani klik tombol edit
    const handleEditClick = (user) => {
        setEditingUser(user); // Menetapkan user yang sedang diedit
        setNewUserData({ name: user.name, email: user.email }); // Menetapkan nilai awal form edit
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">CRUD React + MySQL</h1>
            <h2 className="text-center">User List </h2>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEditClick(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form edit, hanya tampil jika sedang mengedit */}
            {editingUser && (
                <div>
                    <h3>Edit User</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={newUserData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={newUserData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <button type="submit">Update</button>
                    </form>
                    <button onClick={() => setEditingUser(null)}>Cancel</button> {/* Tombol untuk membatalkan edit */}
                </div>
            )}
        </div>
    );
};

export default UserList;
