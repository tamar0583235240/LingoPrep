import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

<Rating
  name="rating"
  value={value}
  precision={1}
  icon={<StarIcon fontSize="inherit" htmlColor="#FFC107" />}
  emptyIcon={<StarIcon fontSize="inherit" htmlColor="#E0E0E0" />}
  readOnly
/>