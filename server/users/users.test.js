const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    //Before every single test case, because we need more Users in order to test every method.
    var  users;
    beforeEach(()=> {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Luis',
            room: 'Kybel'
        }, {
            id: '2',
            name: 'Humberto',
            room: 'node course'
        }, {
            id: '3',
            name: 'Damian',
            room: 'Kybel'
        }, {
            id: '4',
            name: 'Alvaro',
            room: 'node course'
        }];
    });

    it('should add new users', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Salvador',
            room: 'Kybel Room'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('node course');
        expect(userList).toEqual(['Humberto', 'Alvaro']);
    });

    it('should find a user', () => {
        var userID = '1';
        var user = users.getUser(userID);
        expect(user.id).toEqual(userID);
    });

    it('should remove a user', () => {
        var userID = '1';
        var user = users.removeUser(userID);
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(3);
    });
});