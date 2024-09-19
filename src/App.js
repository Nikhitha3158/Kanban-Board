import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.tickets && Array.isArray(data.tickets) && data.users && Array.isArray(data.users)) {
          setTickets(data.tickets);
          setUsers(data.users);
        } else {
          throw new Error('Invalid data structure');
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  const groupTickets = (tickets, grouping) => {
    if (!Array.isArray(tickets)) {
      return {};
    }

    return tickets.reduce((groups, ticket) => {
      let groupKey;

      if (grouping === 'user') {
        const user = users.find(user => user.id === ticket.userId);
        groupKey = user ? user.name : 'Unknown User';
      } else if (grouping === 'priority') {
        groupKey = priorityLabels[ticket.priority] || 'No priority';
      } else {
        groupKey = ticket[grouping] || 'No Group';
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(ticket);
      return groups;
    }, {});
  };

  const sortTickets = (tickets, sortBy) => {
    if (!Array.isArray(tickets)) {
      return [];
    }

    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const groupedTickets = groupTickets(tickets, grouping);
  const sortedGroupedTickets = Object.keys(groupedTickets).map(groupKey => {
    return {
      group: groupKey,
      tickets: sortTickets(groupedTickets[groupKey], sortBy),
    };
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="kanban-board">
      <Header setGrouping={setGrouping} setSortBy={setSortBy} />
      <div className='main-body'>
      <Board
        groupedTickets={sortedGroupedTickets}
        getUserName={getUserName}
      /></div>
    </div>
  );
}

export default App;
