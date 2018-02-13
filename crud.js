if (atkObjConvert.hp <= 0 && dfndObjConvert.hp > 0) {
	console.log("You lose!");
	$("#enemy>h3").html("enemy wins!");
	$(".chosenChar").html("<h3>lose!</h3>");
	$("#attack").html("");
	$("#battlEnd").html(tryAgainButton);
	$("#attackerMsg").html("");
	$("#defenderMsg").html("");
	tryAgain();
} else if (dfndObjConvert.hp <= 0) {
	console.log("You win!");
	$("#you>h3").html("you win!");
	$(".chosenEnemy").html("<h3>loses!</h3>");
	$("#attack").html("");
	winsCounter++;
	if (winsCounter < 3) {
		console.log("There are still enemies to defeat");
		$("#battlEnd").html(nextEnemyButton);
		$("#attackerMsg").html("");
		$("#defenderMsg").html("");
		$("#enemy>.card").removeClass("chosenEnemy");
		nextEnemy();
	} else {
		console.log("All enemies have been defeated");
		$("#battlEnd").html(winnerButton);
		$("#attackerMsg").html("");
		$("#defenderMsg").html("");
		$("#enemy>.card").removeClass("chosenEnemy");
		tryAgain();
	}