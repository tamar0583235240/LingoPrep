import { Request, Response } from "express";
import { getPublicProfileBySlug } from "../repository/publicProfileRepository";
import { log } from "console";
export const getPublicProfileBySlugHandler = async (
  req: Request,
  res: Response
) => {
  const slug = req.params.slug;

  try {
    const profile = await getPublicProfileBySlug(slug);
    console.log("profile data:", profile);

    if (!profile) {
      return res.status(404).json({ message: "Public profile not found." });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public profile." });
  }
}
