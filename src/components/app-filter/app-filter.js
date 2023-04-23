import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'riseFilter', label: 'На повышение'},
        {name: 'salaryFilter', label: 'З/П больше 1000$'},
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const btnClassName = active ? "btn-light" : "btn-outline-light";
        return (
            <button 
                type="button"
                className={`btn ${btnClassName}`}                   
                key={name}
                onClick={() => props.onUpdateFilter(name)}>
                {label}
            </button>
        );
    });

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
};

export default AppFilter;