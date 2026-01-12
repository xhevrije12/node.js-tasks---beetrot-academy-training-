const fetch = require('node-fetch');

const getUserGit = async (username) => {
    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const userResponse = await fetch(userUrl);
        if (!userResponse.ok) throw new Error(`Perdoruesi '${username}' nuk u gjet!`);

        const userData = await userResponse.json();
        const reposResponse = await fetch(reposUrl);
        const reposData = await reposResponse.json();

        console.log(`Informacione nga GitHub`);
        console.log(`Perdoruesi: ${userData.login}`);
        console.log(`Numri i repozitoreve: ${reposData.length}`);
    } catch (error) {
        console.error(`GABIM: ${error.message}`);
    }
};

module.exports = getUserGit;