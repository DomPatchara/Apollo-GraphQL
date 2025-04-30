import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

// Query by "gql" --> can use set up from Apollo Server 
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query GetUsersById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation Mutation($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      age
      id
      isMarried
      name
    }
  }
`;

// App
function App() {

  // Get All Users
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  // Get User By ID
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USERS_BY_ID, {
    variables: { id: "2" },
  });

  // Create User
  const [createUser] = useMutation(CREATE_USER);

  const [newUser, setNewUser] = useState({});

  const handleCreateUser = async () => {
    console.log(newUser);

    try {
      await createUser({
        variables: {
          name: newUser.name,
          age: Number(newUser.age),
          isMarried: false,
        },
      });

      // After Clicked Create User ----> Clear Empty Input
      setNewUser({ name: "", age: "" });
    } catch (error) {
      console.log("Error message:", error);
    }
  };



  if (getUsersLoading) return <p> Data loading... </p>;
  if (getUsersError) return <p> Error: {error.message} </p>;

  console.log(getUsersData);
  console.log(getUserByIdData);

  return (
    <>
      {/** Get All User */}
      <h1>All Users</h1>
      <div>
        {getUsersData.getUsers.map((user) => (
          <div key={user.id} style={{ borderBottom: "1px solid white" }}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
      
      {/** Get User By ID */}
      <div>
        {getUserByIdLoading ? (
          <p>Loading user...</p>
        ) : (
          <div>
            <h1> Chosen User </h1>
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
            <p>Is this user married: {getUserByIdData.getUserById.isMarried}</p>
          </div>
        )}
      </div>

      {/** Create New User */}
      <div>
        <h1> Create New User </h1>
        <input
          value={newUser.name}
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          value={newUser.age}
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </>
  );
}

export default App;
