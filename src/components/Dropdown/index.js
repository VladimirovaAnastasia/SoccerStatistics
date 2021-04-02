import React, {useState} from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import {years} from '../../const';

const findYearObj = (value, key) => {
    return years.find((item) => {
        return item[key] === value;
    });
};

const CalendarDropdown = ({value, setValue}) => {
    const [selectedValue, setSelectedValue] = useState(findYearObj(value, 'searchYear'));

    const onSelect = (eventKey) => {
        const year = findYearObj(eventKey, 'title');
        setSelectedValue(year);
        setValue(year.searchYear);
    };

    return (
        <div className="d-flex">
            <Dropdown onSelect={onSelect} id="dropdown-basic" className="mb-4">
                <Dropdown.Toggle>{selectedValue.title}</Dropdown.Toggle>
                <Dropdown.Menu>
                    {years.map((year) => (
                        <Dropdown.Item eventKey={year.title} key={year.id}>
                            {year.title}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default CalendarDropdown;
