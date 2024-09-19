import { ReactComponent as DotMenu } from './assests_kanban/icons_FEtask/3 dot menu.svg';
import { ReactComponent as Add } from './assests_kanban/icons_FEtask/add.svg';
import { ReactComponent as BackLog } from './assests_kanban/icons_FEtask/Backlog.svg';
import { ReactComponent as Cancelled } from './assests_kanban/icons_FEtask/Cancelled.svg';
import { ReactComponent as Done } from './assests_kanban/icons_FEtask/Done.svg';
import { ReactComponent as Down } from './assests_kanban/icons_FEtask/down.svg';
import { ReactComponent as HighPriority } from './assests_kanban/icons_FEtask/Img - High Priority.svg';
import { ReactComponent as LowPriority } from './assests_kanban/icons_FEtask/Img - Low Priority.svg';
import { ReactComponent as MediumPriority } from './assests_kanban/icons_FEtask/Img - Medium Priority.svg';
import { ReactComponent as InProgress } from './assests_kanban/icons_FEtask/in-progress.svg';
import { ReactComponent as NoPriority } from './assests_kanban/icons_FEtask/No-priority.svg';
import { ReactComponent as UrgentColour } from './assests_kanban/icons_FEtask/SVG - Urgent Priority colour.svg';
import { ReactComponent as UrgentGrey } from './assests_kanban/icons_FEtask/SVG - Urgent Priority grey.svg';
import { ReactComponent as ToDo } from './assests_kanban/icons_FEtask/To-do.svg';
import './Board.css'; 

const groupIcons = {
  'Backlog': <BackLog />,
  'Cancelled': <Cancelled />,
  'Done': <Done />,
  'In progress': <InProgress />,
  'Todo': <ToDo />,
  'Urgent':<UrgentGrey/>,
  'High' : <HighPriority/>,
  'Low' : <LowPriority/>,
  'Medium' : <MediumPriority/>,
  'No priority' : <NoPriority/>,
};
const priorityIcons = {
  'High': <HighPriority />,
  'Medium': <MediumPriority />,
  'Low': <LowPriority />,
  'No priority': <NoPriority />,
  'Urgent' : <UrgentColour/>,
};

function Board({ groupedTickets, getUserName }) {
  function getPriorityLabel(priority) {
    switch (priority) {
      case 4:
        return 'Urgent';     
      case 3:
        return 'High';       
      case 2:
        return 'Medium';     
      case 1:
        return 'Low';      
      default:
        return 'No priority';
    }
  }
  
    return (
     <div className='board-content'>
      
      <div className="board">
        {groupedTickets.map(group => (
          <div key={group.group} className="group-content">
               <h3 className="group-header">
                 <div>
                   <span className='group-icons'>{groupIcons[group.group]}</span>
                   <strong>{group.group}</strong>
                   <span className='ticket-count'>{group.tickets.length}</span>
                 </div>
                 <div>
                  <span className="general-icons">
                    <Add />
                    <DotMenu />
                 </span>
                 </div>

              </h3>

            <div className='column' >
            <ul>
              {group.tickets.map(ticket => (
                <li key={ticket.id}>
                  <p>{ticket.id}</p>
                  <input 
                    type="checkbox" 
                    id={`checkbox-${ticket.id}`} 
                    name={ticket.id} 
                  />
                  <label htmlFor={`checkbox-${ticket.id}`}>
                    <strong className='ticket-title'>{ticket.title}</strong> 
                  </label>
                  <div className="tags">
                    <div className='tag-container'>
                     <span className='priority-icons'>
                         {priorityIcons[getPriorityLabel(ticket.priority)] || <NoPriority />}
                     </span>
                     <span className="tag">Priority: {getPriorityLabel(ticket.priority)}</span>
                     </div>
                  </div>
                </li>
              ))}
            </ul>
            </div>
          </div>
        ))}
      </div>
    </div> 
    );
}

export default Board;
