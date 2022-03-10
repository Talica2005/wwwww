import React from 'react'

import './ActionItem.css'

const ActionItem = (props) => (
    <div>
        {props.userId === props.creatorId ? (
            <ul>
                <li key={props.eventId} className="events__list-item">
                    <div>
                        <h1>{props.title}</h1>
                        <h2>
                            {props.price} kr - {new Date(props.date).toLocaleDateString()}
                        </h2>
                    </div>
                </li>
            </ul>
        ) : (
            <p></p>
        )}
    </div>
)

export default ActionItem
