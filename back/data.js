let users = [
  {
    id: 'test123@gmail.com',
    pwd: 'utzazz12!!',
    author: 'Uta',
    posts: [0],
    likes: [],
  },
];

let posts = [
  {
    id: 0,
    title: 'NAS - Nas Is Like',
    author: { id: 'test123@gmail.com', author: 'Uta' },
    tags: [],
    content: `Freedom or jail, clip's inserted, a baby's being born
    Same time a man is murdered, the beginning and end
    As far as rap go, it's only natural I explain
    My plateau, and also, what defines my name
    First it was Nasty, but times have changed
    Ask me now, I'm the artist, but hardcore, my science for pain
    I spent time in the game, kept my mind on fame
    Saw fiends shoot up and do lines of cocaine
    Saw my close friends shot, flatline am I sane?
    That depends, carry Mac-10's to practice my aim
    On rooftops, tape CD covers to trees
    Line the barrel up with your weak picture then squeeze
    Street scriptures for lost souls, in the crossroads
    To the corner thugs hustling for cars that cost dough
    To the big dogs living large, taking in light
    Pushing big toys, getting nice, enjoying your life
    Is what you make it, suicide, few try to take it
    Belt tied around their neck in jail cells naked
    Heaven and hell, rap legend, presence is felt
    And of course N-A-S are the letters that spell
    NAS, NAS
    "Nas is like" Earth, Wind & Fire, rims and tires
    Bulletproof glass, inside is the realest driver
    Planets in orbit, line 'em up with the stars
    Tarot cards, you can see the pharaoh Nas
    "Nas is like" Iron Mike, messiah type
    Before the Christ, after the death
    The last one left, let my cash invest in stock
    Came a along way from blasting, tecs on blocks
    Went from Seiko to Rolex, owning acres
    From the projects with no chips, to large cake dough
    Dimes, giving fellatio, siete zeros
    Bet my nine spit for the pesos
    But what's it all worth, can't take it with you under this Earth
    Rich men died and tried, but none of it worked
    They just rob your grave, I'd rather be alive and paid
    Before my number's called, history's made
    Some'll fall, but I rise, thug or die
    Making choices, that determine my future under the sky
    To rob steal or kill, I'm wondering why
    It's a dirty game, is any man worthy of fame?
    Much success to you, even if you wish me the opposite
    Sooner or later we'll all see who the prophet is
    "Nas is like" Sex to a nympho, but nothing sweet
    I'm like beef, bustin' heat through your windows
    I'm like a street sweeper, green leaf breather
    Like Greeks in Egypt, learning somethin deep from they teachers
    I'm like crime, like your nine, your man you would die for
    Always got you, I'm like Pac dude you would cry for
    I'm like a whole lot of loot, I'm like crisp money
    Corporate accounts from a rich company
    I'm like ecstasy for ladies, I'm like all races
    Combined in one man, like the '99 summer jam
    Bulletproof Hummer man
    I'm like being locked down around new faces, and none of 'em fam
    I'm the feeling of a millionaire spending a hundred grand
    I'm a poor man's dream, a thug poet
    Live it and I write down and I watch it blow up
    Y'all know what I'm like, y'all play it your system every night`,
    date: new Date('2022-10-08'),
  },
];

// USER
const getUser = user => users.find(_usr => _usr.id === user.id && _usr.pwd === user.pwd);

const addUser = user => {
  users = [...users, user];
};

const updateUser = user => {
  users = users.map(_usr => (_usr.id === user.id ? user : _usr));
};

const deleteUser = id => {
  users = users.filter(_usr => _usr.id !== id);
};

const isUniqueId = id => {
  if (users.length === 0) return true;
  return users.some(user => user.id === id);
};

// prettier-ignore
const addLike = (userId, postId) => {
  users = users.map(user => (user.id === userId
    ? {
      ...user,
      likes: user.likes.includes(postId)
        ? user.likes.filter(like => like !== +postId) : [postId, ...user.likes]
    }
    : user));
};

const getLikes = userId => users.find(user => user.id === userId).likes;

// POST
const getPosts = () => posts;

// const getPost = id => posts.filter(post => post.id === id);
const getPost = id => posts.find(post => post.id === id);

const getNextId = () => Math.max(...posts.map(post => post.id), 0) + 1;

const addPost = post => {
  const newPost = { ...post, id: getNextId() };
  posts = [...posts, newPost];
};

const updatePost = post => {
  posts = posts.map(_post => (_post.id === +post.id ? post : _post));
  return getPost(+post.id);
};

const deletePost = id => {
  posts = posts.filter(post => post.id !== id);
  return getPost(id);
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  isUniqueId,
  addLike,
  getLikes,
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
};
