import { writeFileSync } from 'fs';

const db = {
  users: [
    {
      id: '9175',
      email: 'guess@email.com',
      firstName: 'Guess',
      lastName: 'Member',
      password: '123456',
      thumbnail: '',
      isLogged: true,
      isAdmin: true,
    },
    {
      id: '9fad',
      email: 'lucas@gmail.com',
      firstName: 'Lucas',
      isLogged: false,
      lastName: 'Silva',
      password: '',
      thumbnail: '',
      isAdmin: false,
    },
    {
      id: 'd014',
      email: 'carter@gmail.com',
      firstName: 'Carter',
      isLogged: false,
      lastName: 'Gordon',
      password: 'q1w2e3r4',
      thumbnail: '',
      isAdmin: false,
    },
    {
      id: 'e303',
      email: 'ethan@gmail.com',
      firstName: 'Ethan',
      isLogged: false,
      lastName: 'Doe',
      password: 'q1w2e3r4',
      thumbnail: '',
      isAdmin: false,
    },
  ],
  user_members: [
    {
      id: 'bc10',
      userId: '9fad',
      groupOwnerId: '9175',
    },
    {
      id: '57e8',
      userId: 'd014',
      groupOwnerId: '9175',
    },
    {
      id: '1246',
      userId: 'e303',
      groupOwnerId: '9175',
    },
  ],
  chores: [
    {
      id: '0c26',
      title: 'Clean the car inside',
      description:
        'Clean Dashboar, Seats and carpetsClean Dashboar, Seats and carpetsClean Dashboar, Seats and carpetsClean Dashboar, Seats and carpetsClean Dashboar, Seats and carpetsSeats and carpetsClean Dashboar, Seats and carpetsSeats and carpetsClean Dashboar, Seats and carpetsSeats and carpetsClean Dashboar, Seats and carpetsSeats and carpetsClean Dashboar, Seats and carpetsSeats and carpetsClean Dashboar, Seats and carpetsSeats and carpetsClean Dashboar, Seats and carpets',
      choreValue: '3',
      userId: '9175',
      typeId: '4',
    },
    {
      id: '9bb3',
      title: 'Clean the carpet',
      description: 'Vaccum the carpets in the house',
      choreValue: '4',
      userId: '9175',
      typeId: '2',
    },
    {
      id: '0caa',
      title: 'Wash car',
      description: 'wash outside of the car',
      choreValue: '10',
      userId: '9175',
      typeId: '4',
    },
  ],
  chore_members: [
    {
      id: 'f449',
      memberId: '9fad',
      choreId: '0c26',
      choreStatus: '4',
      groupOwnerId: '9175',
    },
    {
      id: 'e59e',
      memberId: '9fad',
      choreId: '0caa',
      choreStatus: '4',
      groupOwnerId: '9175',
    },
  ],
};

writeFileSync('db.json', JSON.stringify(db), { encoding: 'utf-8' });
