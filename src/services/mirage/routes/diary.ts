import {Response, Request} from 'miragejs';
import {handleErrors} from '../server';
import {Diary} from '../../../interfaces/diary.interface';
import {Entry} from '../../../interfaces/entry.interface';
import dayjs from 'dayjs';

export const create = (schema: any, req: Request): Diary[] | Response => {
    try {
        const {title, type, entries, userId} = JSON.parse(req.requestBody) as Partial<Diary>;
        const exUser = schema.users.findBy({id: userId});
        if (!exUser) {
            return handleErrors(null, 'No such user exists.');
        }
        const now = dayjs().format();
        exUser.createDiary({
            title,
            type,
            createdAt: now,
            updatedAt: now,
            entries
        });
        return exUser.diary as Diary[];

    } catch (error) {
        return handleErrors(error, 'Failed to create Diary.');
    }
};

export const addEntry = (
    schema: any,
    req: Request
): { diary: Diary; entry: Entry } | Response => {
    try {
        //generate unique string
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const diary = schema.diaries.find(req.params.id);
        const {title, description} = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        const entry = diary.createEntry({
            diaryID: req.params.id,
            id,
            title,
            description,
            createdAt: now,
            updatedAt: now,
            isPinned: false
        });
        diary.update({
            ...diary.attrs,
            updatedAt: now,
            entries: diary.entries + 1
        });
        return {
            diary: diary.attrs,
            entry: entry.attrs,
        };
    } catch (error) {
        return handleErrors(error, 'Failed to save entry.');
    }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    try {
        const user = schema.users.find(req.params.id);
        return user.diary as Diary[];
    } catch (error) {
        return handleErrors(error, 'Could not get user diaries.');
    }
};

export const getEntries = (
    schema: any,
    req: Request
): { entries: Entry[] } | Response => {
    try {
        const diary = schema.diaries.find(req.params.id);
        return diary.entry;
    } catch (error) {
        return handleErrors(error, 'Failed to get Diary entries.');
    }
};

export const updateDiary = (schema: any, req: Request): Diary | Response => {
    try {
        const diary = schema.diaries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Diary>;
        const now = dayjs().format();
        diary.update({
            ...data,
            updatedAt: now,
        });
        return diary.attrs as Diary;
    } catch (error) {
        return handleErrors(error, 'Failed to update Diary.');
    }
};
export const updateEntryPin = (schema: any, req: Request): Entry | Response => {
    try {
        const entry = schema.entries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        entry.update({
            ...data,
            isPinned: !entry.isPinned
        });
        return entry.attrs as Entry;
    } catch (error) {
        return handleErrors(error, 'Failed to update entry.');
    }
};
export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try {
        const entry = schema.entries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        entry.update({
            ...data,
            updatedAt: now,
        });
        return entry.attrs as Entry;
    } catch (error) {
        return handleErrors(error, 'Failed to update entry.');
    }
};
export const deleteEntry = (schema: any, req: Request): { currentEntryId: string, currentDiaryId: string } | Response => {
    try {
        const id = req.params.id
        const diaryId = schema.entries.find(id).diaryID
        const diary = schema.diaries.find(diaryId);
        const now = dayjs().format();

        diary.update({
            ...diary.attrs,
            updatedAt: now,
            entries: diary.entries - 1
        });
        return schema.entries.find(id).destroy();
    } catch (error) {
        return handleErrors(error, 'Failed to update entry.');
    }
};
