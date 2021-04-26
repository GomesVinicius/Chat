import { Socket } from 'socket.io';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessageService';
import { UserService } from '../services/UserService';

io.on('connect', (socket: Socket) => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();
    const usersService = new UserService();

    let user_id: string = '';

    socket.on('client_first_access', async (params) => {
        const socket_id = socket.id;
        const { text, email } = params;

        const userExists = await usersService.findByEmail(email);

        if (!userExists) {
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id;
        } else {
            user_id = userExists.id;

            const connection = await connectionsService.findByUserId(userExists.id);

            if (!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                });
            } else {
                connection.socket_id = socket_id;

                await connectionsService.create(connection);
            }
        }

        await messagesService.create({
            text,
            user_id
        })
    })
});
