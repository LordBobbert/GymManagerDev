// src/pages/admin/clients/index.tsx

import React from 'react';
import ClientsPage from './ClientsPage';
import withAdminAuth from '../../../components/auth/withAdminAuth';

const ClientsIndex: React.FC = () => {
    return <ClientsPage />;
};

export default withAdminAuth(ClientsIndex);
