
import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import nextId from 'react-id-generator';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "John S.", salary: 1400, increase: false, rise: true, id: 1},
                {name: "David A.", salary: 1100, increase: false, rise: false, id: 2},
                {name: "Jim H.", salary: 900, increase: true, rise: false, id: 3},
            ],
            term: '',
            filter: 'all',
        };
        this.nextId = nextId;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id),
            };
        });
    };

    addItem = (name, salary) => {        
        this.nextId = nextId();                
        const newItem = {name, salary, increase: false, rise: false, id: this.nextId};        

        this.setState(({data}) => {            
            return {
                data: [...data, newItem],
            };
        });
    };

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }));
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        } else {
            return items.filter(item => {
                return item.name.indexOf(term) > -1;
            });
        }
    };

    onUpdateSearch = (term) => {
        this.setState({term});
    };

    filter = (items, filter) => {  
        
        switch (filter) {
            case "riseFilter":
                return items.filter(item => item.rise);                
            case "salaryFilter":
                return items.filter(item => item.salary >= 1000);                
            default:
                return items;
        }
    };

    onUpdateFilter = (filter) => {        
        this.setState({filter});
    };
        
    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filter(this.search(data, term), filter);
        return (                        
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;