import React, { useState, useEffect } from "react";
import axios from "axios";

import toast, { Toaster } from 'react-hot-toast';

const Add = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    time: "",
    phone: "",
    place:"",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(res.data);
    };
    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if( !input.name || !input.time || !input.phone || !input.place){
      toast.error("Plz enter all details")
      return
    }
    await axios.post("http://localhost:9000/api/v1/users", input);
    setRender(true);
    setInput({
      name: "",
    time: "",
    phone: "",
    place:"",
    });
    toast.success('Successfully Added!')
  };
  return (
    <>
     <div><Toaster/></div>
      <div className="container py-4">
        <div className="row">
        <div className="flex items-center justify-center bg-blue-500 text-white text-3xl">
  <h1 className="mx-2 my-2 py-2">STUDENT DETAILS</h1>
</div>
          <div className="col-md-6">
            <form className="py-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  time : 
                </label>
                <input
                  name="time"
                  value={input.time}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="datetime-local"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  phone
                </label>
                <input
                  value={input.phone}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="phone"
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  place
                </label>
                <input
                  value={input.place}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="place"
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>
            </form>
          </div>
         
        </div>
      </div>
      
    </>
  );
};

export default Add;
