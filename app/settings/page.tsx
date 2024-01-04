//*This component displays the users account information, 
//*allows them to edit and update their information
import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import AccountClient from './AccountClient';
const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login to view this page" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <AccountClient currentUser={currentUser}/>
    </ClientOnly>
  );
};

export default AccountPage;