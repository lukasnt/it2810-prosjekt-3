import React from 'react';
import {
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader, TextField
} from "@material-ui/core";

/*
export interface FilterProps {
    filtertype : string;
    filters : string[];
}
 */

const FilterList = () => {
    //State for checkboxes, will probably use redux instead
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    /* Dummy data, to be given by props */
    const filterType = "Genre";
    const filterValues =["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"];

    return (
        <div className="filterList">
            <TextField id="movietitle-searchfield" label="Search movie" />
            <List dense subheader={<ListSubheader>{filterType}</ListSubheader>}>
            {filterValues.map((filter:string) => {
                const labelId = `checkbox-list-label-${filter}`;
                const index = filterValues.indexOf(filter);
                return (
                    <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="end"
                                checked={checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={filter} />
                    </ListItem>
                );
            })}
            </List>
        </div>
    );
};

export default FilterList;