import { useState } from 'react';

function UserInput() {
    const [name, setName] = useState('');
    
    return (
        <div>
        <h2>User Input</h2>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <p>Nama Anda : {name}</p>
        </div>
    );
}

export default UserInput;