import { useEffect, useState } from 'react';
import { ProgressStats } from './ProgressStats';
import { getProgress } from '../api/api';
import type { ProgressData } from '../api/types';
import { Tips } from './tips';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OverlayPopup = ({ token, userId }: { token: string; userId: string }) => {
  const [pd, setPd] = useState(null as ProgressData | null);
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const progressData: ProgressData | null = await getProgress(token, userId);
      setPd(progressData);
    };
    fetchProgress();
  }, [token, userId]);

  const toggleView = () => {
    setViewIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[--color-background] p-4 space-y-4">
      <div className="flex items-center justify-center space-x-4 w-full max-w-xl h-96 relative overflow-hidden">
        {viewIndex === 0 && <button className="text-3xl font-bold text-primary-dark" onClick={toggleView}>
          <CircleChevronRight size={24} />
        </button>}

        <div className="relative w-full  flex items-center justify-center">
          <AnimatePresence mode="wait">
            {viewIndex === 0 ? (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                {pd && <ProgressStats pd={pd} />}
              </motion.div>
            ) : (
              <motion.div
                key="tips"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <Tips token={token} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {viewIndex === 1 && <button className="text-3xl font-bold text-primary-dark" onClick={toggleView}>
          <CircleChevronLeft size={24} />
        </button>}
      </div>

      <div>

      </div>
    </div>
  );
};
