import { useEffect, useState } from "react";

const Todoadd = () => {
    const [list, setList] = useState([]);
    const [listip, setListip] = useState("");
    const [editId, setEditId] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        let res;
        if (editId !== null) {
            res = await updateData(editId);
            setEditId(null);
        } else {
            res = await postData();
        }
        if (res.ok) {
            getData();
            setListip("");
        }
    };

    const handleInput = (evt) => {
        setListip(evt.target.value);
    };

    const getData = async () => {
        const res = await fetch("http://localhost:5000/todo");
        const resData = await res.json();
        if (resData.status === 200) {
            setList(resData.data);
        }
    };

    const postData = async () => {
        const res = await fetch("http://localhost:5000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: listip }),
        });
        return res;
    };

    const updateData = async (id) => {
        const res = await fetch(`http://localhost:5000/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: listip }),
        });
        return res;
    };

    const handleEdit = (id) => {
        const editItem = list.find(item => item.id === id);
        if (editItem) {
            setListip(editItem.value);
            setEditId(id);
        }
    };

    const deleteData = async (id) => {
        const res = await fetch(`http://localhost:5000/todo/${id}`, {
            method: "DELETE",
        });
        return res;
    };

    const handleDelete = async (id) => {
        const res = await deleteData(id);
        if (res.ok) {
            getData();
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <form onSubmit={handleAdd}>
                <input value={listip} onChange={handleInput} placeholder="Enter your list here..." required/>
                <button className="submit" type="submit">{editId !== null ? "UPDATE" : "ADD"}</button>
                <ol>
                    {list.map(item => (
                        <li key={item.id}>
                            {item.value}
                            <button className="edit" type="button" onClick={() => handleEdit(item.id)}>EDIT</button>
                            <button className="delete" type="button" onClick={() => handleDelete(item.id)}>DELETE</button>
                        </li>
                    ))}
                </ol>
            </form>
        </>
    );
};

export default Todoadd;
