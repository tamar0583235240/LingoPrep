import { Share2 } from 'lucide-react';
import { Button } from '../../../shared/ui/button';

type ShareButtonProps = {
  setIsDialogOpen: (open: boolean) => void;
};

const ShareButton = ({ setIsDialogOpen }: ShareButtonProps) => {
  return (
    <Button
      variant="transparent"
      size="sm"
      className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/50 transition-all
                 sm:text-xs sm:px-3 sm:py-1.5
                 max-sm:text-xs max-sm:px-2 max-sm:py-1"
      icon={<Share2 className="w-6 h-6 sm:w-5 sm:h-5 max-sm:w-4 max-sm:h-4" />}
      iconPosition="right"
      onClick={() => setIsDialogOpen(true)}
    >
      שיתוף
    </Button>
  );
};

export default ShareButton;