// SidebarAction.js
import React from 'react';
import TaskList from './TaskList';
import './Sidebar.css'
import taskData from '../data';
import { FaPlay, FaStop } from 'react-icons/fa';
import { BiSolidRectangle } from 'react-icons/bi';
import { BsXDiamond } from 'react-icons/bs';
import { IoTimer } from 'react-icons/io5';

const SidebarAction = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div>
        <TaskList data={taskData} />
      </div>
    </aside>
  );
};

export default SidebarAction;
