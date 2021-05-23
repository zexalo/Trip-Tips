import React from "react";
import PreviewRecomandation from "../Recommendation/Preview";

const list = [
    {
        id: 'a',
        firstname: 'Robin',
        lastname: 'Wieruch',
        year: 1988,
    },
    {
        id: 'b',
        firstname: 'Dave',
        lastname: 'Davidds',
        year: 1990,
    },
];
const List = () => (
    <ul>
        {(list || []).map(() => (
            <PreviewRecomandation/>
        ))}
    </ul>
);

const Category: React.FC = () => {


    return (
        <div>
            <List/>
        </div>
    );
};
export default Category;
