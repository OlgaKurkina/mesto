// измените код функции countUserPosts
const countUserPosts = ({ posts }) => {
    return posts.length;
};

const user1 = {
    id: 2294611830,
    username: 'leonardo.dv',
    posts: [
        { comment: 'Витрувианский человек', dateCreated: 1490 },
        { comment: 'Портрет музыканта', dateCreated: 1490 },
        { comment: 'Автопортрет в Турине #selfie', dateCreated: 1512 },
    ]
};

console.log(countUserPosts(user1)); // 3