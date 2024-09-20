// File: app/admin/dashboard/components/PlaceholderCard.tsx
import { Card, CardContent, Typography } from '@mui/material';

const PlaceholderCard = ({ title }: { title: string }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          This is a placeholder card for {title}.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceholderCard;
