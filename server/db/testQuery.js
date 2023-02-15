const db = require('./models');
const User = db.User;

class UserService {
    async findAllUser(){
        return await User.findAll();
    }
}


let userService = new UserService();
const result = async() => {
    const data = await userService.findAllUser();;
    const users = JSON.stringify(data);
    console.log(users);
}

result();
