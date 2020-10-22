import React from 'react';
import AdminProducts from './AdminProducts';
import Divider from '@material-ui/core/Divider';
import AdminOrders from './AdminOrders';
import SettingsIcon from '@material-ui/icons/Settings';

// Statics
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__header">
        <h1>
          <SettingsIcon /> Admin Zone
        </h1>
      </div>

      <Divider />

      <div className="admin__content">
        <div className="admin__content--left">
          <AdminOrders />
        </div>
        <div className="admin__content--right">
          <AdminProducts />
        </div>
      </div>
    </div>
  );
};

export default Admin;
