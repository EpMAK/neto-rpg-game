export async function play(players) {

    let round = 1;
    while (players.filter(player => !player.isDead()).length > 1) {
        console.log(`\nРаунд ${round}:`);
        console.log('Живые игроки:', players.filter(player => !player.isDead()).map(player => player.name));
        console.log('Состояние игроков:', players.map(player => ({ name: player.name, life: player.life })));
        for (const player of players) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 5 seconds
            player.turn(players);
        }
        round++;
    }

    const winner = players.find(player => !player.isDead());
    if (winner) {
        console.log(`\n${winner.name} победил!`);
    } else {
        console.log('\nНичья!');
    }
}
