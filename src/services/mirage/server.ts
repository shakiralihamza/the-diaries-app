import {Server, Model, Factory, Response, belongsTo, hasMany} from 'miragejs';
import * as user from './routes/user';
import * as diary from './routes/diary';

export const handleErrors = (error: any, message = 'An error occurred') => {
    console.error('Error: ', error);
    return new Response(400, undefined, {
        data: {
            message,
            isError: true,
        },
    });
};

export const setupServer = (env?: string): Server => {
    return new Server({
        environment: env ?? 'development',

        models: {
            entry: Model.extend({
                diary: belongsTo(),
            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo(),
            }),
            user: Model.extend({
                diary: hasMany(),
            }),
        },

        factories: {
            user: Factory.extend({
                username: 'user',
                password: 'pass',
                email: 'test@email.com',
            }),
        },

        seeds: (server): any => {
            server.create('user');
        },

        routes(): void {
            this.urlPrefix = 'https://diaries.app';

            this.post('/auth/login', user.login);
            this.post('/auth/signup', user.signup);

            this.post('/diaries/', diary.create);
            this.post('/diaries/entry/:id', diary.addEntry);

            this.get('/diaries/:id', diary.getDiaries);
            this.get('/diaries/entries/:id', diary.getEntries);

            this.put('/diaries/entry/:id', diary.updateEntry);
            this.put('/diaries/:id', diary.updateDiary);
            this.put('/diaries/updateEntryPin/:id', diary.updateEntryPin);

            this.delete('/diaries/entry/:id', diary.deleteEntry)
        },
    });
};
