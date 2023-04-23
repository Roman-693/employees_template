import EmployeesListLtem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp}) => {

    const elements = data.map(item => {
        const {id, ...otherProps} = item;
        return (
            <EmployeesListLtem 
                key={id} 
                {...otherProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(event) => onToggleProp(id, event.currentTarget.getAttribute('data-toggle'))}/>
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
};

export default EmployeesList;