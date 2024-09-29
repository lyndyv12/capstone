import React from 'react'
import UserCard from './UserCard'

function UsersContainer({ users }) {
    console.log(users)
  return (
    <div>
        {users.map((user)=>(
            <UserCard key={user.id} user={user} />
        ))}
    </div>
  )
}

export default UsersContainer