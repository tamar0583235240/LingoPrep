import { Request, Response } from 'express';
import tipsAndPracticesRepository from '../reposioty/tipsRepository';
import { Tips } from '../interfaces/entities/Tips';

const addTip = async (req: Request, res: Response): Promise<Tips | void> => {
    try {
        const tip: Tips = req.body;
        console.log(tip);

        const result = await tipsAndPracticesRepository.addTip(tip);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding tip:', error);
        res.status(500).json({ error: 'Internal Server Error', details: (error as Error).message });
    }
};

export { addTip };

export const adminTipController = async (req: Request, res: Response): Promise<void> => {
    console.log('adminTipController called');
    try {
        const items = await tipsAndPracticesRepository.getAllTips();
        res.json(items);
    } catch (error) {
        console.error('Error in adminTipController:', error);
        res.status(500).json({ error: 'GET_ALL_TIPS_FAILED', details: (error as Error).message });
    }
};

export const updateTipController = async (req: Request, res: Response): Promise<void> => {
    console.log('updateTipController called');
    try {
        const updates = req.body;
        console.log('Received updates:', updates);
        const updatedTip = await tipsAndPracticesRepository.updateTipById(updates);
        res.json(updatedTip);
    } catch (error) {
        console.error('Error in updateTipController:', error);
        res.status(400).json({ error: 'Failed to update tip', details: (error as Error).message });
    }
};

export const deleteTipController = async (req: Request, res: Response): Promise<void> => {
    console.log('deleteTipController called');
    try {
        const tipId = req.params.tip_id;
        await tipsAndPracticesRepository.deleteTipById(tipId);
        res.status(200).send({ message: 'Tip deleted successfully' });
    } catch (error) {
        console.error('Error in deleteTipController:', error);
        res.status(500).json({ error: 'DELETE_TIP_FAILED', details: (error as Error).message });
    }
};
