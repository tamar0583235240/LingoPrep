import { Request, Response } from 'express';
import { deleteFileFromCloudinary, uploadFileToCloudinary } from '../config/cloudinary';
import InterviewMaterialSubRepository from '../reposioty/InterviewMaterialSubRepository';

export const getInterviewMaterialSubs = async (req: Request, res: Response): Promise<void> => {
    try {
        const items = await InterviewMaterialSubRepository.getInterviewMaterialSubs();
        res.json(items);
    } catch (error) {
        console.error('Error in interview material sub controller:', error);
        res.status(500).json({ error });
    }
};

export const updateInterviewMaterialSub = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, short_description } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
        const existingMaterialSub = await InterviewMaterialSubRepository.getInterviewMaterialSubById(id);

        if (!existingMaterialSub) {
            res.status(404).json({ message: 'Interview material sub not found' });
            return;
        }

        console.log('Existing Material Sub file:', existingMaterialSub.fileUrl);
        
        let updatedThumbnail = existingMaterialSub.thumbnail;
        let updatedFileUrl = existingMaterialSub.fileUrl;

        if (files?.thumbnail?.[0]) {
            const match = existingMaterialSub.thumbnail.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|pdf|mp4|webm|svg|gif)$/);
            if (match && match[1]) { await deleteFileFromCloudinary(match[1]); }
            const thumbnailResult = await uploadFileToCloudinary(files.thumbnail[0], 'interviewMaterialsHub/thumbnails');
            updatedThumbnail = thumbnailResult.secure_url;
        }
        if (files?.file?.[0]) {
            const match = existingMaterialSub.fileUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|png|jpeg|pdf|mp4|webm|svg|gif)$/);
            if (match && match[1]) { await deleteFileFromCloudinary(match[1]); }
            const fileResult = await uploadFileToCloudinary(files.file[0], 'interviewMaterialsHub/files');
            updatedFileUrl = fileResult.secure_url;
        }

        const updatedInterviewMaterialSub = await InterviewMaterialSubRepository.updateInterviewMaterialSub(
            id,
            title || existingMaterialSub.title,
            short_description || existingMaterialSub.shortDescription,
            updatedThumbnail,
            updatedFileUrl
        );

        res.json(updatedInterviewMaterialSub);

    } catch (error) {
        console.error('Error in update interview material sub controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const addInterviewMaterialSub = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const thumbnailFile = files?.thumbnail?.[0];
        const file = files?.file?.[0];
        if (!file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        let thumbnail: string | undefined;
        if (thumbnailFile) {
            const thumbnailResult = await uploadFileToCloudinary(thumbnailFile, 'interviewMaterialsHub/thumbnails');
            thumbnail = thumbnailResult.secure_url;
        }

        const result = await uploadFileToCloudinary(file, 'interviewMaterialsHub/files');

        const resultData = await InterviewMaterialSubRepository.createInterviewMaterialSub(
            req.body.title,
            thumbnail ?? '',
            result.secure_url,
            req.body.short_description
        );
        if (!resultData) {
            res.status(500).json({ message: 'Failed to save file data' });
            return;
        }
        res.status(201).json({
            message: 'File uploaded successfully',
            data: resultData,
        });

    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};


