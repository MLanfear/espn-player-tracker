import '../style.css'
import React from 'react';
import {useState} from 'react';
 
function PlayersModal({onClose, callApi}) {
    const [formState, setFormState] = useState({
        player: "James Conner"
    })    

    function handleFormChange(e){
        setFormState({...formState, [e.target.name]:e.target.value});
        
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        callApi(formState.player);

        onClose();
    }

    return (
        <>
            <div className="modal-background" onClick={onClose}>
                <div className="modal-body container" onClick={(e) => e.stopPropagation()}>
                    <h2> Players </h2>

                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="player-list">
                            <select name='player' onChange={handleFormChange} defaultValue="James Conner">
                                <option value="players">Players</option>
                            </select>
                        </label>
                        <br />
                        <button>
                            Search
                        </button>
                        <button onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
        
       
}

export default PlayersModal;