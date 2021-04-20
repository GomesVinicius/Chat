import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body;

        const settingRepository = getCustomRepository(SettingsRepository);
    
        const settings = settingRepository.create({
            chat,
            username,
        });
    
        await settingRepository.save(settings);
    
        return response.json(settings);
    }
}

export { SettingsController };
