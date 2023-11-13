import React, { useState, useRef } from 'react';

const AddConferenceComponent = () => {
    const [conferenceName, setConferenceName] = useState('');
    const [conferenceDateStart, setConferenceDateStart] = useState('');
    const [conferenceDateEnd, setConferenceDateEnd] = useState('');
    const [conferenceLocation, setConferenceLocation] = useState('');
    const [conferencePassword, setConferencePassword] = useState('');

    const formContainerRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8081/konferencija/addKonf'

        const conference = {
            ime: conferenceName,
            startTime: conferenceDateStart,
            endTime: conferenceDateEnd,
            mjestoKonf: conferenceLocation,
            password: conferencePassword
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(conference),
            });

            if (response.ok) {
                console.log('Conference submitted successfully');
                // Optionally, you can redirect or show a success message to the user.
            } else {
                console.error('Failed to submit conference');
            }
        } catch (error) {
            console.error('Error submitting conference:', error);
        }
    };

    return (
        <div className="center-container">
            <div ref={formContainerRef} className="login-container">
                <h2>Add Conference</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Conference Name:
                        <input
                            type="text"
                            name="ime"
                            value={conferenceName}
                            className="input-field"
                            required
                            onChange={(e) => setConferenceName(e.target.value)}
                        />
                    </label>

                    <label>
                        Date Start:
                        <input
                            type="date"
                            name="startTime"
                            value={conferenceDateStart}
                            className="input-field"
                            required
                            onChange={(e) => setConferenceDateStart(e.target.value)}
                        />
                    </label>

                    <label>
                        Date End:
                        <input
                            type="date"
                            name="endTime"
                            value={conferenceDateEnd}
                            className="input-field"
                            required
                            onChange={(e) => setConferenceDateEnd(e.target.value)}
                        />
                    </label>

                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={conferenceLocation}
                            className="input-field"
                            required
                            onChange={(e) => setConferenceLocation(e.target.value)}
                        />
                    </label>

                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={conferencePassword}
                            className="input-field"
                            required
                            onChange={(e) => setConferencePassword(e.target.value)}
                        />
                    </label>


                    <button type="submit">Submit Conference</button>
                </form>
            </div>
        </div>


    );
};

export default AddConferenceComponent;