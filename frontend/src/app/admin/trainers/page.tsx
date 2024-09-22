// File: app/admin/trainers/page.tsx
import BaseListDetailsPage from '../dashboard/components/BaseListDetailsPage';

const trainersData = [
  { id: '1', name: 'Trainer 1', details: 'Details about Trainer 1' },
  { id: '2', name: 'Trainer 2', details: 'Details about Trainer 2' },
  // More trainer data
];

const TrainerPage = () => {
  return (
    <BaseListDetailsPage
      data={trainersData}
      getItemText={(trainer) => trainer.name}
      getItemDetails={(trainer) => trainer.details}
    />
  );
};

export default TrainerPage;
