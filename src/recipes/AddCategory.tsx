import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { addCategory } from "./categoryService";

export default function AddCategory() {
    const category = useRef("");
    const navigate = useNavigate();

    async function submitNewCategory()  {
        try {
            await addCategory(name);
            alert("Category added successfully");
            navigate("/categories");

        }
        catch (error) {
            console.log("Present the error to the user");
        }
    }

    return (
        <div>
            <h2>Add Category</h2>
            <input type="text" placeholder="Category" ref={category} />
            <button onClick={submitNewCategory}>Add</button>
        </div>
    );
}