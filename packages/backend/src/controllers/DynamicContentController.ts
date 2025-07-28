import { Request, Response } from 'express';
import dynamicContentRepository from '../repository/dynamicContentRepository';

export const getAllDynamicContents = async (req: Request, res: Response) => {
  try {
    const contents = await dynamicContentRepository.getAllDynamicContents();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dynamic contents' });
  }
};

export const updateDynamicContent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    const updated = await dynamicContentRepository.updateDynamicContent(id, content);
    if (!updated) return res.status(404).json({ error: 'Content not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error updating dynamic content' });
  }
};
