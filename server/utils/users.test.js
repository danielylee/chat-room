const expect = require('expect');
const { Users } = require('./users')

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Jon',
      room: '237'
    }, {
      id: '2',
      name: 'Ned',
      room: '237'
    }, {
      id: '3',
      name: 'Bran',
      room: '237'
    }];
  });

  it('should add new users', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Daniel',
      room: 'The Room'
    }
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for room 237', () => {
    var userList = users.getUserList('237');

    expect(userList).toEqual(['Jon', 'Ned', 'Bran']);
  });
});
