import * as Express from 'express';

const app = Express();

app.get(
    '/',
    (req: Express.Request, res: Express.Response) => {
        return res.send('Hello world.');
    });

app.listen(
    3000,
    () => {
        console.log('Example app listening on port 3000!');
    });

export default app;
