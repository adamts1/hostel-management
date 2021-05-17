import { Dropdown, FormControl} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './RoomDropDown.css'

function RoomDropDown({rooms, onClick}) {
    const [chosenValue, setChosenValue] = useState();

    const chosenRoomHandler = (e) =>{
      setChosenValue(e.target.innerHTML);
      // Send room and room key 
      onClick(e.target.innerHTML, e.target.id);
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          &#x25bc;
        </a>
      ));
      // forwardRef again here!
      // Dropdown needs access to the DOM of the Menu to measure it
      const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
          const [value, setValue] = useState('');
      
          return (
            <div
              ref={ref}
              style={style}
              className={className}
              aria-labelledby={labeledBy}
            >
              <FormControl
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Search..."
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <ul className="list-unstyled">
                {React.Children.toArray(children).filter(
                  (child) =>
                    !value || child.props.children.toLowerCase().startsWith(value),
                )}
              </ul>
            </div>
          );
        },
      );
    return (
      <div className="c-roomdropdown">
        <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Choose Room: {chosenValue}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
        {rooms.map(room =>
              <Dropdown.Item eventKey={room.key} id={room.id} onClick={chosenRoomHandler}>{room.roomNumber}</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      </div>
    );
}

export default RoomDropDown;