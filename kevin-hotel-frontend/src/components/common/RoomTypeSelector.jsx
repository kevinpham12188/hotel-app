import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomTypes, setRoomTypes] = useState([""]);
    const[showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const[newRoomType, setNewRoomType] = useState("");
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data);
        })
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if(newRoomType !== "") {
            setNewRoomType([...roomTypes, newRoomType]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    }
  return (
    <>
        {roomTypes.length > 0 && (
            <div>
                <select 
                required
                name="roomType" 
                id="roomType"
                onChange={(e) => {
                    if(e.target.value === "Add New") {
                        setShowNewRoomTypeInput(true)
                    } else {
                        handleRoomInputChange(e);
                    }
                }}
                value={newRoom.roomType}
                >
                    <option value="">Select a Room Type</option>
                    <option value={"Add New"}>Add New</option>
                    {roomTypes.map((type, index) => {
                        <option key={index} value={type}>
                            {type}
                        </option>
                    })}
                </select>
                {showNewRoomTypeInput && (
                    <div className="input-group">
                        <input 
                        type="text"
                        className="form-control"
                        placeholder='Enter a New Room Type'
                        onChange={handleNewRoomTypeInputChange} />
                        <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>Add</button>
                    </div>
                )}
            </div>
        )}
    </>
  )
}

export default RoomTypeSelector